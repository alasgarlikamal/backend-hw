import { forwardRef, Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionTypesModule } from 'src/question-types/question-types.module';
import { AnswersModule } from 'src/answers/answers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), QuestionTypesModule, forwardRef(() => AnswersModule)],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService]
})
export class QuestionsModule {}
