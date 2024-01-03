import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(task: Task): void {
    task.id = this.generateUniqueId();task.id = this.generateUniqueId();
    this.tasks.push(task);
    this.updateLocalStorage();
  }
editTask(updatedTask: Task | null): void {
  if (updatedTask !== null) {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
      this.updateLocalStorage();
    }
  }
}




  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.updateLocalStorage();
  }

  getTasksDueInNext7Days(): Task[] {
    const currentDate = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(currentDate.getDate() + 7);

    return this.tasks.filter(
      (task) =>
        new Date(task.dueDate) >= currentDate && new Date(task.dueDate) <= sevenDaysLater
    );
  }

  private updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private generateUniqueId(): number {
    // Use a simple incrementing counter for unique IDs
    return this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1;
  }
}
