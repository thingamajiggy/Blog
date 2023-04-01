import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data.rows);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet",
  //     desc: "Lorem ipsum dolor sit amet",
  //     img: "https://placekitten.com/640/360",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet",
  //     desc: "Lorem ipsum dolor sit amet",
  //     img: "https://placekitten.com/640/360",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet",
  //     desc: "Lorem ipsum dolor sit amet",
  //     img: "https://placekitten.com/640/360",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet",
  //     desc: "Lorem ipsum dolor sit amet",
  //     img: "https://placekitten.com/640/360",
  //   },
  // ];

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {Array.isArray(posts)
        ? posts.map((post) => (
            <div className="post" key={post.id}>
              <img src={post.img} alt="" />
              <h2>{post.title}</h2>
              <button>Read More</button>
            </div>
          ))
        : "No Posts"}
    </div>
  );
};

export default Menu;
