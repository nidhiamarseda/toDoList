import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors, Catch, ExceptionFilter, ArgumentsHost, PayloadTooLargeException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AwsService } from 'src/aws/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { MulterError } from 'multer';


@Catch(MulterError, PayloadTooLargeException)
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError | PayloadTooLargeException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof PayloadTooLargeException) {
      return response.status(400).json({
        statusCode: 400,
        message: 'File size must be under 10 MB',
        error: 'Bad Request',
      });
    }

    if (exception instanceof MulterError && exception.code === 'LIMIT_FILE_SIZE') {
      return response.status(400).json({
        statusCode: 400,
        message: 'File size must be under 10 MB',
        error: 'Bad Request',
      });
    }

    return response.status(400).json({
      statusCode: 400,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}


@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    private readonly taskService: TaskService,
    private readonly awsService: AwsService
  ) { }

  @Post()
  @UseFilters(new MulterExceptionFilter())
  @UseInterceptors(FileInterceptor('image', { storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }))
  async createTask(
    @Body() task: CreateTaskDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req) {
    const userId = req.user.userId;

    let imageUrl: string = '';

    if (file) {
      imageUrl = await this.awsService.uploadFile(file);
    }

    return this.taskService.createTask(task, userId, imageUrl);
  }

  @Get()
  getTasks(@Req() req) {
    const userId = req.user.userId;
    return this.taskService.findAllTasks(userId);
  }

  @Get(':taskId')
  getTaskById(@Param('taskId', ParseIntPipe) id: number, @Req() req) {
    const userId = req.user.userId;
    return this.taskService.findTaskById(id, userId);
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
