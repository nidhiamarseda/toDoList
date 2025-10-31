import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskModel } from '../todo/entities/task.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';


@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(TaskModel)
    private taskRepository: Repository<TaskModel>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  /**
   * Creates a new task for a specific user
   * 
   * @param {CreateTaskDto} createTaskDto - DTO containing task details (description and optional completed status)
   * @param {number} userId - The ID of the user who owns the task
   * @param {string} imageUrl - The URL of the uploaded image associated with the task
   * @returns {Promise<TaskModel>} The newly created task entity after persistence
   */
  async createTask(createTaskDto: CreateTaskDto, userId: number, imageUrl: string): Promise<TaskModel> {
    const newTask = this.taskRepository.create({ ...createTaskDto, userId, imageUrl });
    return await this.taskRepository.save(newTask);
  }

  /**
   * Retrieves all tasks for a specific user
   * 
   * @param {number} userId - The ID of the user whose tasks to retrieve
   * @returns {Promise<TaskModel[]>} Array of all task entities belonging to the user, ordered by ID descending
   */
  async findAllTasks(userId: number): Promise<TaskModel[]> {
    return this.taskRepository.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' },
    });
  }


  /**
   * Finds a specific task by ID for a given user
   * 
   * @param {number} id - The unique identifier of the task
   * @param {number} userId - The ID of the user who owns the task
   * @returns {Promise<TaskModel>} The matching task entity if found
   * @throws {NotFoundException} When no task exists for the given id and userId combination
   */
  async findTaskById(id: number, userId: number) {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    return task;

  }


  /**
   * Deletes a task by its ID
   * 
   * @param {number} id - The unique identifier of the task to delete
   * @returns {Promise<String>} Success message confirming the deletion
   * @throws {NotFoundException} When no task exists for the given id
   */
  async deleteTaskById(id: number): Promise<String> {
    const result = await this.taskRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException("Task Not Found");
    }
    return "Task Deleted Successfully";
  }


  /**
   * Updates an existing task with new data
   * 
   * @param {number} id - The unique identifier of the task to update
   * @param {UpdateTaskDto} updatedTask - DTO containing the fields to update (description, completed status)
   * @returns {Promise<String>} Success message confirming the update
   * @throws {NotFoundException} When no task exists for the given id
   */
  async updateTaskById(id: number, updatedTask: UpdateTaskDto): Promise<String> {
    let result = await this.taskRepository.update(id, updatedTask);
    if (result.affected == 0) {
      throw new NotFoundException("Task Not Found");
    }
    return "Updated SuccessFully";

  }
}    
