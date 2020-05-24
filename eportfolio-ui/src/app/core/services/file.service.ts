import { Injectable } from '@angular/core';
import * as globals from "../../../global";
import { UploadFile } from 'ng-zorro-antd';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

    private apiUrl = globals.backend_path;

    private fileHeader: {} = {
        'Authorization': localStorage.getItem('jwt_token')
    }

    getUploadUrl(id: string) {
        return `${this.apiUrl}upload/${id}`
    }

    getUploadHeader() {
        return this.fileHeader
    }

    toFileList(fileString: string | null): UploadFile[] {
        if (fileString) {
            return fileString.split(',').map(str => <UploadFile>{url: str, name: str.split('/')[-1]})
        } else {
            return []
        }
    }

    toFileString(fileList: UploadFile[]): string {
        return fileList.map(x => Object.assign({}, x)).map(file => file.url).join(',')
    }

    private message = new Subject<string>();  
    messageObserve = this.message.asObservable();

    private setMessage(message: string) {
        this.message.next(message);
    }

    public msg(message: string, callback?: Function) {
        this.setMessage(message);
        if (callback) {
            callback();
        }
    }

}