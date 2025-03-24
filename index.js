require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todoRouter = require("./routes/todo");

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
const corsOptions = {
    origin: ['https://todo-client-2025.onrender.com', 'http://localhost:5500'],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", todoRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
