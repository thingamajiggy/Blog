import db from "../db/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // check existing user
  console.log(1);
  const q = "SELECT * FROM public.users WHERE email = $1 OR username = $2;";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    console.log(2);
    if (err) {
      console.log(err);
      return res.json(err);
    }
    if (data.length) {
      console.log(4);
      return res.status(409).json("User already exists!");
    }

    //hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(5);
    const q =
      "INSERT INTO public.users(username, email, password) VALUES($1, $2, $3);";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, values, (err, data) => {
      console.log(6);
      if (err) {
        console.log(err);
        return res.json(err);
      }
      console.log(8);
      console.log("user created");
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  // CHECK USER
  const q = "SELECT * FROM public.users WHERE username = $1;";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.json(err);
    }

    if (data.length === 0) {
      return res.status(404).json("User not found!");
    }

    if (!data.rows?.length) {
      return res.stats(400).json("No user found");
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data.rows[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong password or username!");
    }

    const token = jwt.sign({ id: data.rows[0].id }, "jwtkey");

    const { password, ...others } = data.rows[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
