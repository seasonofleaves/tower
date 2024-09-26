import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super(`api/comments`)
    this.router
      // .get('', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
  }

  async createComment(request, response, next) {
    try {
      const commentData = request.body
      const userInfo = request.userInfo
      commentData.creatorId = userInfo.id
      const comment = await commentsService.createComment(commentData)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }

  // async getEventComments(request, response, next){
  //   try {
  //     const comments = await commentsService.getEventComments()
  //     response.send(comments)
  //   }
  //   catch (error){
  //     next(error);
  //   }
  // }
}