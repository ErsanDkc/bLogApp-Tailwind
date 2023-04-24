import { parseISO,formatDistanceToNow } from "date-fns";

import React from 'react'

function TimeAgo({time}) {
    let timeAgo = ""

    if(time) {
        const date = parseISO(time)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
  return (
    <span title={time}>{timeAgo}</span>
  )
}

export default TimeAgo