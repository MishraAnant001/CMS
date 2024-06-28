import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss']
})
export class ManageMediaComponent implements OnInit{
  mediaData!:any[]
  constructor(private service :MediaService){}
  ngOnInit(): void {
    this.getMedia()
  }
  getMedia(){
    this.service.getAllMedia().subscribe({
      next:(response:any)=>{
        console.log(response);
        this.mediaData=response.data
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  onDelete(file:any){
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
        this.service.deleteMedia(file._id).subscribe({
          next:(response)=>{
            console.log(response);
            Swal.fire({
              title: "Deleted!",
              text: "the file has been deleted.",
              icon: "success"
            });
            this.getMedia()
          },
          error:(error)=>{
            console.log(error);
          }
        })
      }
    });
  }

}
