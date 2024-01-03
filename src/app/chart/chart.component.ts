import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { TaskService } from '../services/taskService'; // Import your task service

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private taskService: TaskService) {
    const tasksDueInNext7Days = this.calculateTasksDueInNext7Days();

    this.chartOptions = {
      series: [
        {
          name: 'Tasks Due',
          data: tasksDueInNext7Days
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      title: {
        text: 'Due Date charts'
      },
      xaxis: {
        categories: this.generateDateLabelsForNext7Days()
      }
    };
  }

  private calculateTasksDueInNext7Days(): number[] {
    // Replace this with your actual logic to fetch tasks due in the next 7 days from your service
    const tasksDueInNext7Days = this.taskService.getTasksDueInNext7Days();

    // Example: Counting tasks for each day
    const tasksCountPerDay: number[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const tasksDueOnCurrentDate = tasksDueInNext7Days.filter(
        task => new Date(task.dueDate).toDateString() === currentDate.toDateString()
      );

      tasksCountPerDay.push(tasksDueOnCurrentDate.length);
    }

    return tasksCountPerDay;
  }

  private generateDateLabelsForNext7Days(): string[] {
    const dateLabels: string[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      // Format the date label according to your preference
      const formattedDateLabel = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

      dateLabels.push(formattedDateLabel);
    }

    return dateLabels;
  }
}
