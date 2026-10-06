import prisma from "../../common/config/db.js";

const AdminDashboard = async (req, res) => {
    try {
        const totalVisitors = await prisma.visitor.count();

        const totalConversations = await prisma.conversation.count();

        const totalMessages = await prisma.message.count();

        const professionBreakdown = await prisma.visitor.groupBy({
            by: ["profession"],
            _count: {
                profession: true,
            },
            orderBy: {
                _count: {
                    profession: "desc",
                },
            },
            take: 5,
        });

        const formattedProfessionBreakdown = professionBreakdown.map((item) => ({
            _id: item.profession,
            count: item._count.profession,
        }));

        console.log(
            `Visitors=${totalVisitors}, Conversations=${totalConversations}, Messages=${totalMessages}`
        );

        return res.status(200).json({
            totalVisitors,
            totalConversations,
            totalMessages,
            professionBreakdown: formattedProfessionBreakdown,
        });
    } catch (error) {
        console.error("Failed to fetch analytics:", error);

        return res.status(500).json({
            error: "Failed to fetch dashboard metrics.",
        });
    }
};


const getAllConversation = async (req, res) => {
    try {
        const conversations = await prisma.conversation.findMany({
            include: {
                visitor: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json(conversations);
    } catch (error) {
        console.error("Failed to list conversations:", error);

        return res.status(500).json({
            error: "Failed to fetch conversations.",
        });
    }
};


const getConversationById = async (req, res) => {
    const { id } = req.params;

    try {
        const conversationId = Number(id);

        if (Number.isNaN(conversationId)) {
            return res.status(400).json({
                error: "Invalid conversation ID.",
            });
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                visitor: true,
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });

        if (!conversation) {
            console.warn(
                `Conversation logs not found for ID: ${conversationId}`
            );

            return res.status(404).json({
                error: "Conversation not found.",
            });
        }

        console.log(
            `${conversation.messages.length} messages for transcript with "${conversation.visitor?.name || "Anonymous"}".`
        );

        return res.status(200).json({
            conversation,
            messages: conversation.messages,
        });
    } catch (error) {
        console.error("Failed to fetch conversation logs:", error);

        return res.status(500).json({
            error: "Failed to retrieve conversation logs.",
        });
    }
};


export {
    AdminDashboard,
    getAllConversation,
    getConversationById,
};