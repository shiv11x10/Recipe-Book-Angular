//This directive is needed in bootstrap 3 where we could add open class and dropdown would work
//But in bootstrap 4 we don't need this and just need to add popper.js for dropdown to work.

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({ selector: '[appDropdown]' })
export class DropdownDirective {
    @HostBinding('class.show') isShown = false;

    @HostListener('click') toggleShown() {
        this.isShown = !this.isShown;
    }
}