import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient, Recipe, Step } from '../recipe.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent {
  originalRecipe: Recipe;
  recipe: Recipe;
  ingredients: Ingredient[] = [];
  steps: Step[] = [];
  editMode: boolean =false;
  invalidDnd: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const recipeId = params['id'];
      this.recipe = this.recipeService.getRecipe(recipeId);
      console.log(recipeId)
      if(recipeId == null){
        this.editMode = false;
        return;
      }

      // TODO: fix recipes preloading
      this.originalRecipe = this.recipeService.getRecipe(recipeId);
      if(this.originalRecipe == null){
        return;
      }
      
      this.editMode = true;
      this.recipe = JSON.parse(JSON.stringify(this.originalRecipe));

      if(this.recipe.ingredients) {
        console.log("has group")
        this.ingredients = JSON.parse(JSON.stringify(this.recipe.ingredients));
      }
      if(this.recipe.prep_steps) {
        console.log("has steps")
        this.steps = JSON.parse(JSON.stringify(this.recipe.prep_steps));
      }
    })
  }
  addIngredient(){
    this.ingredients.push(new Ingredient(1, "", ""));
  }
  addStep(){
    this.steps.push(new Step(this.steps.length + 1,""));
  }
  onRemoveIngredient(index: number) {
    if (index < 0 || index >= this.ingredients.length) {
      return;
    }
    this.ingredients.splice(index, 1);
  }
  onRemoveStep(index: number) {
    if (index < 0 || index >= this.steps.length) {
      return;
    }
    this.steps.splice(index, 1);
  }
  onCancel(){
    this.router.navigate(["/recipes"]);
  }

  onSubmit(form:NgForm){
    console.log("submitted");
    const value = form.value;
    // console.log(value);
    const newRecipe = new Recipe(this.recipe?.id ?? "", 
      value.name, value.description, value.prep_time, value.total_time, value.servings, 
      value.meal_type, value.imageUrl, this.ingredients,this.steps);
     console.log(newRecipe);
    if(this.editMode){
      this.recipeService.updateRecipe(this.originalRecipe, newRecipe);
    }
    else{
      this.recipeService.addRecipe(newRecipe);
    }

    this.router.navigate(["/recipes"]);
  }
}
