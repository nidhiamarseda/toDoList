import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  createTask(@Body() task: CreateTaskDto, @Req() req) {
    const userId = req.user.userId;
    return this.taskService.createTask(task, userId);
  }

  @Get()
  getTasks(@Req() req) {
    const userId = req.user.userId;
    return this.taskService.findAllTasks(userId);
  }

  @Get(':taskId')
  getTaskById(@Param('taskId', ParseIntPipe) id: number, @Req() req) {
    const userId = req.user.userId;
    return this.taskService.findTaskById(id);
  }

  @Delete(':taskId')
  deleteTaskById(@Param('taskId', ParseIntPipe) id: number, @Req() req) {
    const userId = req.user.userId;
    return this.taskService.deleteTaskById(id);
  }

  @Patch(':taskId')
  updateTaskById(@Param('taskId', ParseIntPipe) id: number, @Body() task: UpdateTaskDto, @Req() req) {
    const userId = req.user.userId;
    return this.taskService.updateTaskById(id, task);
  }
}
