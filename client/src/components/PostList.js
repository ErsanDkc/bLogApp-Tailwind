import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../redux/post/postSlice'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
function PostList() {
    const posts = useSelector(getAllPosts)
    const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    const showPost = orderedPost.map((post) =>
        <article key={post.id} className='bg-white flex flex-col gap-3 p-3 border-2  border-slate-600 rounded-lg min-w-full '>
            <span className='flex justify-between'>
                <h3 className='text-3xl  text-zinc-950 capitalize semibold'>{post.title}</h3>
                <h4 className='text-normal italic capitalize'>by {post.userId ? post.userId : "Unknown Author"}</h4>
            </span>
            <p className='text-2xl text-zinc-600 normal-case whitespace-normal tracking-wide leading-relaxed'>{post.content}</p>
            <p>
                <TimeAgo time={post.date} />
            </p>
            <ReactionButtons post={post} />


        </article>)

    return (
        <div className='flex  flex-col gap-3 justify-center items-center mb-9 mt-3 w-1/2 '>
            <h1 className='text-4xl bold'>Posts</h1>
            {showPost}
        </div>
    )
}

export default PostList