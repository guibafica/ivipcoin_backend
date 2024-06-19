import { Router } from "express";
import { z } from "zod";

import { Tasks } from "../../models/task";

import { db } from "../../config/firebaseConfig";

const router = Router();

// Atualiza task por ID
router.put("/:id", async (req, res) => {
  try {
    const taskSchema = z.object({
      body: z.object({
        body: z.string({ message: "Conteúdo da task é obrigatório" }).min(1),
        color: z.string({ message: "Cor da task é obrigatória" }),
        status: z
          .number({ message: "Status da task é obrigatório" })
          .int()
          .positive("Status deve ser um valor positivo"),
      }),
      params: z.object({
        id: z
          .string({ message: "ID da task é obrigatório" })
          .uuid("ID em formato inválido"),
      }),
    });

    const validationSchema = taskSchema.safeParse(req);

    if (!validationSchema.success) {
      return res
        .status(400)
        .json({ error: validationSchema.error.errors[0].message });
    }

    const { id } = validationSchema.data.params;
    const { body, color, status } = validationSchema.data.body;

    const updatedTask: Partial<Tasks> = {
      body,
      color,
      status,
      updatedAt: new Date().toISOString(),
    };

    const dbCollection = await db
      .collection("tasks")
      .where("id", "==", id)
      .get();

    if (dbCollection.empty) {
      res.status(404).send({ error: "Task não encontrada" });

      return;
    }

    const batch = db.batch();

    dbCollection.docs.forEach((task) => {
      const docRef = db.collection("tasks").doc(task.id);

      batch.update(docRef, updatedTask);
    });

    await batch.commit();

    res.status(200).json({ message: "Task atualizada com sucesso" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao tentar atualizar esta task" });
  }
});

export default router;
