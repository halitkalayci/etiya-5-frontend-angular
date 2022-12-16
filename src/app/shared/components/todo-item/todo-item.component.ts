import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: string;
  @Output() onToDoDelete = new EventEmitter<string>();

  onDeleteBtnClick() {
    this.onToDoDelete.emit(this.todo);
  }
  // emit => trigger => ilgili fonksiyonu ateşlemek-çağırmak
}
