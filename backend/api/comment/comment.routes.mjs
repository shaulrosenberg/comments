import express from 'express'
import { log } from '../../middlewares/logger.middleware.mjs'
import { getComments, getCommentById, addComment, updateComment, removeComment } from './comment.controller.mjs'


const router = express.Router()

// We can add a middleware for the entire router:
router.get('/', log, getComments)
router.get('/:id', getCommentById)
router.post('/',  addComment)
router.put('/:id',  updateComment)
router.delete('/:id',  removeComment)

export const commentRoutes = router
