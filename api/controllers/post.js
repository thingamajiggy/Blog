import db from "../db/connection.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM public.posts WHERE cat = $1;"
    : "SELECT * FROM public.posts;";

  db.query(q, req.query.cat ? [req.query.cat] : [], (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).json(data.rows);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM public.users u JOIN public.posts p ON u.id = p.uid WHERE p.id = $1;";

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(data.rows[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    console.log("hello");

    const q = `INSERT INTO public.posts(
        title,
        "desc",
        img,
        cat,
        date,
        uid
      ) VALUES ($1, $2, $3, $4, $5, $6);`;

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const postId = req.params.id;
    const q = "DELETE FROM public.posts WHERE `id` = $1 AND `uid` = $2;";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(403).json("You can delete only your post!");
      }

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const postId = req.params.id;
    const q =
      "UPDATE public.posts SET title=$1, desc=$2, img=$3, cat=$4 WHERE id=$5 AND uid=$6;";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json("Post has been updated.");
    });
  });
};
