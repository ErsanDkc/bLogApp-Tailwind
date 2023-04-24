import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";


const initialState = {
    posts: JSON.parse(localStorage.getItem("Posts")) ||   [
    {
        id: 1,
        title: "React Öğreniyorum",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            
            heart: 0,
            rocket: 0,
            
        }
    },
    {
        id: 2,
        title: "Redux Öğreniyorum",
        content: "Deneme 3",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            
            heart: 0,
            rocket: 0,
            
        }
    },
    

]
}
export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload)
                localStorage.setItem("Posts",JSON.stringify(state.posts))
            },
            prepare(title, content, userId) {

                return {
                    payload:
                    {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            heart: 0,
                            rocket: 0,
                        }

                    }
                }
            }
        },
        reactionAdded(state,action) {
            const {postId,reaction} = action.payload
            const existingPost = state.posts.find((post) => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
}
)
export const { addPost,reactionAdded } = postSlice.actions;
export const getAllPosts = (state) => state.posts.posts
export default postSlice.reducer;