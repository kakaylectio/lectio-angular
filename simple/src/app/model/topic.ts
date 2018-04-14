import { Lesson } from '../model/lesson';

export class Topic {
  id: number;
  name: string;
  shortname: string;
  activeOrder: number;
  dateCreated: string;
  graphic: string;
  lastLessonNote: Lesson;
}