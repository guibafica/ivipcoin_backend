import express from "express";

import createTaskRoute from "./routes/tasks/create-task";
import getTasksRoute from "./routes/tasks/get-tasks";
import getTaskByIdRoute from "./routes/tasks/get-task-by-id";
import updateTaskByIdRoute from "./routes/tasks/update-task";
import deleteTaskByIdRoute from "./routes/tasks/delete-task";

const app = express();
// const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/tasks", createTaskRoute);
app.use("/tasks", getTasksRoute);
app.use("/tasks", getTaskByIdRoute);
app.use("/tasks", updateTaskByIdRoute);
app.use("/tasks", deleteTaskByIdRoute);

app.use("/", (req, res) => res.status(200).send({ message: "Hello World" }));

app.listen(3000, () => console.log("🚀 HTTP server running! 🚀"));
