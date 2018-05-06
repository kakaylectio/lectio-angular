import { Lesson } from './lesson';
import { Notebook } from './notebook';

export class Topic {
  id: number;
  name: string;
  shortname: string;
  activeOrder: number;
  dateCreated: string;
  graphic: string;
  lastLessonNote: Lesson;
  notebook: Notebook;
}