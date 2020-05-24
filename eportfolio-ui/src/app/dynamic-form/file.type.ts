import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { UploadChangeParam, UploadFile } from 'ng-zorro-antd';
import { FileService } from '../core/services/file.service';

@Component({
  selector: 'formly-file',
  template: `   
    <div>
        <nz-upload 
            [nzAction]="to.action"
            [nzHeaders]="to.fileheader"
            [nzFileList]="to.filelist"
            [nzShowButton]="to.showbutton"
            (nzChange)="upload($event)">
            <button nz-button><i nz-icon nzType="upload"></i>Click to Upload</button>
        </nz-upload>
    </div>
  `
})
export class FormlyFileFieldType extends FieldType {

  constructor(private fileService: FileService) {
    super();
  }
  
  upload(info: UploadChangeParam) {
    if (info.file.status === 'done') {
      let fileList = info.fileList;
      fileList = fileList.map(file => {
        alert(file.name)
        if (file.response) {
          file.url = 'http://localhost:8080/download/' + file.response.url;
        }
        return file;
      });
      this.fileService.msg(this.fileService.toFileString(fileList))  
    }
  }
}