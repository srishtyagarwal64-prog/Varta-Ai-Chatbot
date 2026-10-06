import express from 'express';
import {  AdminDashboard ,getAllConversation,getConversationById} from "./conversationcontroller.js";


 const router= express.Router();

 router.post("/api/admin/analytics", AdminDashboard)
router.get("/api/conversations",getAllConversation)
router.get("/api/conversations/:id",getConversationById)

  export default router;