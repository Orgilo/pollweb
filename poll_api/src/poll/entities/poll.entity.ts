import { Answer } from "src/answer/entities/answer.entity";
import { Question } from "src/question/entities/question.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Poll {
    @PrimaryGeneratedColumn({ name: 'poll_id', type: 'int' })
    id: number;
  
    
    @ManyToOne(() => User, (user) => user.polls)
    @JoinColumn({name: 'user_id' })
    user: User

    
    @OneToMany(() => Question, (question) => question.poll)
    questions: Question[];
    
  

    @Column({ name: 'title', type: 'varchar', length: 50 })
    title: string;
    @Column({ name: 'explanation', type: 'varchar', length: 100 })
    explanation: string;
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'update_at', type: 'timestamp' })
    updatedAt: Date;
    @DeleteDateColumn({ name: 'delete_at',  type: 'timestamp', nullable: true})
    deletedAt: Date | null;
    
}
export interface Poll {
    id: number;
    user_id: number;
    title: string;
    explanation: string;
    createdAt: Date;
    updatedAt: Date;
  }
