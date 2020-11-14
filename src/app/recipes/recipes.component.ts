import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers:[RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  // recipeSubscribed: Subscription;

  constructor(private recipeservice: RecipeService) { }

  ngOnInit() {
    // this.recipeSubscribed =  this.recipeservice.recipeSelected.subscribe(
    //   recipe => {
    //     this.selectedRecipe = recipe;
    //   },
    //   err =>{
    //     console.log(err);
    //   },
    //   () =>{
    //     console.log("successfully subscribed");
        
    //   }
    // )
  }

  //destroy the subscription after component is ended to avoid memory leak
  // ngOnDestroy() {
  //   this.recipeSubscribed.unsubscribe();
  //   console.log("unsubscribed");
  // }

}
