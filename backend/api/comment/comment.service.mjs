import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const PAGE_SIZE = 3


async function query(filterBy = { txt: '' }) {
    try {
        const criteria = {
            message: { $regex: filterBy.txt, $options: 'i' }
        }
        const collection = await dbService.getCollection('comment')
        var commentCursor = await collection.find(criteria)


        if (filterBy.pageIdx !== undefined) {
            commentCursor.skip(filterBy.pageIdx * PAGE_SIZE).limit(PAGE_SIZE)
        }

        const comments = commentCursor.toArray()
        return comments
    } catch (err) {
        logger.error('cannot find comments', err)
        throw err
    }
}

async function getById(commentId) {
    try {
        const collection = await dbService.getCollection('comment')
        const comment = collection.findOne({ _id: new ObjectId(commentId) })
        return comment
    } catch (err) {
        logger.error(`while finding comment ${commentId}`, err)
        throw err
    }
}

async function remove(commentId) {
    try {
        const collection = await dbService.getCollection('comment')
        await collection.deleteOne({ _id: ObjectId(commentId) })
        return commentId
    } catch (err) {
        logger.error(`cannot remove comment ${commentId}`, err)
        throw err
    }
}

async function add(comment) {
    try {
        const collection = await dbService.getCollection('comment')
        await collection.insertOne(comment)
        return comment
    } catch (err) {
        logger.error('cannot insert comment', err)
        throw err
    }
}

async function update(comment) {
    try {
        const commentToSave = { ...comment }
        // to avoid MongoError: modifying immutable field '_id'
        delete commentToSave._id
        // commentToSave
        const collection = await dbService.getCollection('comment')
        await collection.updateOne({ _id: ObjectId(comment._id) }, { $set: commentToSave })
        return comment
    } catch (err) {
        logger.error(`cannot update comment ${comment._id}`, err)
        throw err
    }
}

export const commentService = {
    remove,
    query,
    getById,
    add,
    update
}
