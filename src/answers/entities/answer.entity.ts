import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../../questions/entities/question.entity";

@Entity({name: 'answers'})
export class Answer{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    text: string;
    
    @ManyToOne(() => Question, question => question.answers, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'question_id'})
    question: Question;

    @Column({type: 'boolean', default: false})
    is_correct: boolean;

}