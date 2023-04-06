import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from './recipe.model';

@Pipe({
  name: 'recipesFilter'
})
export class RecipesFilterPipe implements PipeTransform {

  transform(recipes: Recipe[], term: string): Recipe[] {
    // initialize new array
    let filteredList: Recipe[] = [];
    //filter items if term is valid
    if(term?.length > 0){
      filteredList = recipes.filter((recipe)=>{
        return (recipe.name.toLowerCase().includes(term.toLowerCase()));
      })
    }
    // if filtered list empty, return original list
    if(filteredList.length == 0){
      return recipes;
    }
    console.log(filteredList);
    //returning filtered list
    return filteredList;
  }

}
