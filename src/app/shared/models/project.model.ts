import { Profile } from './profile.model';

export class Project {
  slug: string;
  title = '';
  picture = '';
  description = '';
  body = '';
  tagList: Array<string> = [];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
