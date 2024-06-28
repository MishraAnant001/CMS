import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MediaService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss']
})
export class UploadMediaComponent implements OnInit {
  filevalue:any
  url:any;
  format:any;
  file:any
  form!:FormGroup
  constructor(private service :MediaService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.form=this.fb.group({
      file:['']
    })
  }
  onSelectFile(event:any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.file=file
      const reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }else{
      this.url=undefined
      this.file=undefined
      this.filevalue=""
    }
  }
  uploadFile(){
    console.log(this.file);
    const formData = new FormData()
    formData.append("file",this.file)
    console.log(formData);
    this.service.uploadMedia(formData).subscribe({
      next:(response)=>{
        // console.log(response);
        Swal.fire({
          icon: "success",
          title: "file uploaded successfully",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          this.url=undefined
          this.file=undefined
          this.form.reset()
          //  this.filevalue=""
        })

      },
      error:(error)=>{
        Swal.fire({
          icon: "error",
          title: "Error uploading file",
          text:`${error.error.message}`
        })
      }
    })
    
  }
}
