import React, { useState } from 'react'
import { utilService } from '../services/util.service'

export function CommentFilter({ onFilterBy }) {
    const [filter, setFilter] = useState('')

    const debouncedFilterChange = utilService.debounce(onFilterBy)

    function handleChangeFilter(event) {
        setFilter(event.target.value)
        debouncedFilterChange(event.target.value)
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
