import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { Comment } from "@/models/Comments.js"


class CommentsService {
  async createComment(commentData) {
    const response = await api.post(`api/comments`, commentData)
    const createComment = new Comment(response.data)
    AppState.comments.push(createComment)
    return createComment
  }

}

export const commentsService = new CommentsService()