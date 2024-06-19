import express from "express";

import testRoutes from "./routes/testRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
// const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", testRoutes);
app.use("/tasks", taskRoutes);

app.use("/", (req, res) => res.status(200).send({ message: "Hello World" }));

app.listen(3000, () => console.log("🚀 HTTP server running! 🚀"));
