import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesResolverService } from './recipes-resolver.service';


const routes: Routes = [
    { path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
        { path: '', component:RecipeStartComponent},
        { path: 'new', component: RecipeEditComponent }, 
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }, 
    ] }, 
]

@NgModule({
    declarations: [ 
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent, 
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [ RouterModule, CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    // exports: [ RecipesComponent,
    //     RecipeListComponent,
    //     RecipeItemComponent,
    //     RecipeDetailComponent, 
    //     RecipeStartComponent,
    //     RecipeEditComponent,
    //     RouterModule ]
})
export class RecipesModule { }