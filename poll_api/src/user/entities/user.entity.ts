import { Answer } from "src/answer/entities/answer.entity";
import { Poll } from "src/poll/entities/poll.entity";
import { Question } from "src/question/entities/question.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: 'user_id', type: 'int' })
    id: number;

    @Column({ name: 'First_name', type: 'varchar', length: 50 })
    firstName: string;

    @Column({ name: 'Last_name', type: 'varchar', length: 50 })
    lastName: string;

    @Column({ name: 'username', type: 'varchar', length: 50 })
    username: string;
    @Column({ name: 'email', type: 'varchar', length: 50 })
    email: string;

    @Column({ name: 'password', type: 'varchar' })
    password: string;



    
    @OneToMany(() => Poll, (poll) => poll.user)
    polls: Poll[];

    @OneToMany(() => Question, (question) => question.user)
    questions: Question[];
     
    @OneToMany(() => Answer, (answer) => answer.user)
    answers: Answer[];





    @CreateDateColumn({ name: 'created_at', type: 'date' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at', type: 'date' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'delete_at', type: 'date', nullable: true })
    deletedAt: Date | null;
}
