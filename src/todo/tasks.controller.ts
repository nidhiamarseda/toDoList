import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskModule } from './task.module';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    createTask(@Body() task: TaskModule) {
        console.log(task)
        return this.taskService.createTask(task);
    }

    @Get()
    getTasks() {
        return this.taskService.findAllTasks();
    }

    @Get(':taskId')
    getTaskById(@Param('taskId') id: number) {
        console.log("Task ID: ", id);
        return this.taskService.findTaskById(id);
    }

    @Delete(':taskId')
    deleteTaskById(@Param('taskId') id: number) {
        return this.taskService.deleteTaskById(id);
    }

    @Patch(':taskId')
    updateTaskById(@Param('taskId') id: number, @Body() task: TaskModule) {
        return this.taskService.updateTaskById(id, task);
    }
}
