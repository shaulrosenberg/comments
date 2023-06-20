import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// actions
import { addComment, removeComment, loadComments } from '../store/comment.actions'
import { AddComment } from '../cmps/comment-add'
import { CommentList } from '../cmps/comment-list'
import { CommentFilter } from '../cmps/comment-filter'

export function CommentIndex() {
    // useSelector for comments
    const { comments } = useSelector(storeState => storeState.commentModule)
    const [filterBy, setFilterBy] = useState('')

    useEffect(() => {
        loadComments()
        // add listeners
        return () => {

        }
    }, [filterBy])

    const handleFilter = (filterBy) => {
        setFilterBy(filterBy)
    }

    const filterRegEx = new RegExp(filterBy, 'i');

    const filteredComments = comments.filter(comment =>
        filterRegEx.test(comment.email) || filterRegEx.test(comment.message)
    )

    if(!filteredComments && !filteredComments.length) return <h1>Loading...</h1>
    return (
        <section>
            <AddComment addComment={addComment} />
            <CommentFilter onFilterBy={handleFilter} />
            <CommentList comments={comments} />
        </section>
    )
}