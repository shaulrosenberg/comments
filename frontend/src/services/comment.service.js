import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { socketService } from './socket.service.js'

const BASE_URL = 'comment/'

export const commentService = {
    query,
    getById,
    save,
    remove
}


function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(commentId) {
    return httpService.get(BASE_URL + commentId)
}

function remove(commentId) {
    return httpService.delete(BASE_URL + commentId)
}

async function save(comment) {
    try {
        let updatedComment
        if (comment._id) {
            updatedComment = await httpService.put(BASE_URL + comment._id, comment)
        } else {
            updatedComment = await httpService.post(BASE_URL, comment)
        }
        // socketService.emit('comment-change', updatedComment)
        return updatedComment
    } catch (err) {
        console.error('Failed to save comment:', err)
        throw err
    }
}