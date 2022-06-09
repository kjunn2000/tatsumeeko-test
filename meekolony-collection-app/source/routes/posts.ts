/** source/routes/posts.ts */
import express from "express";
import collectionCtrl from "../controllers/MeekolonyCollection";
import holderCtrl from "../controllers/HolderController";
const router = express.Router();

router.get("/meekolony/stats", collectionCtrl.getMeekolonyStats);
router.get("/meekolony/listings", collectionCtrl.getMeekolonyListings);
router.get("/meekolony/activities", collectionCtrl.getMeekolonyActivities);
router.get("/meekolony/tokens", holderCtrl.getTokens);

export = router;
