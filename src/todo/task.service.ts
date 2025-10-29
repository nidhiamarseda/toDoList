import { Injectable } from '@nestjs/common';
import { TaskModule } from './task.module';

@Injectable()
export class TaskService {
    private tasks: TaskModule[] = [];
    private id: number = 1;


    createTask(newTask: TaskModule) {
        const task = {
            id: this.id++,
            description: newTask.description,
            completed: false
        };
        this.tasks.push(task);
        return task
    }

    findAllTasks(): TaskModule[] {
        return this.tasks;
    }

    findTaskById(id: number) {
        return this.tasks.find(task => task.id == id);
    }

    deleteTaskById(id: number) {
        this.tasks = this.tasks.filter(task => task.id != id);
        return this.tasks
    }

    updateTaskById(id: number, updatedTask: TaskModule) {
        this.tasks.forEach(task => {
            if (task.id == id) {
                task.description = updatedTask.description;
                task.completed = updatedTask.completed;
            }
        });
        return this.tasks
    }
}
