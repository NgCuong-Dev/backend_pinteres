import express, { json } from "express";
import cors from "cors";
import {
  DanhSachUser,
  LoginUser,
  RegisterUser,
} from "./controller/HinhAnhController.js";

const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.listen(8080);
app.get("/hinh-anh", DanhSachUser);

//register
app.post("/api/register", RegisterUser);
//login
app.post("/api/login", LoginUser);
