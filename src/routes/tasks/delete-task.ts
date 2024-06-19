import { Router } from "express";
import { z } from "zod";

import { Tasks } from "../../models/task";

import { db } from "../../config/firebaseConfig";

const router = Router();

// Deleta uma task pelo ID
router.delete("/:id", async (req, res) => {
  try {
    const taskSchema = z.object({
      id: z
        .string({ message: "ID da task é obrigatório" })
        .uuid("ID em formato inválido"),
    });

    const validationSchema = taskSchema.safeParse(req.params);

    if (!validationSchema.success) {
      return res
        .status(400)
        .json({ error: validationSchema.error.errors[0].message });
    }

    const { id } = validationSchema.data;

    const foundedTask = await db
      .collection("tasks")
      .where("id", "==", id)
      .get();

    if (foundedTask.empty) {
      res.status(404).send({ error: "Task não encontrada com o id informado" });

      return;
    }

    foundedTask.docs.forEach((task) => {
      const taskCollection = db.collection("tasks").doc(task.id);

      db.batch().delete(taskCollection);
    });

    await db.batch().commit();

    res.status(200).send({ message: "Task deletada com sucesso" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao tentar deletar esta task" });
  }
});

export default router;
