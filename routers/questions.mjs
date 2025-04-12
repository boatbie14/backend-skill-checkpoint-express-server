import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateReqeQuestion } from "../middlewares/checkQuestionReq.middleware.mjs";
import { validateQuestionId } from "../middlewares/checkQuestionId.middleware.mjs";

const questionsRouter = Router();

//Get all questions
questionsRouter.get("/", async (req, res) => {
  try {
    const result = await connectionPool.query(`SELECT * FROM questions`);
    return res.status(200).json({ data: result.rows });
  } catch (e) {
    return res.status(500).json({ message: "Unable to fetch questions." });
  }
});

//Get a question by ID
questionsRouter.get("/:questionId", [validateQuestionId], async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const result = await connectionPool.query(`SELECT * FROM questions WHERE id = $1`, [questionId]);
    return res.status(200).json({ data: result.rows });
  } catch (e) {
    return res.status(500).json({ message: "Unable to fetch questions." });
  }
});

//Create a new question
questionsRouter.post("/", [validateReqeQuestion], async (req, res) => {
  const newData = req.body;

  try {
    const result = await connectionPool.query("INSERT INTO questions (title, description, category) VALUES ($1, $2, $3) RETURNING *", [
      newData.title,
      newData.description,
      newData.category,
    ]);
    return res.status(200).json({ message: "Question created successfully.", data: result.rows[0] });
  } catch (e) {
    return res.status(500).json({ message: "Unable to create question." });
  }
});

//Update a question by ID
questionsRouter.put("/:questionId", [validateQuestionId, validateReqeQuestion], async (req, res) => {
  const questionId = req.params.questionId;
  const newData = req.body;

  try {
    const result = await connectionPool.query(
      "UPDATE questions SET title = $1, description = $2, category = $3 WHERE id = $4 RETURNING *",
      [newData.title, newData.description, newData.category, questionId]
    );
    return res.status(200).json({ message: "Question updated successfully.", data: result.rows[0] });
  } catch (e) {
    return res.status(500).json({ message: "Unable to update question." });
  }
});

//Delete a question by ID
questionsRouter.delete("/:questionId", [validateQuestionId], async (req, res) => {
  try {
    const questionId = req.params.questionId;
    await connectionPool.query("DELETE FROM questions WHERE id = $1", [questionId]);
    return res.status(200).json({ message: "Question post has been deleted successfully." });
  } catch (e) {
    return res.status(500).json({ message: "Unable to create question." });
  }
});

export default questionsRouter;
