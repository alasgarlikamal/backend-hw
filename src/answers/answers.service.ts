import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAnswerDto } from "src/answers/dto/create-answer.dto";
import { QuestionsService } from "src/questions/questions.service";
import { Repository } from "typeorm";
import { UpdateAnswerDto } from "./dto/update-answer.dto";
import { Answer } from "./entities/answer.entity";

@Injectable()
export class AnswersService{
    constructor(
        @InjectRepository(Answer) private answersRepository: Repository<Answer>,
        @Inject(forwardRef(() => QuestionsService)) private questionsService: QuestionsService
    ) {}

    async create(createAnswerDto: CreateAnswerDto) {
  
        const answer = this.answersRepository.create(createAnswerDto);

        if (!answer) throw new Error(`Answer could not be created`);
            
        return answer;
    }

    async createAnswerByQuestionId(createAnswerDto: CreateAnswerDto) {
        const question = await this.questionsService.findById(createAnswerDto.questionId);

        const answer = this.answersRepository.create({...createAnswerDto, question});

        if (!answer) throw new Error(`Answer could not be created`);

        return await this.answersRepository.save(answer);
    }

    async update(id: number, updateAnswerDto: UpdateAnswerDto) {
        const answer =  await this.findById(id);

        Object.assign(answer, updateAnswerDto);

        return await this.answersRepository.save(answer);
    }

    async findById(id: number) {
        const answer = await this.answersRepository.findOneBy({id});

        if (!answer) throw new NotFoundException(`Answer with id ${id} not found`);

        return answer;
    }

    async delete(id: number) {
        const answer = await this.findById(id);

        await this.answersRepository.remove(answer);

        return {message: `Answer with id ${id} was deleted`};
    }
}