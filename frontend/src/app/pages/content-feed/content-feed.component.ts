import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/core/services';

@Component({
  selector: 'app-content-feed',
  templateUrl: './content-feed.component.html',
  styleUrls: ['./content-feed.component.scss']
})
export class ContentFeedComponent implements OnInit {
  contentData!:any[]
  constructor(private service :ContentService,private router:Router){}
  ngOnInit(): void {
    this.getContent()
  }
  getContent(){
    this.service.getFeed().subscribe({
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

}
