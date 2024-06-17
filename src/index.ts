import express from "express";

import testRoutes from "./routes/testRoutes";

const app = express();
// const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", testRoutes);

app.get("/", () => "Hello world");

app.listen(3000, () => {
  console.log("🚀 HTTP server running! 🚀");
});
