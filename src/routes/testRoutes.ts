import { Router } from "express";

const router = Router();

router.get("/test", async (req, res) => {
  res.status(200).send({ message: "Test" });
});

export default router;
