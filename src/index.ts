import express from "express";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use("/", () => {
  console.log("Hello World!");
});

app.listen(port, () => {
  console.log("🚀 HTTP server running! 🚀");
});
