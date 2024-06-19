import { Router } from "express";
import { randomUUID } from "crypto";
import { z } from "zod";

import { db } from "../../config/firebaseConfig";

import { Tasks } from "../../models/task";

const router = Router();

// Cria uma nova task
router.post("", async (req, res) => {
  try {
    const taskSchema = z.object({
      body: z.string({ message: "Conteúdo da task é obrigatório" }).min(1),
      color: z.string().optional(),
      status: z
        .number({ message: "Status da task é obrigatório" })
        .int()
        .positive("Status deve ser um valor positivo"),
    });

    const randomUuid = randomUUID();

    const validationSchema = taskSchema.safeParse(req.body);

    if (!validationSchema.success) {
      return res
        .status(400)
        .json({ error: validationSchema.error.errors[0].message });
    }

    const { body, color, status } = validationSchema.data;

    const newTask: Tasks = {
      id: randomUuid,
      body,
      color: color || "transparent",
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection("tasks").add(newTask);

    res.status(201).json({ message: "Task criada com sucesso" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao tentar criar uma nova task" });
  }
});

export default router;
