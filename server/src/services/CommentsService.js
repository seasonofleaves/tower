import { dbContext } from "../db/DbContext.js"

class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

}

export const commentsService = new CommentsService()