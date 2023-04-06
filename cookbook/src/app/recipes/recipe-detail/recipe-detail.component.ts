import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'cb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export default class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService){}

  ngOnInit(): void {
    console.log("init- detail");
    this.route.params.subscribe(params=>{
      console.log("params- detail");
      console.log(params);
      const recipeId = params['id'];
      this.recipe = this.recipeService.getRecipe(recipeId);
    });
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.recipe)
    this.router.navigate(["/recipes"]);
  }
}
