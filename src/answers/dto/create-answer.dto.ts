import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAnswerDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    text: string;

    @IsBoolean()
    @IsNotEmpty()
    is_correct: boolean;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    questionId?: number;
}