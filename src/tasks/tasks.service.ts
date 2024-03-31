import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/cerateTask.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getAll(): Promise<CreateTaskDto[]> {
    return await this.taskRepository.find();
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.name = createTaskDto.name;
    task.desc = createTaskDto.desc;
    await this.taskRepository.save(task);
  }

  async delete(id: number) {
    await this.taskRepository.delete({ id });
  }

  async update(id: number, createTaskDto: CreateTaskDto) {
    const taskToUpdate = await this.taskRepository.findOneBy({ id });
    Object.assign(taskToUpdate, createTaskDto);

    return this.taskRepository.save(taskToUpdate);
  }
}
