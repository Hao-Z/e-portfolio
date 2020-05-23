import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AlertService {

    private messageSu = new Subject<string>();  
    messageSuObserve = this.messageSu.asObservable();

    private messageEr = new Subject<string>();  
    messageErObserve = this.messageEr.asObservable();

    private setSuMessage(message: string) {
        this.messageSu.next(message);
    }

    private setErMessage(message: string) {
        this.messageEr.next(message);
    }

    public success(message: string, callback?: Function) {
        this.setSuMessage(message);
        if (callback) {
            callback();
        }
    }

    public error(message: string, callback?: Function) {
        this.setErMessage(message);
        if (callback) {
            callback();
        }
    }
}