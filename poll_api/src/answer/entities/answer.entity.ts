
import { Poll } from "src/poll/entities/poll.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn({ name: 'answer_id', type: 'int' })
    id: number;
     
    @ManyToOne(() => User, (user) => user.answers)
    @JoinColumn({name: 'user_id' })
    user: User
    
    @Column({ name: 'answer', type: 'varchar', nullable: true})
    answer: string;
     // Add fields to store question information
     
     


}
