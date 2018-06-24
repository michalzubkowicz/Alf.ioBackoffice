import { StatisticsService, CheckInStatistics } from "~/shared/statistics/statistics.service";
import { Component, Injectable, OnInit, OnDestroy, Input, NgZone } from "@angular/core";
import { Account, EventConfiguration } from "~/shared/account/account";
import { Subscription } from "rxjs";

@Component({
    moduleId: module.id,
    selector: "checkin-stats",
    providers: [StatisticsService],
    template: `<StackLayout>
                    <GridLayout columns="70, auto" *ngIf="stats">
                        <Label col="0" class="icon icon-3x text-success text-center" text="&#xf39e;"></Label>
                        <StackLayout col="1" class="small-spacing" orientation="vertical">
                            <Label text="Statistics @ {{stats.lastUpdate | date:'mediumTime'}}" class="strong"></Label>
                            <StackLayout orientation="horizontal" class="text-center">
                                <Label [text]="stats.checkedIn" class="text-success strong h1 mr-1"></Label>
                                <Label text="/" class="h1 mr-1"></Label>
                                <Label [text]="stats.totalAttendees" class="h1"></Label>
                            </StackLayout>
                        </StackLayout>
                    </GridLayout>
                    <event-header [account]="account" [event]="event" *ngIf="!stats"></event-header>
               </StackLayout>`,
    styleUrls: []
})
@Injectable()
export class CheckInStatsComponent implements OnInit, OnDestroy {
    
    @Input()
    private account: Account;
    @Input()
    private event: EventConfiguration;

    private subscription: Subscription;
    private stats: CheckInStatistics;

    constructor(private statisticsService: StatisticsService,
                private ngZone: NgZone) {}

    ngOnInit(): void {
        this.subscription = this.statisticsService.retrieveForEvent(this.account, this.event.key)
            .subscribe(stats => this.ngZone.run(() => this.stats = stats));
    }
    
    ngOnDestroy(): void {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
