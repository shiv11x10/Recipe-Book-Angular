import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe:Recipe;
  constructor(private slservice:ShoppingListService) {}

  toShoppingList() {
    for(let ingredient of this.recipe.ingredients) {
      this.slservice.addIngredient(ingredient);
    }
  }

  ngOnInit(): void {
  }

}
