import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskModel } from '../todo/entities/task.entity'


@Injectable()
export class TaskService {
    private tasks: TaskModel[] = [];
    private id: number = 1;


    createTask(newTask: CreateTaskDto) : TaskModel {
        const task = {
            id: this.id++,
            description: newTask.description,
            completed: false
        };
        this.tasks.push(task);
        return task
    }

    findAllTasks(): TaskModel[] {
        return this.tasks;
    }

    findTaskById(id: number) {
        return this.tasks.find(task => task.id == id);
    }

    deleteTaskById(id: number) {
        this.tasks = this.tasks.filter(task => task.id != id);
        return this.tasks
    }

    updateTaskById(id: number, updatedTask: UpdateTaskDto): TaskModel {
        const task = this.tasks.find(task => task.id == id);

        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }

        if (updatedTask.description !== undefined) {
            task.description = updatedTask.description;
        }
        if (updatedTask.completed !== undefined) {
            task.completed = updatedTask.completed;
        }

        return task;
    } 
}    
