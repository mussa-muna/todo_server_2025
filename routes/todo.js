const express = require("express");
const router = express.Router();
const { query } = require("../helpers/db");

router.get("/", async (req, res) => {
    try {
        const result = await query("SELECT * FROM task ORDER BY id ASC");
        res.status(200).json(result.rows || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fetch error" });
    }
});

router.post("/new", async (req, res) => {
    const { description } = req.body;
    try {
        const result = await query("INSERT INTO task (description) VALUES ($1) RETURNING *", [description]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Insert error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await query("DELETE FROM task WHERE id=$1 RETURNING *", [id]);
        res.status(200).json({ id: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Delete error" });
    }
});

module.exports = router;
