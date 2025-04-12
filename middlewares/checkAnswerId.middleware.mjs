import connectionPool from "../utils/db.mjs";

export const validateAnswerId = async (req, res, next) => {
  const answerId = req.params.answerId;

  const result = await connectionPool.query(`SELECT * FROM answers WHERE id = $1`, [answerId]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Answer not found." });
  }

  next();
};
