import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Poll } from 'src/poll/entities/poll.entity';
import { PollService } from 'src/poll/poll.service';


@Module({  
  imports: [TypeOrmModule.forFeature([ Question,Poll])],
   
  controllers: [QuestionController],
  providers: [QuestionService,PollService]
})
export class QuestionModule {}
