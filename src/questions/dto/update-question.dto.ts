import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateQuestionDto {

    @IsString()
    @IsOptional()
    @MaxLength(1023)
    text?: string;

    @IsNumber()
    @IsOptional()
    questionTypeId?: number;

}
