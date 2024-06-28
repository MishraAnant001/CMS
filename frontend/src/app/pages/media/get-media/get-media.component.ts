import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-media',
  templateUrl: './get-media.component.html',
  styleUrls: ['./get-media.component.scss']
})
export class GetMediaComponent implements OnInit{
  constructor(private service :MediaService){}
  mediaData:any[]=[]
  ngOnInit(): void {
    this.getMedia()
    
  }

  getMedia(){
    this.service.getMedia().subscribe({
      next:(response:any)=>{
        console.log(response);
        this.mediaData=response.body.data
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
            // console.log(response);
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
