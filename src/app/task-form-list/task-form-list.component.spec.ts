import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormListComponent } from './task-form-list.component';

describe('TaskFormListComponent', () => {
  let component: TaskFormListComponent;
  let fixture: ComponentFixture<TaskFormListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFormListComponent]
    });
    fixture = TestBed.createComponent(TaskFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
