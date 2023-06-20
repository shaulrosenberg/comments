import React, { useState } from 'react'

export function CommentFilter({ onFilterBy }) {
    const [filter, setFilter] = useState('')

    function handleChangeFilter(event) {
        setFilter(event.target.value)
        onFilterBy(event.target.value)
    }

    return (
        <section className="comment-filter">
            <input 
                type="text" 
                value={filter} 
                onChange={handleChangeFilter} 
                placeholder="Filter comments"
            />
        </section>
    )
}
