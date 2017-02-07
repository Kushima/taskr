// webpack/js/TodoService.js
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Todo } from './todo';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private todoUrl = 'http://localhost:3000/api/v1/todo';

  constructor(private http: Http) { }

  getTodos(): Promise<Todo[]> {
     return this.http.get(this.todoUrl)
                .toPromise()
                .then(response => response.json() as Todo[] )
                .catch(this.handleError);
   }

   delete(id: number): Promise<void> {
     const url = `${this.todoUrl}/${id}`;
     return this.http.delete(url, {headers: this.headers})
       .toPromise()
       .then(() => null)
       .catch(this.handleError);
   }
   create(sprint: Todo): Promise<Todo> {
     return this.http
       .post(this.todoUrl, JSON.stringify(sprint), {headers: this.headers})
       .toPromise()
       .then(res => res.json() )
       .catch(this.handleError);
   }
   update(Todo: Todo): Promise<Todo> {
     const url = `${this.todoUrl}/${Todo._id}`;
     return this.http
       .put(url, JSON.stringify(Todo), {headers: this.headers})
       .toPromise()
       .then(() => Todo)
       .catch(this.handleError);
   }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
