import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return comments
  }

  async deleteComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.findById(commentId)
    if (!commentToDelete) throw Error(`Could not delete, no comment with id: ${commentId}`)
    if (userId != commentToDelete.creatorId) throw new Forbidden(`Not your comment to delete`)
    await commentToDelete.deleteOne()
    return 'You deleted your comment'
  }

}

export const commentsService = new CommentsService()