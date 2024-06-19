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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection("tasks").add(newTask);

    res.status(201).json({ message: "Task criada com sucesso" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao tentar criar uma nova task" });
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
    res.status(500).send({ error: "Erro ao tentar listar todas as tasks" });
  }
});

// Retornar task por ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

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

// Atualizar task por ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updatedTask: Partial<Tasks> = {
      body: req.body.body,
      color: req.body.color,
      status: req.body.status,
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

// Deletar uma task pelo ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

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
