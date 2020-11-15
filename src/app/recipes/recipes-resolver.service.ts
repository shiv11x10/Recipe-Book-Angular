//this will help in retaining data even when the page is reloaded

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private datastorageservice: DataStorageService, private recipesservice: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesservice.getRecipes();

        if(recipes.length === 0) {
            return this.datastorageservice.fetchRecipes();
        } else {
            return recipes;
        }

        
    }
}