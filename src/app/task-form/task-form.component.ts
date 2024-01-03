import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { TaskService } from '../services/taskService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  form: any;

  constructor(
    fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.taskService.loadTasksFromLocalStorage();
  }

  get name() {
    return this.form.get('name');
  }

  get Description() {
    return this.form.get('description');
  }

  get dueDate() {
    return this.form.get('dueDate');
  }

  async onSubmit() {
    if (this.form.valid) {
      await this.taskService.addTask(this.form.value);
      this.form.reset();
      this.router.navigate(['task-form-list']);
    }
  }
}
