import express from 'express';
import { VisitorChat } from "./messagecontroller.js";


 const router= express.Router();

 router.post("/api/visitor/chat", VisitorChat)


  export default router;