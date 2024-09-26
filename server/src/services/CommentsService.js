import { dbContext } from "../db/DbContext.js"

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

}

export const commentsService = new CommentsService()