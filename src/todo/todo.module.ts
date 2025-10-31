import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModel } from './entities/task.entity';
import { User } from 'src/users/user.entity';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskModel, User]), AwsModule],
  controllers: [TasksController],
  providers: [TaskService]
})
export class TodoModule { }
