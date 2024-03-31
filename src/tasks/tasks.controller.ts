import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Get,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/cerateTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTodos() {
    return await this.tasksService.getAll();
  }

  @Post('create')
  async createTodo(@Body() createTaskDto: CreateTaskDto) {
    await this.tasksService.create(createTaskDto);
    return { success: true };
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.delete(id);
  }

  @Put(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.tasksService.update(id, createTaskDto);
  }
}
