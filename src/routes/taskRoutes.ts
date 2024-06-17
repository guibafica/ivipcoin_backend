import { Router } from "express";
import { randomUUID } from "crypto";

import { db } from "../config/firebaseConfig";

import { Tasks } from "../models/task";

const router = Router();

// Criar uma nova task
router.post("", async (req, res) => {
  try {
    const randomUuid = randomUUID();

    // validação dos dados

    const newTask: Tasks = {
      id: randomUuid,
      body: req.body.body,
      color: req.body.color || "transparent",
      status: req.body.status,
      // createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const tasksCollection = await db.collection("tasks").add(newTask);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).send({ Error: "Erro ao tentar criar uma nova task" });
  }
});

// Retornar todas as tasks
router.get("", async (req, res) => {
  try {
    const tasksCollection = await db.collection("tasks").get();

    const tasks = tasksCollection.docs.map((task) => ({
      id: task.id,
      ...task.data(),
    }));

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send({ Error: "Erro ao tentar listar todas as tasks" });
  }
});

// Retornar tasks por ID
router.get("/:id", async (req, res) => {
  try {
    const tasksCollection = await db
      .collection("tasks")
      .doc(req.params.id)
      .get();

    if (!tasksCollection.exists) {
      res.status(404).send({ Error: "Task não encontrada" });
    } else {
      res
        .status(200)
        .json({ id: tasksCollection.id, ...tasksCollection.data() });
    }
  } catch (error) {
    res
      .status(500)
      .send({ Error: "Erro ao tentar listar uma task com este ID" });
  }
});

// Atualizar task por ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTask: Partial<Tasks> = {
      body: req.body.body,
      color: req.body.color,
      status: req.body.status,
      updatedAt: new Date(),
    };

    await db
      .collection("tasks")
      .doc(req.params.id)
      .set(updatedTask, { merge: true });

    const updatedDbCollection = await db
      .collection("tasks")
      .doc(req.params.id)
      .get();

    res.status(200).json({ id: req.params.id, ...updatedDbCollection.data() });
  } catch (error) {
    res.status(500).send({ Error: "Erro ao tentar atualizar esta task" });
  }
});

// Deletar uma task por ID
router.delete("/:id", async (req, res) => {
  try {
    await db.collection("tasks").doc(req.params.id).delete();

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ Error: "Erro ao tentar deletar esta task" });
  }
});

export default router;
