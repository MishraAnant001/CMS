import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/core/services';

@Component({
  selector: 'app-media-feed',
  templateUrl: './media-feed.component.html',
  styleUrls: ['./media-feed.component.scss']
})
export class MediaFeedComponent implements OnInit {
  mediaData!:any[]
  likeArray!:number[]
  constructor(private service :MediaService){}
  ngOnInit(): void {
    this.getMedia()
  }
  getMedia(){
    this.service.getFeed().subscribe({
      next:(response:any)=>{
        console.log(response);
        this.mediaData=response.data
        this.likeArray=new Array<number>(response.data.length).fill(0)
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  onLike(file:any){
    console.log(file);
  }
}
