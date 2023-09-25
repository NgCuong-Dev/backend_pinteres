import { PrismaClient } from "@prisma/client";
import bcypt from "bcrypt";
import jwt from "jsonwebtoken";

//register
const prisma = new PrismaClient();
const RegisterUser = async (req, res) => {
  try {
    let { email, mat_khau, ho_ten } = req.body;
    let checkMail = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });
    if (checkMail) {
      res.status(404).send("Email tồn tại!");
      return;
    }
    let newData = {
      email,
      ho_ten,
      mat_khau: bcypt.hashSync(mat_khau, 10),
    };
    await prisma.nguoi_dung.create({ data: { newData } });
    res.status(200).send("dang ky thanh cong");
  } catch (exp) {
    res.status(500).send(`Error BackEnd${exp}`);
  }
};

// login
const LoginUser = async (req, res) => {
  try {
    let { email, mat_khau } = req.body();
    let checkmail = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });
    if (checkmail) {
      let checkPass = bcypt.compareSync(mat_khau, checkmail.mat_khau);
      if (checkPass == true) {
        let token = jwt.sign({ checkMail }, "NguyenCuong", {
          expiresIn: "1day",
        });
        res.status(200).send(token);
      }
    } else {
      res.status(403).send("Email đã tồn tại!");
    }
  } catch (exp) {
    res.status(500).send("email da ton tai");
  }
  res.send("dang nhap thanh cong");
};

const DanhSachUser = (req, res) => {
  res.status(200).send("danh sach");
};

export { DanhSachUser, LoginUser, RegisterUser };
