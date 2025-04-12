import connectionPool from "../utils/db.mjs";

export const validateQuestionId = async (req, res, next) => {
  const questionId = req.params.questionId;
  console.log("ID = " + questionId);

  const result = await connectionPool.query(`SELECT * FROM questions WHERE id = $1`, [questionId]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Question not found." });
  }

  next();
};
