import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import Quill from "quill";
import { ContentService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-content',
  templateUrl: './upload-content.component.html',
  styleUrls: ['./upload-content.component.scss']
})
export class UploadContentComponent implements OnInit,AfterViewInit {
  constructor(private fb: FormBuilder, private service: ContentService) { }

  form!: FormGroup
  edited = false
  @ViewChild("editorContainer", { static: true })
  editorContainer: ElementRef | null = null;
  submitted = false
  content!:any
  data!: { title: string, content: string }
  editor: Quill | undefined;
  get f() {
    return this.form.controls
  }
  ngOnInit() {

    // console.log("ngOnInit called!");
    this.form = this.fb.group({
      title: ['', Validators.required]
    })
    if (this.editorContainer) {
      try {
        this.editor = new Quill(this.editorContainer.nativeElement, {
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "video"],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              ["clean"],
            ],
          },
          theme: "snow",
        });
        const data = sessionStorage.getItem("content")
        if (data) {
          this.edited = true
          this.content=JSON.parse(data)
          sessionStorage.removeItem("content")
          this.form.patchValue({
            title: this.content.title
          })
        }
      } catch (error) {
        console.error("Error creating Quill editor:", error);
      }
    } else {
      console.error("Element with #editorContainer not found!");
    }
  }
  ngAfterViewInit(): void {
    if(this.content){
      this.editor!.root.innerHTML=this.content.content
    }
  }
  submit() {
    this.submitted = true
    if (this.form.valid) {
      this.data = {
        title: this.form.controls['title'].value,
        content: this.editor!.root.innerHTML
      }
      if (!this.edited) {

        this.service.uploadContent(this.data).subscribe({
          next: (response) => {
            Swal.fire({
              icon: "success",
              title: "content created successfully",
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.form.reset()
              this.submitted = false
              this.content=undefined
              this.editor!.root.innerHTML = ""
            })
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
      else {
        this.service.updateContent(this.content._id,this.data).subscribe({
          next:(response)=>{
            console.log(response);
            Swal.fire({
              icon: "success",
              title: "content updated successfully",
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.form.reset()
              this.edited = false
              this.submitted = false
              this.editor!.root.innerHTML = ""
            })
          }
        })
      }
      // console.log(this.editor!.root.innerHTML);
    }
  }
}
