import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Comment } from "@/models/Comments.js"
import { logger } from "@/utils/Logger.js"


class CommentsService {
  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log('Deleting comment', response.data)
    const indexToDelete = AppState.comments.findIndex(comment => comment.id == commentId)
    AppState.comments.splice(indexToDelete, 1)
  }
  async getAllEventComments(eventId) {
    const response = await api.get(`api/events/${eventId}/comments/`)
    logger.log('Comments for event found', response.data)
    const eventComment = response.data.map(commentData => new Comment(commentData))
    AppState.comments = eventComment
  }

  async createComment(commentData) {
    const response = await api.post(`api/comments`, commentData)
    const createComment = new Comment(response.data)
    AppState.comments.push(createComment)
    return createComment
  }

}

export const commentsService = new CommentsService()