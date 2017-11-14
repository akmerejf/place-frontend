import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from '../../../environments/environment';
import {ApiService} from './api.service';
import { Image } from '../models'
@Injectable()
export class FileService {
    _baseURL: string = '/projects/';

    constructor(private apiService: ApiService) { }

    upload(files, parameters=null){
        
        return  this.apiService.post(this._baseURL, files)
                 .map(response => response.json())
                 .catch(error => Observable.throw(error));

    }

    uploadImage(picture, parameters=null){
        
        return  this.apiService.put(this._baseURL+parameters, {project: {image: picture}})
                 .map(response => response.json())
                 .catch(error => Observable.throw(error));

    }

    getImages(slug): Observable<Image> {
        return this.apiService.get(this._baseURL+slug+'/image')
               .map(data =>data.project.image)
               .catch(error => Observable.throw(error));
      }
    // getImages(slug){
    //     return this.apiService.get(this._baseURL+slug+'/image')
    //                .map(response =>{ response.json(); console.log(response.json())})
                   
    // }
}