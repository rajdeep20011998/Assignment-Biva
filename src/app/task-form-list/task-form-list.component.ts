import { Component } from '@angular/core';
import { TaskService } from '../services/taskService';
import { Task } from '../model/task.model';

@Component({
  selector: 'task-form-list',
  templateUrl: './task-form-list.component.html',
  styleUrls: ['./task-form-list.component.scss']
})
export class TaskFormListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    console.log(this.tasks);
  }

  editTask(): void {
    // Implement edit logic
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

}
