import { PrismaClient } from "../../generated/prisma/client.ts";

const prisma = new PrismaClient({
    log: ["query"],
});

export default prisma;