// maybe add remove functionality


export function CommentPreview({ comment }) {
    return (
        <article className="comment-preview">
            <img src={comment.imgUrl}></img>
            <span className="comment-user">{comment.email}</span>
            <span className="comment-body">{comment.message}</span>
        </article>
    )
}