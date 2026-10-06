import express from 'express';
import {VisitorOnboard,visitorHistory } from "./visitorcontroller.js";


 const router= express.Router();

 router.post("/api/visitor/onboard",VisitorOnboard)
 router.get("/api/visitor/history/:visitorId",visitorHistory)

  export default router;