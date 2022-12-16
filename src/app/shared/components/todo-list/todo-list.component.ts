import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  addtoDo: string = '';
  toDoList: string[] = [
    'Angular çalış',
    'Ödevleri yap',
    "Gece 1'e kadar frontend geliştir",
  ];

  addToDo() {
    this.toDoList.push(this.addtoDo);
    this.addtoDo = '';
  }
  removeToDo(todo: string) {
    this.toDoList = this.toDoList.filter((t) => t != todo);
  }
}
