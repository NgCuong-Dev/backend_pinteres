import { PrismaClient } from "@prisma/client";
import bcypt from "bcrypt";
import jwt from "jsonwebtoken";

//register
const prisma = new PrismaClient();
const RegisterUser = async (req, res) => {
  try {
    let { email, mat_khau, ho_ten, tuoi } = req.body;
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
      tuoi,
    };
    await prisma.nguoi_dung.create({ data: newData });
    res.status(200).send("dang ky thanh cong");
  } catch (exp) {
    res.status(500).send(`Error BackEnd${exp}`);
  }
};

// login
const LoginUser = async (req, res) => {
  try {
    let { email, mat_khau } = req.body;
    let checkmail = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });
    if (checkmail) {
      let checkPass = bcypt.compareSync(mat_khau, checkmail.mat_khau);
      if (checkPass == true) {
        let token = jwt.sign({ checkmail }, "NguyenCuong", {
          expiresIn: "1d",
        });
        res.status(200).send(token);
      }
    } else {
      res.status(403).send("Email không tồn tại!");
    }
  } catch (exp) {
    res.status(500).send(`Error${exp}`);
  }
  res.send("dang nhap thanh cong");
};
//danh sach nguoi dung
const DanhSachUser = async (req, res) => {
  try {
    const data = await prisma.nguoi_dung.findMany();
    res.status(200).send({ data: data });
  } catch (exp) {
    res.status(500).send(`${exp}`);
  }
};
//danh sach ảnh
const DanhSachAnh = async (req, res) => {
  try {
    const data = await prisma.hinh_anh.findMany();
    res.status(200).send({ data: data });
  } catch (exp) {
    res.status(500).send(`${exp}`);
  }
};
//tim danh sach anh theo ten
const FindNamePicture = async (req, res) => {
  try {
    let { name } = req.params;
    let data = await prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          contains: name,
        },
      },
    });
    res.status(200).send(data);
  } catch (exp) {
    res.status(500).send(`${exp}`);
  }
};

export { DanhSachUser, LoginUser, RegisterUser, DanhSachAnh, FindNamePicture };
