import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateQuestionDto {

    @IsString()
    @IsOptional()
    @MaxLength(1023)
    text?: string;

    @IsNumber()
    points?: number;

    @IsString()
    @MaxLength(1023)
    feedback?: string;

    @IsNumber()
    @IsOptional()
    questionTypeId?: number;

}
