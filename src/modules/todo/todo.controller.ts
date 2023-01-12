import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoDto } from "./dto/todo.dto";

@Controller('rest/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(){
     return this.todoService.getTodos()
  }
  @Get(':id')
  getTodoById(@Param('id') id: string){
    return this.todoService.getTodoById(id)
  }

  @Post()
  addTodo(@Body() todo: TodoDto): Promise<TodoDto> {
    return this.todoService.addTodo(todo)
  }
  @Put(':id')
  updateTodo(@Body()todo: TodoDto, @Param('id') id: string){
     return this.todoService.updateTodo(todo, id)
  }


  @Delete(':id')
  async deleteTodo(@Param('id')id: string){
      return this.todoService.deleteTodo(id)
  }
}
