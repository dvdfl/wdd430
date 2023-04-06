import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import RecipeDetailComponent from './recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch : "full"},
  {path:'home', component: HomeComponent},
  {path:'recipes', component: RecipesComponent, children:
    [
      {path:'new', component: RecipeEditComponent},
      {path:':id', component: RecipeDetailComponent},
      {path:':id/edit', component: RecipeEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
