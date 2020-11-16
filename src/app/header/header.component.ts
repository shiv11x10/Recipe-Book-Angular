import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
    // @Output() featureSelected = new EventEmitter<string>();
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private datastorageservice: DataStorageService, private authservice: AuthService) { }

    // navigateTo(feature: string) {
    //     this.featureSelected.emit(feature);
    // }

    onSaveDate() {
        this.datastorageservice.storeRecipes();
    }

    onFetchData() {
        this.datastorageservice.fetchRecipes().subscribe();    
    }

    onLogout() {
        this.authservice.logout();
    }

    ngOnInit() { 
        this.userSub = this.authservice.user.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        })
    }

}