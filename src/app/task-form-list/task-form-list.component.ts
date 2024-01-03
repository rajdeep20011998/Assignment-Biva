import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/taskService';
import { Task } from '../model/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'task-form-list',
  templateUrl: './task-form-list.component.html',
  styleUrls: ['./task-form-list.component.scss']
})
export class TaskFormListComponent implements OnInit {
  tasks: Task[] = [];
  editForm: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  editTask(task: Task): void {
    this.editForm.patchValue(task);
  }

  cancelEdit(): void {
    this.editForm.reset();
  }

  saveEditedTask(): void {
    const editedTask: Task = this.editForm.value;
    this.taskService.editTask(editedTask);
    this.loadTasks(); // Reload tasks after editing
    this.editForm.reset();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks(); // Reload tasks after deletion
  }
}