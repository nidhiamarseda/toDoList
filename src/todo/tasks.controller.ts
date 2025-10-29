import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    createTask(@Body() task: CreateTaskDto) {
        console.log(task)
        return this.taskService.createTask(task);
    }

    @Get()
    getTasks() {
        return this.taskService.findAllTasks();
    }

    @Get(':taskId')
    getTaskById(@Param('taskId', ParseIntPipe) id: number) {
        console.log("Task ID: ", id);
        return this.taskService.findTaskById(id);
    }

    @Delete(':taskId')
    deleteTaskById(@Param('taskId', ParseIntPipe) id: number) {
        return this.taskService.deleteTaskById(id);
    }

    @Patch(':taskId')
    updateTaskById(@Param('taskId', ParseIntPipe) id: number, @Body() task: UpdateTaskDto) {
        return this.taskService.updateTaskById(id, task);
    }
}
