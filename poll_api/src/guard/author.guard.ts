import { CanActivate, ExecutionContext, Injectable, NotAcceptableException } from "@nestjs/common";
import { PollService } from "src/poll/poll.service";
import { QuestionService } from "src/question/question.service";


@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
        private readonly questionService: QuestionService,
        private readonly pollService: PollService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const { id, type } = request.params

        
         
        let entity

        switch (type) {
            case 'questions':
                entity = await this.questionService.findOne(id)
                break;
           case 'poll':
                 entity = await this.pollService.findOne(id)
                break;
            default:
                throw new NotAcceptableException('Ymar neg zuil buruu baina...')
        }
         const user = request.user

         
         
         if(entity && user && entity.user.id === user.id){
            return true
         }

        return false
    }
}