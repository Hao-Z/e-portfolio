import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AlertService {

    private message = new Subject<string>();  
    messageObserve = this.message.asObservable();

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

    private setMessage(message: string) {
        this.message.next(message);
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

    public msg(message: string, callback?: Function) {
        this.setMessage(message);
        if (callback) {
            callback();
        }
    }

}