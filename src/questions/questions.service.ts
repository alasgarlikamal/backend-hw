import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswersService } from 'src/answers/answers.service';
import { Answer } from 'src/answers/entities/answer.entity';
import { QuestionTypesService } from 'src/question-types/question-types.service';
import { DataSource, Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {

  constructor(
    @InjectRepository(Question) private questionsRepository: Repository<Question>,
    @Inject(forwardRef(() => AnswersService)) private answersService: AnswersService,
    private questionTypesService: QuestionTypesService,
    private readonly dataSource: DataSource
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const questionType = await this.questionTypesService.findById(createQuestionDto.questionTypeId);

      const question = this.questionsRepository.create({ ...createQuestionDto, questionType });

      await queryRunner.manager.save(question);

      const answersArray: Array<Answer> = [];
      await Promise.all(createQuestionDto.answers.map(async (answer) => {
        answersArray.push({...await this.answersService.create(answer), question});
      }));

      await queryRunner.manager.getRepository(Answer)
      .createQueryBuilder()
      .insert()
      .into(Answer)
      .values(answersArray)
      .execute();

      await queryRunner.commitTransaction();

      return {message: `Question with id ${question.id} was created`};
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

  }

  async findAll() {
    const questions = await this.questionsRepository.find({relations: ['questionType', 'answers']});

    if (questions.length === 0) throw new NotFoundException('No question was found');

    return questions;
  }

  async findById(id: number): Promise<Question> {
    const questionType = await this.questionsRepository.findOne({where: {id}, relations: ['questionType', 'answers']});

    if (!questionType) throw new NotFoundException(`Question with id ${id} not found`);

    return questionType;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.findById(id);

    Object.assign(question, updateQuestionDto);

    return await this.questionsRepository.save(question);
  }

  async delete(id: number) {
    const question = await this.findById(id);

    await this.questionsRepository.remove(question);

    return {message: `Question with id ${id} was deleted`};
  }
}
