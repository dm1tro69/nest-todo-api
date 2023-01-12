import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TodoDto } from "./dto/todo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./entities/todo.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {}

  async getTodos(): Promise<Todo[]> {
    return this.todoRepository.find()
  }
  async getTodoById(id: string): Promise<Todo>{

    const todo = await this.todoRepository.findOne({where:{id: +id}})
    if (!todo){
      throw new HttpException('todo not found', HttpStatus.NOT_FOUND)
    }
    return todo
  }

  async addTodo(todo: TodoDto): Promise<Todo> {
    const newTodo = await this.todoRepository.save(todo)
    return newTodo
  }
  async deleteTodo(id: string): Promise<void>{
       await this.todoRepository.delete(id)
  }
  async updateTodo(todo: TodoDto, id: string): Promise<Todo>{
     const newTodo = await this.todoRepository.findOne({where: {id: +id}})
    if (!newTodo){
      throw new HttpException('todo not found', HttpStatus.NOT_FOUND)
    }
    newTodo.title = todo.title
    newTodo.isCompleted = todo.isCompleted
    return this.todoRepository.save(newTodo)
  }

}
