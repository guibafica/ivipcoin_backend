import { Router } from "express";
import { z } from "zod";

import { db } from "../../config/firebaseConfig";

const router = Router();

// Listar uma task pelo id
router.get("/:id", async (req, res) => {
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

    const dbCollection = await db
      .collection("tasks")
      .where("id", "==", id)
      .get();

    if (dbCollection.empty) {
      res.status(404).send({ error: "Task não encontrada" });

      return;
    } else {
      dbCollection.docs.map((doc) => {
        res.status(200).json({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Erro ao tentar listar uma task com este ID" });
  }
});

export default router;
