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
  public tasks: Task[] = [];
  public editForm: FormGroup;
  public selectedTask: Task | null = null;

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
    this.selectedTask = { ...task };
    this.editForm.patchValue(this.selectedTask);
  }

  areTasksEqual(task1: Task, task2: Task): boolean {
    return (
      task1.name === task2.name &&
      task1.description === task2.description &&
      new Date(task1.dueDate).getTime() === new Date(task2.dueDate).getTime()
    );
  }

  cancelEdit(): void {
    this.editForm.reset();
  }

  saveEditedTask(): void {
    if (this.selectedTask !== null) {
      const editedTaskValues = this.editForm.value;
      this.selectedTask = { ...this.selectedTask, ...editedTaskValues };
      this.taskService.editTask(this.selectedTask);
      this.loadTasks(); 
      this.editForm.reset();
      this.selectedTask = null;
    } else {
      this.editForm.reset();
      this.selectedTask = null;
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks(); 
  }
}