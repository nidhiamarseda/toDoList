import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModel } from './entities/task.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskModel, User])],
  controllers: [TasksController],
  providers: [TaskService]
})
export class TodoModule { }
