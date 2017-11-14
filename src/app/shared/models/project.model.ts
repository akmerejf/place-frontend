import { Profile } from './profile.model';
import { Image  } from './image.model';
export class Project {
  slug: string;
  title = '';
  image: Image;
  description = '';
  body = '';
  published: boolean;
  tagList: Array<string> = [];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
