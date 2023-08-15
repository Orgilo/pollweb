import { Answer } from "src/answer/entities/answer.entity";
import { Poll } from "src/poll/entities/poll.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn({ name: 'question_id', type: 'int' })
    id: number;

    @ManyToOne(() => User, (user) => user.questions)
    @JoinColumn({name: 'user_id' })
    user: User
     

    @ManyToOne(() => Poll, (poll) => poll.questions)
    @JoinColumn({name: 'poll_id'})
    poll: Poll



    @OneToMany(() => Answer, (answer) => answer.question)
     answers: Answer[];
    





    @Column({ name: 'title', type: 'varchar', length: 50 })
    title: string;

    @Column({ name: 'question_choose', type: 'date' })
    questionChoose: Date;

    @Column({ name: 'explanation', type: 'varchar', length: 100 })
    explanation: string;
}

