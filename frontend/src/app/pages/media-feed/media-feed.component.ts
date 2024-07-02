import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MediaDataService, MediaService } from 'src/app/core/services';

@Component({
  selector: 'app-media-feed',
  templateUrl: './media-feed.component.html',
  styleUrls: ['./media-feed.component.scss']
})
export class MediaFeedComponent implements OnInit {
  form!: FormGroup
  mediaData!: any[]
  isLikeLoad = false;
  medialikes!: any[]
  isData = false
  submitted=false
  constructor(private service: MediaService, private mediaDataService: MediaDataService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.loadData()
    this.form = this.fb.group({
      comment: ['', Validators.required]
    })

  }
  get f() {
    return this.form.controls
  }

  onSubmit(){
    this.submitted=true
    console.log(this.form.value);
  }
  loadData() {
    forkJoin([this.mediaDataService.getLikes(), this.service.getFeed()])
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.medialikes = Array.from(response[0].body.data).map((item: any) => item.media)
          this.mediaData = response[1].data
          this.isData = true
        }
      });
  }

  onDislike(file: any) {
    this.mediaDataService.removeLike(file._id).subscribe({
      next: (response) => {
        // console.log(response);
        this.loadData()
      }
    })
  }
  // getMedia(){
  //   this.service.getFeed().subscribe({
  //     next:(response:any)=>{
  //       // console.log("second");
  //       // console.log(response);
  //       this.mediaData=response.data
  //       this.verify()
  //     },
  //     error:(error)=>{
  //       console.log(error);
  //     }
  //   })
  // }
  // getLikes(){
  //   this.mediaDataService.getLikes().subscribe({
  //     next:(response:any)=>{
  //       console.log(response);
  //       // console.log("first");
  //       this.medialikes=Array.from(response.body.data).map((item:any)=>item.media)
  //       console.log(this.medialikes);
  //       // console.log(this.medialikes.includes("667bc3a91df7f3f3bd389f44"));
  //     },
  //     error:(error)=>{
  //       console.log(error);
  //     }
  //   })
  // }
  onLike(file: any) {
    this.mediaDataService.addlike(file._id).subscribe({
      next: (response) => {
        // console.log(response);
        this.loadData()
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
