import React, { useState } from "react";
import axios from "axios";
import PostList from "./PostList";

function Post() {
  const [content, setContent] = useState("");
  const [title,setTitle] = useState("")
  const [posts,setPosts] = useState([])  

  const getPost = () => {
    axios.get("http://localhost:5000/api/posts").then((res) => {
      setPosts(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post("http://localhost:5000/api/post", {
        userId: user._id,
        content: content,
        title:title,
      })
      .then(async(res) => {
        await getPost();
        alert(res.data.message);
        setContent("");
      })
      .catch((err) => {
        console.log(err.data);
      });

    
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 w-1/3"
    >
      <p className='semibold text-3xl mb-6'>Add New Post!</p>
            <label>Title</label>
            <input className='w-full outline-none rounded-lg  py-2 px-2' autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            
      <label>Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full text-lg outline-none rounded-lg p-3"
        
        rows="2"
      ></textarea>
      <button className="w-full bg-green-500 text-cyan-50 font-semibold tracking-widest p-2 rounded-lg">
        Add
      </button>
    </form>
    <PostList getPost={getPost} posts={posts} />
    </>
  );
}

export default Post;
