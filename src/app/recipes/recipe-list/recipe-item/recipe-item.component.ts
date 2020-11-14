import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe:Recipe;
  @Input() index: number;

  // constructor(private recipeService: RecipeService) { }

  //we are using routing now so this not in use
  // onSelected() {
  //   // this.recipeService.recipeSelected.emit(this.recipe);
  //   this.recipeService.selectedRecipe(this.recipe);
  // }

  ngOnInit(): void {
  }

}
