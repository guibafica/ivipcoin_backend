import { Router } from "express";

const router = Router();

router.get("/test", async (req, res) => {
  res.status(500).send({ message: "Hello World!!!" });
});

export default router;
