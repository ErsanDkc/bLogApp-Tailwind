import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from '../redux/post/postSlice'

function Post() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [userId,setUserId] = useState("")
    const onChangeTextArea = (e) => setContent(e.target.value)
    const onChangeTitle = (e) => setTitle(e.target.value)
    const onChangeAuthor = (e) => setUserId(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content && userId) {

            dispatch(addPost(title,content,userId))
            setTitle("")
            setContent("")
            setUserId("")
        }
    }

    
    
    
    return (
        <form className='flex flex-col items-center justify-center gap-4 w-1/3'>
            <p className='semibold text-3xl mb-6'>Add New Post!</p>
            <label>Title</label>
            <input className='w-full outline-none rounded-lg  py-2 px-2' autoFocus type="text" value={title} onChange={onChangeTitle} />
            <label>Author</label>
            <input className='w-full outline-none rounded-lg  py-2 px-2'  type="text" value={userId} onChange={onChangeAuthor}/>
            <label>Content</label>
            <textarea value={content} onChange={onChangeTextArea} className='w-full text-lg outline-none rounded-lg p-3' cols="" rows="2"></textarea>
            <button onClick={handleSubmit} className='w-full bg-green-500 text-cyan-50 font-semibold tracking-widest p-2 rounded-lg'>Add</button>
        </form>
    )
}

export default Post