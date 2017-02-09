import { Component, Pipe, OnInit } from '@angular/core';
import { ModalModule } from 'ng2-bootstrap/components/modal';
import { DatepickerModule } from 'ng2-bootstrap/components/datepicker';
import { Router } from '@angular/router';
import { Todo } from './todo';
import { Story } from './story/story';
import { StoryUpdate } from './story/storyupdate';
import { TodoService } from './todo.service';
import { StoryService } from './story/story.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'my-todos',
  templateUrl: 'todo.component.html',
  styleUrls: [ 'todo.component.css' ],
})

export class TodosComponent implements OnInit {

  isEditingContainer: boolean = false;

  newOrEditContainer: Todo = { _id: null, name: null, initialDate: null, finalDate: null};
  novoStory: Story = { _id: null, name: null, order: null, _sprintId: null };

  todos: Todo[];
  stories: Story[];
  storiesUpdateStack: StoryUpdate[] = [];

  constructor(
    private todoService: TodoService,
    private storyService: StoryService,
    private dragulaService: DragulaService,
    private router: Router) {

       dragulaService.drop.subscribe((value) => {
         this.updateStoryPlace(value.slice(1));
       });

    }

  ngOnInit(): void {
    this.getTodos();
    this.getStories();
  }

  getTodos(): void {
    this.todoService
        .getTodos()
        .then( todos => this.todos = todos );
  }

  add(): void {
    this.newOrEditContainer.initialDate = new Date(this.newOrEditContainer.initialDate);
    this.newOrEditContainer.finalDate = new Date(this.newOrEditContainer.finalDate);

    this.todoService.create(this.newOrEditContainer)
      .then(
        todo =>  {
          this.todos.push(todo);

          //TODO: tentar reaproveitar o metodo do order-by-todo-initial-date.pipe que já faz essa ordenação!
          this.todos.sort(function(a, b) {
            var initialDateA = a.initialDate;
            var initialDateB = b.initialDate;

            if (initialDateA < initialDateB) {
              return -1;
            }
            if (initialDateA > initialDateB) {
              return 1;
            }

            return 0;
          });

          this.resetNewOrEditContainer();
        } );
  }

  delete(todo: Todo): void {
    if (confirm("Tem certeza que deseja remover o container de nome [" + todo.name +"]")) {
      console.log(todo);
      this.todoService
      .delete(todo._id)
      .then(() =>
      this.todos = this.todos.filter(h => h !== todo) );
    }
  }

  getStories(): void {
    this.storyService
        .getStories()
        .then( stories => this.stories = stories );
  }

  addStory(): void {
    this.storyService.create(this.novoStory)
      .then(
        story =>  {
          this.stories.push(story);

          this.novoStory = { _id: null, name: null, order: null, _sprintId: null };
        } );
  }

  deleteStory(story: Story): void {
    if (confirm("Tem certeza que deseja remover a Tarefa de nome [" + story.name +"]")) {
      console.log(story);
      this.storyService
      .delete(story._id)
      .then(() =>
      this.stories = this.stories.filter(h => h !== story) );
    }
  }


  editContainer(todo: Todo): void {
    this.newOrEditContainer = todo;
    this.isEditingContainer = true;
  }

  private updateStoryPlace(event): void {

    //Isto é um evento do dragula!
    // Tarefa: tarefa que foi movida
    // Destino: container de destino da tarefa
    // Origem: Origem da tarefa (container anterior)
    let [tarefa, destino, origem, etc] = event;

    // Precisamos pegar as posicoes das tarefas
    // no container de destino. Para isso, podemos
    // capturar a posicao das tarefas no container de destino!
    console.log(destino.children.length);

    for (var i = 0; i < destino.children.length; ++i) {

      //atualiza a tarefa
      let storyToUpdate: Story = {
        _id: destino.children[i].id,
        name: null,
        order: i,
        _sprintId: destino.id };
        this.storyService.update(storyToUpdate)
        .then(
          story =>  {
            console.log("História foi atualizada!");
          }
        );
      }

      // let storyUpdate = { _id: tarefa.id, _sprintId: destino.id };
      // this.storiesUpdateStack.push(storyUpdate);
    }

    resetNewOrEditContainer(): void {
      this.newOrEditContainer = { _id: null, name: null, initialDate: null, finalDate: null};
    }
}
