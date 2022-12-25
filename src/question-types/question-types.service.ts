import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuestionType } from "./entities/question-type.entity";
import { DataSource } from "typeorm";

@Injectable()
export class QuestionTypesService{
    constructor(
        @InjectRepository(QuestionType) private questionTypesRepository: Repository<QuestionType>,
        private dataSource: DataSource
    ) {}

    async findAll() {
        const questionTypes = await this.questionTypesRepository.find();

        if (!questionTypes) throw new NotFoundException('Question types not found');

        return questionTypes;
    }

    async findById(id: number): Promise<QuestionType> {
        const questionType = await this.questionTypesRepository.findOneBy({id});

        if (!questionType) throw new NotFoundException(`Question type with id ${id} not found`);

        return questionType;
    }

    async seed() {
        try {
            const questionTypes = [
                { id: 1, name: 'MCQ' },
                { id: 2, name: 'DCQ' },
                { id: 3, name: 'Numeric' },
                { id: 4, name: 'Text' }
            ];

            await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
            await this.dataSource.query('TRUNCATE TABLE question_types;');
            await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    
            await this.dataSource.getRepository(QuestionType)
            .createQueryBuilder('question_types')
            .insert()
            .into(QuestionType)
            .values(questionTypes)
            .execute();
    
            return { message: 'Question types seeded'}
            
        } catch (error) {
            throw error;
        }
    }
}