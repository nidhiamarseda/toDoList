import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TasksController],
  providers: [TaskService]
})
export class TodoModule {}
