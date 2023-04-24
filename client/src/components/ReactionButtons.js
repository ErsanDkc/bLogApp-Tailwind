import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from '../redux/post/postSlice'

const reactionEmoji = {
    heart: '❤️',
    rocket: '🚀',
}
function ReactionButtons({post}) {
  const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name,emoji]) => {
    return (
      <button key={name}
      type='button'
      
      onClick={() => dispatch(reactionAdded({postId: post.id, reaction:name}))}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })
    
  return (
    <div className='flex flex-row gap-2'>
      {reactionButtons}
    </div>
  )
}

export default ReactionButtons