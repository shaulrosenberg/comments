import { CommentPreview } from "./comment-preview"


export function CommentList({ comments }) {
    return (
        <section className="comment-list">
            {comments?.map(comment => <CommentPreview key={comment._id} comment={comment} />)}
        </section>
    )
}