import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { userID } from "../../../global";
import { FileService } from 'src/app/core/services/file.service';
import { UniqueApiService } from 'src/app/core/services/unique-api.service';
import * as globals from "../../../global";

@Component({
  selector: 'app-edit-avarter',
  templateUrl: './edit-avarter.component.html',
  styles: [`
      .avatar {
        width: 128px;
        height: 128px;
      }
      .upload-icon {
        font-size: 32px;
        color: #999;
      }
      .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    `]
})
export class EditAvarterComponent implements OnInit {

  loading = false;
  avatarUrl: string;

  actionUrl = this.fileService.getUploadUrl(userID)
  fileHeader = this.fileService.getUploadHeader()
  
  constructor(
    public modal: NgbActiveModal,
    private fileService: FileService,
    private apiService: UniqueApiService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 1MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
      //   if (!dimensionRes) {
      //     this.msg.error('Image only 300x300 above');
      //     observer.complete();
      //     return;
      //   }

        // observer.next(isJPG && isLt2M && dimensionRes);
        observer.next(isJPG && isLt2M);
        observer.complete();
      });
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          this.apiService.update
            (userID, {"profilePhoto": `${globals.backend_path}download/${info.file.response.url}`}, "introduction")
            .subscribe(() => {})
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

}
