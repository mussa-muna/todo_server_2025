require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todoRouter = require("./routes/todo");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/", todoRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
