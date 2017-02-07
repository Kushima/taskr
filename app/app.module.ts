import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ProgressbarModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AppComponent }   from './app.component';

import { TodosComponent }      from './todo/todo.component';
import { TodoService }  from './todo/todo.service';
import { StoryService }  from './todo/story/story.service';

import { StoryOfSprintFilter } from './todo/story/storyofsprint.pipe';
import { OrderByTodoInitialDatePipe } from './order-by-todo-initial-date.pipe';
import { OrderByStoryOrderPipe } from './order-by-story-order.pipe';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    ModalModule,
    ProgressbarModule,
    PaginationModule,
    TimepickerModule,
    DatepickerModule,
    DragulaModule,
    RouterModule.forRoot([
      { path: 'roadmap', component: TodosComponent },
      { path: '',        component: TodosComponent }
    ])
  ],
  declarations: [
    AppComponent,
    TodosComponent,
    StoryOfSprintFilter,
    OrderByTodoInitialDatePipe,
    OrderByStoryOrderPipe
  ],
  providers: [
    TodoService,
    StoryService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
