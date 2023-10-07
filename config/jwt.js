import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  try {
    let { token } = req.headers;
    if (verifyToken(token)) {
      next();
    } else {
      res.status(200).send("Không có quyền truy cập");
    }
  } catch (exp) {
    res.status(500).send(`Error:${exp}`);
  }
};

const verifyToken = (token) => {
  return jwt.verify(token, "NguyenCuong");
};
export { checkToken };
