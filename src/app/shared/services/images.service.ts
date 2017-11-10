import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class ImagesService {
    _imgUploadURL: string = '/projects/'
    constructor(private apiService: ApiService) { }

    upload(files, parameters){
        let headers = new Headers();
        // let options = new RequestOptions({ headers: headers });
        // options.params = parameters;
        return  this.apiService.put(this._imgUploadURL + parameters , files)
                 .map(response => response.json())
                 .catch(error => Observable.throw(error));

    }
    getImages(params){
        return this.apiService.get(this._imgUploadURL + params)
                   .map(response => response.json())
                   .catch(error => Observable.throw(error));
    }
    
}