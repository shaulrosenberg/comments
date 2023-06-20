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
    const [filterBy, setFilterBy] = useState({ txt: '' })

    useEffect(() => {
        loadComments(filterBy)
        // add listeners
        return () => {

        }
    }, [filterBy])

    const handleFilter = (txt) => {
        setFilterBy({ txt })
    }

    const filterRegEx = new RegExp(filterBy.txt, 'i')

    const filteredComments = comments.filter(comment =>
        filterRegEx.test(comment.email) || filterRegEx.test(comment.message)
    )

    return (
        <section>
            <AddComment addComment={addComment} />
            <CommentFilter onFilterBy={handleFilter} filterBy={filterBy}/>
            {filteredComments.length ? <CommentList comments={filteredComments} /> : 'No matching comments'}
        </section>
    )
}
