import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Comment } from "@/models/Comments.js"
import { logger } from "@/utils/Logger.js"


class CommentsService {
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