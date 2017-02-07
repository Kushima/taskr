import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'storyOfSprintFilter',
    pure: false
})
@Injectable()
export class StoryOfSprintFilter implements PipeTransform {
    transform(stories: any[], args: any[]): any {
      if (stories) {
        // filtra apenas  as historias que pertencem ao sprint
        return stories.filter(story => story._sprintId == args);
      }
    }
}
