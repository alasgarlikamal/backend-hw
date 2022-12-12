import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateAnswerDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(255)
    answer?: string;

    @IsBoolean()
    @IsOptional()
    is_correct?: boolean;
}