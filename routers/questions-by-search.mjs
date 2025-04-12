import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateSearchParams } from "../middlewares/checkSearchParms.middleware.mjs";

const questionSearchRouter = Router();

//Search questions by title or category
questionSearchRouter.get("/", [validateSearchParams], async (req, res) => {
  const searchData = req.query;
  try {
    let sqlQuery = "SELECT * FROM questions WHERE ";
    const queryParams = [];
    let paramCount = 1;

    if (searchData.title) {
      sqlQuery += `title ILIKE $${paramCount}`;
      queryParams.push(`%${searchData.title}%`);
      paramCount++;
    }

    if (searchData.category) {
      if (searchData.title) {
        sqlQuery += ` AND `;
      }
      sqlQuery += `category ILIKE $${paramCount}`;
      queryParams.push(`%${searchData.category}%`);
    }

    const result = await connectionPool.query(sqlQuery, queryParams);

    if (result.rows.length === 0) {
      return res.status(200).json({ message: "Not found data" });
    } else {
      return res.status(200).json({ total: result.rows.length, data: result.rows });
    }
  } catch (e) {
    return res.status(500).json({ message: "Unable to fetch questions..." });
  }
});

export default questionSearchRouter;
