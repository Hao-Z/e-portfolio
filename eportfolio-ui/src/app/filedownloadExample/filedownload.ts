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
      size: 100,
      name: 'test.pdf',
      status: 'done',
      url: '',
      type: 'sdfsdf'
    }
  ];

  download = (file: UploadFile) => {
    // for authorization purpose
    // do sth to fetch the file from the backend and prompt user to download at the front
  };

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
}
