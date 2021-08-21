import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  //Open a Task in Stage 0
  open(item) {
    if(item.trim() != ""){
      this.tasks.push({name: item, stage: 0 });
      this.stagesTasks[0].push({name: item, stage: 0 });
    }
  }

  //Back Task to Stage - 1
  back(item, stage) {
    var nodo = this.stagesTasks[stage].find(x=>x.name == item);
    nodo.stage = nodo.stage - 1;
    this.configureTasksForRendering();
  }

  //Next Task to Stage + 1
  forward(item, stage){
    var nodo = this.stagesTasks[stage].find(x=>x.name == item);
    nodo.stage = nodo.stage + 1;
    this.configureTasksForRendering();
  }

  //Delete Task from List Stage and List Task
  delete(item, stage){
    const index = this.stagesTasks[stage].findIndex(x=>x.name == item); 
    const indexT = this.tasks.findIndex(x=>x.name == item); 
    this.stagesTasks.splice(index, 1);
    this.tasks.splice(indexT, 1);
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}