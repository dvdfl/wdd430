import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cb-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  editMode: boolean = false;
  
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    console.log("init");
    console.log(    this.route.children);
    this.route.url.subscribe(params=>{
      const childRoute = this.route.snapshot.firstChild;
      if(childRoute){
        const contactId = childRoute.params['id'];
        this.editMode = (contactId != null);
        console.log(this.editMode);
      }
      else{
        this.editMode = false;
      }
    });
  }
}
