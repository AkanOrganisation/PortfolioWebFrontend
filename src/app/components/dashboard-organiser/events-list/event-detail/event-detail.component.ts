import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ComponentState} from "../../../../constants";
import {ComponentMode} from "../../../../constants/mode.components";
import {OrganiserModel} from "../../../../models/organiser.models";
import {animate, style, transition, trigger} from "@angular/animations";

import {EventDateTimeNodeType, EventNodeType} from "../../../../graphql/events/events.graphql";
import {AddressNodeType} from "../../../../graphql/location/address.graphql";
import {LocationNodeType} from "../../../../graphql/location/location.graphql";
import {CreateConstants} from "../../../../constants/create.constants";


@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.css'],
    animations: [
        trigger('cardAnimation', [
            // Entry animation
            transition(':enter', [
                style({opacity: 0, transform: 'translateY(100px)'}),
                animate('0.3s ease-out', style({opacity: 1, transform: 'translateY(0)'}))
            ]),
            // Exit animation
            transition(':leave', [
                style({opacity: 1, transform: 'translateY(0)'}),
                animate('0.3s ease-in', style({opacity: 0, transform: 'translateY(-100px)'}))
            ]),
        ])
    ]
})
export class EventDetailComponent implements OnInit, OnDestroy {

    state = ComponentState.LOADING;
    mode = ComponentMode.LIST;
    loaded = false;
    private edited: {
        [key: string]: boolean
    } = {};

    @Input() event!: EventNodeType;


    constructor(private organiserModel: OrganiserModel) {
    }

    ngOnInit() {
        if (!this.event) {
            this.event = {};
        }
        this.mode = ComponentMode.LIST;
        this.state = ComponentState.READY;
    }

    ngOnDestroy() {
        this.state = ComponentState.COMPLETED;
    }

    protected readonly ComponentState = ComponentState;


    async toggle() {
        if (this.mode === ComponentMode.LIST && !this.loaded) {
            this.state = ComponentState.LOADING;
            await this.loadEvent();
        }

        // Animation will be triggered by Angular as this.mode changes
        this.mode = this.mode === ComponentMode.LIST ? ComponentMode.DETAIL : ComponentMode.LIST;
    }

    async loadEvent() {
        if (!this.event.id) {
            console.error('Event ID not found');
            this.state = ComponentState.ERROR;
            return;
        }

        this.organiserModel.getEventDetails(this.event.id).subscribe({
            next: (result) => {
                if (result.data.eventOrganiserPrivate) {
                    this.event = JSON.parse(JSON.stringify(result.data.eventOrganiserPrivate));
                    this.loaded = true;
                    this.state = ComponentState.READY;
                }
            },
            error: (error) => {
                console.error(error);
                this.state = ComponentState.ERROR;
            }
        });
    }

    getDates() {

        return this.event.dates?.edges.map((edge) => edge.node);
    }

    protected readonly ComponentMode = ComponentMode;

    get noChangesToSave(): boolean {
        return Object.keys(this.edited).length === 0;
    }

    updateEventsAddress(newAddress: AddressNodeType) {
        if (this.event.address)
            Object.assign(this.event.address, newAddress);
        this.edited['address'] = true;
    }


    updateEventsLocation(newLocation: LocationNodeType) {
        if (this.event.location)
            Object.assign(this.event.location, newLocation);
        this.edited['location'] = true;
    }

    updateEventsTitle(newTitle: string) {
        this.event.title = newTitle;
        this.edited['title'] = true;
    }

    updateEventsCategory(newCategory: string) {
        this.event.title = newCategory;
        this.edited['category'] = true;

    }

    updateEventsDescription(newDescription: HTMLElement) {
        this.event.description = newDescription;
        this.edited['description'] = true;
    }

    updateEventsDatetime(newEventDateTime: EventDateTimeNodeType) {
        if (this.event.dates?.edges) {
            const index = this.event.dates?.edges.findIndex((edge) => edge.node.id === newEventDateTime.id);
            if (index !== undefined && index !== -1) {
                this.event.dates?.edges.splice(index, 1,
                    {
                        node: {...newEventDateTime, edited: true},
                        cursor: ''
                    });
            } else {
                console.log('new event date time', newEventDateTime.id);
                this.event.dates?.edges.push({
                    node: {...newEventDateTime, edited: true},
                    cursor: ''
                });
            }
            this.edited['dates'] = true;
        }
    }


    async save() {
        this.state = ComponentState.PROCESSING;
        const event: EventNodeType = {
            id: this.event.id ?
                this.event.id
                : undefined,
            address: this.edited['address'] ?
                this.event.address
                : undefined,
            location: this.edited['location'] ?
                this.event.location
                : undefined,
            title: this.edited['title'] ?
                this.event.title
                : undefined,
            category: this.edited['category'] ?
                this.event.category
                : undefined,
            description: this.edited['description'] ?
                this.event.description
                : undefined,
            dates: this.edited['dates'] && this.event.dates ?
                {
                    edges: this.event.dates.edges.filter((edge) => edge.node.edited).map(
                        (edge) => {


                            return {
                                node: {
                                    id: edge.node.id && !edge.node.id.startsWith(CreateConstants.CREATE_EVENT_DATETIME) ? edge.node.id : undefined,
                                    datetime: edge.node.editedFields && edge.node.editedFields['datetime'] ? edge.node.datetime : undefined,
                                    status: edge.node.editedFields && edge.node.editedFields['status'] ? edge.node.status : undefined,
                                    maxMembers: edge.node.editedFields && edge.node.editedFields['maxMembers'] ? edge.node.maxMembers : undefined,
                                },
                                cursor: edge.cursor
                            }
                        }
                    ),
                    pageInfo: this.event.dates.pageInfo
                }
                : undefined

        };
        const result = await this.organiserModel.createOrUpdateEvents([event])
        if (result) {
            this.state = ComponentState.READY;
            this.edited = {};
        } else {
            this.state = ComponentState.ERROR;
        }


    }


}
