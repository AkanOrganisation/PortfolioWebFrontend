import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentState} from "../../../../../constants";
import {ComponentMode} from "../../../../../constants/mode.components";

@Component({
    selector: 'app-event-category',
    templateUrl: './event-category.component.html',
    styleUrls: ['./event-category.component.css']
})
export class EventCategoryComponent {
    @Input() eventCategory: string | undefined;
    eventCategoryInput: string | undefined;
    @Output() eventCategoryChange = new EventEmitter<string>();

    state = ComponentState.LOADING;
    mode = ComponentMode.VIEW;

    constructor() {
    }

    ngOnInit() {
        if (!this.eventCategory) {
            this.eventCategory = '';
            this.mode = ComponentMode.EDIT;
        }
        this.eventCategoryInput = this.eventCategory;
        this.state = ComponentState.READY;
    }

    toggle() {
        this.mode = this.mode === ComponentMode.VIEW ? ComponentMode.EDIT : ComponentMode.VIEW;
    }

    save() {
        this.eventCategory = this.eventCategoryInput;
        this.eventCategoryChange.emit(this.eventCategory);
        this.mode = ComponentMode.VIEW;
    }

    cancel() {
        this.eventCategoryInput = this.eventCategory;
        this.mode = ComponentMode.VIEW;
    }

    protected readonly ComponentState = ComponentState;
    protected readonly ComponentMode = ComponentMode;
}
