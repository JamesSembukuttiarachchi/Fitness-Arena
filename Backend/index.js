import express from "express";
import cors from "cors";

const PORT = 6555;

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(234).send("Hello worlds");
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
