import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

const apiUrl = "http://localhost:3000/recipe/";

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit  {
  private recipes: Recipe[] =[];
  recipeListChangedEvent = new Subject<Recipe[]>();

  constructor (private httpClient: HttpClient) { }
  ngOnInit(): void {
    
  }

  getRecipes() : Recipe[] {
    //map((docs:{[key:number]: Recipe}[])=>{
    this.httpClient.get<Recipe[]>(apiUrl).subscribe(docs=>{
      //console.log(docs);
      this.recipes = docs;
      //this.maxRecipeId = this.getMaxId();
      this.sortAndSend();
    });
    return this.recipes.slice();
  }

  getRecipe(id: string): Recipe {
    for (const recipe of this.recipes) {
      if (recipe.id == id) {
        //console.log("found!")
        return recipe;
      }
    }
    return null;
  }

  addRecipe(recipe: Recipe) {
    if (recipe == undefined || recipe == null) {
      return;
    }

    // make sure id of the new Document is empty
    recipe.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.httpClient.post<{ message: string, recipe: Recipe }>(apiUrl,
      recipe,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new recipe to recipes
          this.recipes.push(responseData.recipe);
          this.sortAndSend();
        }
      );
  }

  updateRecipe(originalRecipe: Recipe, newRecipe: Recipe) {
    if (originalRecipe == null || originalRecipe == null || originalRecipe == undefined || originalRecipe == undefined) {
      return;
    }

    const pos = this.recipes.indexOf(originalRecipe);
    if (pos < 0) {
      return;
    }

    // set the id of the new Recipe to the id of the old Recipe
    newRecipe.id = originalRecipe.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // update database
    this.httpClient.put(apiUrl + originalRecipe.id,
      newRecipe, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.recipes[pos] = newRecipe;
          this.sortAndSend();
        }
      );
  }

  deleteRecipe(recipe: Recipe) {
    if (!recipe) {
      return;
    }
    const pos = this.recipes.indexOf(recipe);
    if (pos < 0) {
      return;
    }
    this.httpClient.delete(apiUrl + recipe.id)
      .subscribe(
        (response: Response) => {
          this.recipes.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  sortAndSend(){
    this.recipes.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.recipeListChangedEvent.next(this.recipes.slice())
  }
}
