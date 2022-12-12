import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../../questions/entities/question.entity";

@Entity({name: 'question_types'})
export class QuestionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, nullable: false})
  name: string;

  @OneToMany(() => Question, question => question.questionType)
  questions: Question[];

}