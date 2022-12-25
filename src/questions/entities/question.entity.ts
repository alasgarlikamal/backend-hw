import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "../../answers/entities/answer.entity";
import { QuestionType } from "../../question-types/entities/question-type.entity";

@Entity({ name: 'questions'})
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 1023, default: ''})
    text: string;

    @Column({type: 'varchar', length: 1023, default: ''})
    feedback: string;

    @Column({type: 'int', default: 0})
    points: number;

    @ManyToOne(() => QuestionType, question_type => question_type.questions)
    @JoinColumn({name: 'question_type_id'})
    questionType: QuestionType;

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[];

}
