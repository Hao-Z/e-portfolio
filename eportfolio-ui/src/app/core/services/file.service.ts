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
            return fileString.split(',').map(str =>{
                var fullname = str.split('/').pop()
                var index = fullname.indexOf('-')
                return <UploadFile>{url: str, uid: fullname.substring(0, index), name: fullname.substring(index + 1)}
            })
        } else {
            return []
        }
    }

    toFileString(fileList: UploadFile[]): string {
        return fileList.map(x => Object.assign([], x)).map(file => file.url).join(',')
    }

    private messageToTem = new Subject<string>();  
    messageTemObserve = this.messageToTem.asObservable();

    private setMessageTem(message: string) {
        this.messageToTem.next(message);
    }

    public msgToTem(message: string, callback?: Function) {
        this.setMessageTem(message);
        if (callback) {
            callback();
        }
    }

    private messageToCom = new Subject<string>();  
    messageComObserve = this.messageToCom.asObservable();

    private setMessageCom(message: string) {
        this.messageToCom.next(message);
    }

    public msgToCom(message: string, callback?: Function) {
        this.setMessageCom(message);
        if (callback) {
            callback();
        }
    }

}