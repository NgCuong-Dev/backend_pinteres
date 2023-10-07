import express from "express";
import cors from "cors";
import {
  DanhSachAnh,
  DanhSachUser,
  FindNamePicture,
  LoginUser,
  RegisterUser,
} from "./controller/HinhAnhController.js";
import { checkToken } from "./config/jwt.js";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.listen(8080);
app.get("/api/listUser", DanhSachUser);
app.get("/api/list-picture", DanhSachAnh);
app.get("/api/findNamePicture/:name", FindNamePicture);
//register
app.post("/api/register", RegisterUser);
//login
app.post("/api/login", LoginUser);
