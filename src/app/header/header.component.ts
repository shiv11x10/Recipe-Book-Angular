import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
    // @Output() featureSelected = new EventEmitter<string>();

    constructor(private datastorageservice: DataStorageService) { }

    // navigateTo(feature: string) {
    //     this.featureSelected.emit(feature);
    // }

    onSaveDate() {
        this.datastorageservice.storeRecipes();
    }

    onFetchData() {
        this.datastorageservice.fetchRecipes().subscribe();    
    }

    ngOnInit() { 

    }

}