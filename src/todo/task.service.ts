import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskModel } from '../todo/entities/task.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class TaskService {

  constructor(@InjectRepository(TaskModel)
  private taskRepository: Repository<TaskModel>
  ) { }

  /**
   * @param createTaskDto DTO carrying `description` and optional `completed`
   * @returns Newly created `TaskModel` after persistence
   */
  createTask(createTaskDto: CreateTaskDto): Promise<TaskModel> {
    const newTask = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(newTask);
  }



  /**
   * @returns Array of all `TaskModel` records
   */
  async findAllTasks(): Promise<TaskModel[]> {
    return await this.taskRepository.find();
  }


  /**
   * @param id Numeric task identifier
   * @returns The matching `TaskModel` if found
   * @throws NotFoundException when no task exists for the given id
   */
  async findTaskById(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    return task;

  }


  /**
   * @param id Numeric task identifier to delete
   * @returns Success message after deletion
   * @throws NotFoundException when no task was deleted
   */
  async deleteTaskById(id: number): Promise<String> {
    const result = await this.taskRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException("Task Not Found");
    }
    return "Task Deleted Successfully";
  }


  /**
   * @param id Numeric task identifier to update
   * @param updatedTask DTO with fields to update (`description`, `completed`)
   * @returns Success message after update
   * @throws NotFoundException when no task was updated
   */
  async updateTaskById(id: number, updatedTask: UpdateTaskDto): Promise<String> {
    let result = await this.taskRepository.update(id, updatedTask);
    if (result.affected == 0) {
      throw new NotFoundException("Task Not Found");
    }
    return "Updated SuccessFully";

  }
}    
