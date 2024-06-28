import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent implements OnInit,OnDestroy {
  html!:any
  title!:string
  constructor(private location:Location){}
  ngOnDestroy(): void {
    sessionStorage.removeItem("content")
  }
  ngOnInit(): void {
    const data = sessionStorage.getItem("content");
    if(!data){
      this.location.back()
      return
    }else{
      this.html=JSON.parse(data).content
      this.title= JSON.parse(data).title
    }
  }
  goBack(){
    this.location.back()
  }
}
