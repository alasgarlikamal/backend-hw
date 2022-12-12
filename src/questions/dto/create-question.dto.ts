import { IsNotEmpty, IsNumber, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAnswerDto } from '../../answers/dto/create-answer.dto';

export class CreateQuestionDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(1023)
    text: string;

    @IsNumber()
    @IsNotEmpty()
    questionTypeId: number;
    
    @ValidateNested()
    @Type(() => CreateAnswerDto)
    answers: CreateAnswerDto[];

}
