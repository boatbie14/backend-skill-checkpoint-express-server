export const validateSearchParams = (req, res, next) => {
  const { title, category } = req.query;
  console.log("Title = " + title);
  console.log("Category = " + category);
  if (!title && !category) {
    return res.status(400).json({ message: "Invalid search parameters." });
  }
  next();
};
