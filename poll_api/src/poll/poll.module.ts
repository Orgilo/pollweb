import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PollController } from "./poll.controller";
import { PollService } from "./poll.service";
import { Poll } from "./entities/poll.entity";
import { UserModule } from "src/user/user.module"; // Update the path accordingly
import { Question } from "src/question/entities/question.entity";
import { QuestionService } from "src/question/question.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Poll, Question]),
        UserModule, // Add the UserModule here
    ],
    controllers: [PollController ],
    providers: [PollService,QuestionService,],
})
export class PollModule {}
