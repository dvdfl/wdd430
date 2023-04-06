import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes : Recipe[] = [];
  private subscription :Subscription;
  term: string;
  
  constructor(private recipeService: RecipeService){ }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipeListChangedEvent.subscribe(recipesList=> this.recipes = recipesList);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  search(value:string)  {
    this.term = value;
  }
}