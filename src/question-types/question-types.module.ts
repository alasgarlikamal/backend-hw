import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionType } from './entities/question-type.entity';
import { QuestionTypesService } from './question-types.service';
import { QuestionTypesController } from './question-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionType])],
  providers: [QuestionTypesService],
  exports: [QuestionTypesService],
  controllers: [QuestionTypesController]
})
export class QuestionTypesModule {}