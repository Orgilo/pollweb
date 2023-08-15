import { Poll } from "src/poll/entities/poll.entity";
import { Question } from "src/question/entities/question.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn({ name: 'answer_id', type: 'int' })
    id: number;
     
    @ManyToOne(() => User, (user) => user.answers)
    @JoinColumn({name: 'user_id' })
    user: User

    @ManyToOne(() => Question, (question) => question.answers)
    @JoinColumn({name: 'question_id'})
    question: Question
    
    
    @ManyToOne(() => Poll, (poll) => poll.answers)
    @JoinColumn({name: 'poll_id'})
    poll: Poll
    
}


