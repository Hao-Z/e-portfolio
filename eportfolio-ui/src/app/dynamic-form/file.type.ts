import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { UploadChangeParam, UploadFile} from 'ng-zorro-antd';
import { FileService } from '../core/services/file.service';
import * as globals from "../../global"

@Component({
  selector: 'formly-file',
  template:
  `
    <div>
        <nz-upload
            [nzAction]="to.action"
            [nzFileList]="fileList"
            [nzHeaders]="to.fileheader"
            [nzShowButton]="to.showbutton"
            nzSize="1000"
            [nzRemove]="remove"
            (nzChange)="upload($event)">
            <button nz-button><i nz-icon nzType="upload"></i>Click to Upload</button>
        </nz-upload>
    </div>
  `
})
export class FormlyFileFieldType extends FieldType{

  fileList: UploadFile[] = []

  constructor(private fileService: FileService) {
    super();
    this.fileService.messageTemObserve.subscribe((res: string) => {
      this.fileList = this.fileService.toFileList(res)
    })
  }

  upload(info: UploadChangeParam) {
    if (info.file.status === 'done') {
      let fileList = info.fileList;
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = globals.backend_path + 'download/'+ file.response.url;
        }
        return file;
      });
      this.fileList = fileList
      this.setPorperty();
      // alert("Upload Succeed!")
    }
  }

  remove = (file: UploadFile) => {
    this.fileList = this.fileList.filter( each => each.uid != file.uid )
    this.setPorperty();
    return true
  }

  setPorperty () {
    if (this.key == 'profilePhoto') {
      this.model.profilePhoto = this.fileService.toFileString(this.fileList)
    } else if (this.key == 'media') {
      this.model.media = this.fileService.toFileString(this.fileList)
    }
  }

}
