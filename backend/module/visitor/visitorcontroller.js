import prisma from "../../common/config/db.js";

const VisitorOnboard = async (req, res) => {
    const { name, profession, goal } = req.body;

    try {
        if (!name || !profession || !goal) {
            return res.status(400).json({
                error: "Name, profession, and goal are all required.",
            });
        }

        // Create Visitor
        const newVisitor = await prisma.visitor.create({
            data: {
                name,
                profession,
                goal,
            },
        });

        // Create Conversation for this Visitor
        const newConversation = await prisma.conversation.create({
            data: {
                visitorId: newVisitor.id,
            },
        });

        return res.status(201).json({
            message: "Onboarding completed successfully.",
            visitorId: newVisitor.id,
            conversationId: newConversation.id,
            visitorName: newVisitor.name,
        });
    } catch (error) {
        console.error("error is", error);

        return res.status(500).json({
            error: "Failed to complete visitor onboarding.",
        });
    }
};


const visitorHistory = async (req, res) => {
    const { visitorId } = req.params;

    try {
        const visitorIdNumber = Number(visitorId);

        if (Number.isNaN(visitorIdNumber)) {
            return res.status(400).json({
                error: "Invalid visitor ID.",
            });
        }

        // Find Visitor
        const visitor = await prisma.visitor.findUnique({
            where: {
                id: visitorIdNumber,
            },
        });

        if (!visitor) {
            return res.status(404).json({
                error: "Visitor not found.",
            });
        }

        // Find latest conversation of this visitor
        const conversation = await prisma.conversation.findFirst({
            where: {
                visitorId: visitorIdNumber,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!conversation) {
            console.log("No active conversation session found for visitor");

            return res.status(200).json({
                visitorName: visitor.name,
                conversationId: null,
                messages: [],
            });
        }

        // Find messages of latest conversation
        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversation.id,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return res.status(200).json({
            visitorName: visitor.name,
            conversationId: conversation.id,
            messages: messages.map((msg) => ({
                sender: msg.sender,
                text: msg.text,
                createdAt: msg.createdAt,
            })),
        });
    } catch (error) {
        console.log("error is", error);

        return res.status(500).json({
            error: "Failed to retrieve conversation history.",
        });
    }
};

export {
    VisitorOnboard,
    visitorHistory,
};