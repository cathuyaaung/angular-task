import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (v) => this.tasks = v,
      error: (e) => console.error(e),      
    });
  }

  deleteTask(task: Task) {
    console.log(task);
    this.taskService.deleteTask(task).subscribe({
      next: (v) => {                
        this.tasks = this.tasks.filter((t) => t.id != task.id)
      },
      error: (e) => console.error(e)
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe({
      next: (v) => console.log('updated', task)
    });    
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: (v) => {
        console.log('added', task)
        this.tasks.push(v);
    }
    });    
    console.log(task);
  }
    
}
