
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

  
    @Column({ name: 'questiontitle', type: 'varchar', length: 200 })
    questiontitle: string;

    @Column({ name: 'qanswer', type: 'varchar', length: 1000 })
    qanswer: string;

    @Column({ name: 'title', type: 'varchar', length: 100, nullable: true })
    title: string;


    @Column({ type: 'jsonb', nullable: true }) // Use 'jsonb' type for JSON object
    options: Record<string, any>; 

}

