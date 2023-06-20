import { commentService } from '../services/comment.service.js'
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  SET_COMMENTS,
  UNDO_REMOVE_COMMENT,
  UPDATE_COMMENT,

} from './comment.reducer.js'


// Action Creators:
export function getActionRemoveComment(commentId) {
  return {
    type: REMOVE_COMMENT,
    commentId,
  }
}

export function getActionAddComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}
export function getActionUpdateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment,
  }
}

export async function loadComments(filterBy) {
  try {
    const comments = await commentService.query(filterBy)
    console.log('Comments from DB:', comments)
    store.dispatch({
      type: SET_COMMENTS,
      comments,
    })
  } catch (err) {
    console.log('Cannot load comments', err)
    throw err
  }
}

export async function removeComment(commentId) {
  try {
    await commentService.remove(commentId)
    store.dispatch(getActionRemoveComment(commentId))
  } catch (err) {
    console.log('Cannot remove comment', err)
    throw err
  }
}

export async function addComment(comment) {
  try {
    const savedComment = await commentService.save(comment)
    console.log('Added Comment', savedComment)
    store.dispatch(getActionAddComment(savedComment))
    return savedComment
  } catch (err) {
    console.log('Cannot add comment', err)
    throw err
  }
}
