import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'backend',
        username: 'root',
        password: 'password',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    QuestionsModule]
})
export class AppModule {}
