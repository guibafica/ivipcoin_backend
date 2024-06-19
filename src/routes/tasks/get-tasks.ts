import { Router } from "express";

import { db } from "../../config/firebaseConfig";

const router = Router();

// Listar todas as tasks
router.get("", async (req, res) => {
  try {
    const tasksCollection = await db.collection("tasks").get();

    const tasks = tasksCollection.docs.map((task) => ({
      id: task.id,
      ...task.data(),
    }));

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send({ error: "Erro ao tentar listar todas as tasks" });
  }
});

export default router;
