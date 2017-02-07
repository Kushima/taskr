// webpack/js/StoryService.js
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Story } from './story';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoryService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private storyUrl = 'http://localhost:3000/api/v1/story';

  constructor(private http: Http) { }

  getStories(): Promise<Story[]> {
     return this.http.get(this.storyUrl)
                .toPromise()
                .then(response => response.json() as Story[]  )
                .catch(this.handleError);
   }

   delete(id: number): Promise<void> {
     const url = `${this.storyUrl}/${id}`;
     return this.http.delete(url, {headers: this.headers})
       .toPromise()
       .then(() => null)
       .catch(this.handleError);
   }

   create(story: Story): Promise<Story> {
     return this.http
       .post(this.storyUrl, JSON.stringify(story), {headers: this.headers})
       .toPromise()
       .then(res => res.json() )
       .catch(this.handleError);
   }
   update(Story: Story): Promise<Story> {
     const url = `${this.storyUrl}/${Story._id}`;
     return this.http
       .put(url, JSON.stringify(Story), {headers: this.headers})
       .toPromise()
       .then(() => Story)
       .catch(this.handleError);
   }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
