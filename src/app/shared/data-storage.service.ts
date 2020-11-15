import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
    
    constructor(private http:HttpClient, private recipeservice: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeservice.getRecipes();
        this.http.put('https://angular-concepts-88218.firebaseio.com/recipes.json', recipes).subscribe(
            (response) => {
                console.log(response);
            }
        )
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://angular-concepts-88218.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
                return recipes.map(recipe=> {
                    return {
                        ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeservice.setRecipes(recipes);
            })
        )
        // .subscribe(
        //     (recipes) => {
        //         console.log(recipes);
                
        //     }
        // )
    }

}