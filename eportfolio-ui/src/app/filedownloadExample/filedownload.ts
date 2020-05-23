import {Component, OnInit} from "@angular/core";
import * as globals from "../../global";
import {UploadChangeParam, UploadFile} from 'ng-zorro-antd/upload';

@Component({
  templateUrl: './filedownload.html',
})

export class FileDownloadExample implements OnInit {

  fileList: UploadFile[] = [
    {
      uid: '123213213',
      name: 'test.pdf',
      status: 'done',
      size: 1234,
      type: 'pdf',
      url: ''
    }
  ];

  constructor() {
  }

  ngOnInit() {

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
      this.fileList = fileList;

    }
  }

    //   this.msg.success(`${info.file.name} file uploaded successfully`);
    //   alert(info.file.response.url)
    //   alert(info.file.response.uid)
    // } else if (info.file.status === 'error') {
    //   this.msg.error(`${info.file.name} file upload failed.`);
    // }
}
