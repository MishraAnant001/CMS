import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-content',
  templateUrl: './manage-content.component.html',
  styleUrls: ['./manage-content.component.scss']
})
export class ManageContentComponent implements OnInit {
  contentData!:any[]
  constructor(private service :ContentService,private router:Router){}
  ngOnInit(): void {
    this.getContent()
  }
  getContent(){
    this.service.getAllContent().subscribe({
      next:(response:any)=>{
        // console.log(response);
        this.contentData=response.data
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  onView(content:any){
    sessionStorage.setItem("content",JSON.stringify(content))
    this.router.navigateByUrl("/content/view-content")
  }
  onDelete(content:any){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteContent(content._id).subscribe({
          next:(response)=>{
            console.log(response);
            Swal.fire({
              title: "Deleted!",
              text: "the content has been deleted.",
              icon: "success"
            });
            this.getContent()
          },
          error:(error)=>{
            console.log(error);
          }
        })
      }
    }); 
  }
}
