import React, { useEffect} from "react";

function PostList({ getPost, posts }) {
  useEffect(() => {
    getPost();
  }, [getPost]);

  const showPost = posts.map((post) => (
    <article
      key={post._id}
      className="bg-white flex flex-col gap-3 p-3 border-2  border-slate-600 rounded-lg min-w-full "
    >
      <span className="flex justify-between">
        <h3 className="text-3xl  text-zinc-950 capitalize semibold">
          {post.title}
        </h3>
        <span className="flex gap-2 items-center">
        <h4 className="text-normal italic capitalize">
          by {post.users[0].name}
        </h4>
        <img src={`${process.env.REACT_APP_BASE_ENDPOINT}/${post.users[0].avatar.path}`} style={{width: "50px", height:"50px", objectFit:"cover", borderRadius:"999px"}} alt={post.users[0].name} />    
        </span>
      </span>
      <p className="text-2xl text-zinc-600 normal-case whitespace-normal tracking-wide leading-relaxed">
        {post.content}
      </p>
      <p>{post.createdDate}</p>
    </article>
  ));

  return (
    <div className="flex  flex-col gap-3 justify-center items-center mb-9 mt-3 w-1/2 ">
      <h1 className="text-4xl bold">Posts</h1>
      {showPost}
    </div>
  );
}

export default PostList;
