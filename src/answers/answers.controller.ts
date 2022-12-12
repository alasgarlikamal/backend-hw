import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {

    constructor(private readonly answersService: AnswersService) {}

    @Post()
    async createAnswerByQuestionId(@Body() createAnswerDto: CreateAnswerDto) {
        return await this.answersService.createAnswerByQuestionId(createAnswerDto);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
        return await this.answersService.update(id, updateAnswerDto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.answersService.delete(id);
    }

}
