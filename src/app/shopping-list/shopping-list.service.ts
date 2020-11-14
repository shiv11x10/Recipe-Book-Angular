import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable(
    {
        providedIn:"root"
    }
)
export class ShoppingListService {
    startedEditing = new Subject<number>();

    ingredients: Ingredient[] =  [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ]
    
    getIngredients() {
        return this.ingredients;
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
    }
}