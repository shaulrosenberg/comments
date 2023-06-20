import React, { useState } from "react"
import md5 from "md5"

export function AddComment({ addComment }) {
    const [email, setEmail] = useState(""); // State to store the user's email
    const [message, setMessage] = useState(""); // State to store the message content

    function handleChangeEmail(event) {
        setEmail(event.target.value); // Update the email as the user types
    }

    function handleChangeMessage(event) {
        setMessage(event.target.value); // Update the message content as the user types
    }

    function handleSubmit(event) {
        event.preventDefault()
        const gravatarURL = `https://www.gravatar.com/avatar/${md5(email.toLowerCase().trim())}?s=80`
        addComment({ email, message, imgUrl: gravatarURL })
        // clear inputs
        setEmail("")
        setMessage("")
    }

    return (
        <section className="comment-add">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email"
                    required
                />
                <textarea
                    value={message}
                    onChange={handleChangeMessage}
                    placeholder="Enter your message"
                    required
                ></textarea>
                <button type="submit">Add Comment</button>
            </form>
        </section>
    )
}
