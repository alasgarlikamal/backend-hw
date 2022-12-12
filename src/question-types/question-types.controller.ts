import { Controller, Get } from '@nestjs/common';
import { QuestionTypesService } from './question-types.service';

@Controller('question-types')
export class QuestionTypesController {
    constructor(private readonly questionTypesService: QuestionTypesService) {}

    @Get('seed')
    async seed() {
        return await this.questionTypesService.seed();
    }
}
