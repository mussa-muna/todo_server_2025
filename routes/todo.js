const express = require("express");
const router = express.Router();
const { query } = require("../helpers/db");

router.get("/", async (req, res) => {
    try {
        console.log("Fetching all tasks from database...");
        const result = await query("SELECT * FROM task ORDER BY id ASC");
        console.log("Tasks fetched successfully:", result.rows);
        res.status(200).json(result.rows || []);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Fetch error" });
    }
});

router.post("/new", async (req, res) => {
    const { description } = req.body;
    try {
        console.log("Adding new task:", description);
        const result = await query("INSERT INTO task (description) VALUES ($1) RETURNING *", [description]);
        console.log("Task added successfully:", result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error adding task:", err);
        res.status(500).json({ error: "Insert error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        console.log("Deleting task with ID:", id);
        const result = await query("DELETE FROM task WHERE id=$1 RETURNING *", [id]);
        console.log("Task deleted successfully:", result.rows[0]);
        res.status(200).json({ id: result.rows[0].id });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Delete error" });
    }
});

module.exports = router;
