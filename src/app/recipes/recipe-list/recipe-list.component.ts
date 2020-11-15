import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  constructor(private recipeservice: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes =  this.recipeservice.getRecipes();
    
    this.subscription = this.recipeservice.updatedRecipe.subscribe(
      (res) => {
        this.recipes =  res;    
      }
    )
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log("unsubscribed");
  }

}
