import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from 'src/questions/questions.module';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { AnswersController } from './answers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), forwardRef(() => QuestionsModule)],
  providers: [AnswersService],
  exports: [AnswersService],
  controllers: [AnswersController]
})
export class AnswersModule {}