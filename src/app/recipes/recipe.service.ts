import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeDetail:Recipe;
    // recipeSelected = new EventEmitter<Recipe>();
    recipeSelected: Subject<Recipe> = new Subject<Recipe>(); //we can use both eventemitter and subject here

    recipes: Recipe[] = [
        new Recipe(
            "A new Recipe", "Test Description", 
            "https://media.self.com/photos/5f1eef2914b005b8d8eba4d0/4:3/w_384/30-Minute-Roasted-Vegetable-Tacos-with-Chimichurri-BIG-flavor-satisfying-HEALTHY-vegan-glutenfree-plantbased-tacos-chimichurri-cauliflower-minimalistbaker-recipe-6.jpg",
            [
                new Ingredient('Meat', 1),
                new Ingredient('French fries', 20)
            ]),
        new Recipe(
            "Another new Recipe", 
            "Another Test Description", 
            "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872",
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
    
      ];
    constructor() { }

    getRecipes() {
        return this.recipes;
    }

    selectedRecipe(recipe: Recipe) {
        this.recipeDetail = recipe;

        //this.recipeSelected.emit(this.recipeDetail);  //with eventemitter
        this.recipeSelected.next(this.recipeDetail);
    }

}