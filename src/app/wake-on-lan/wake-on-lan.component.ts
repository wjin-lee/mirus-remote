import { Component } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import { PowerState, PowerStateFromNumber } from '../enums/power-state';
import { WakeOnLanService } from '../services/wake-on-lan.service';

@Component({
  selector: 'app-wake-on-lan',
  templateUrl: './wake-on-lan.component.html',
  styleUrls: ['./wake-on-lan.component.scss']
})
export class WakeOnLanComponent {
    // Only need to wake 1 device for now. Eventually make this a query param
    readonly WOL_TARGET = "orcinus";

    powerState: PowerState = PowerState.UNKNOWN;
    powerStateMessage: string;

    requestQueue: any = [];
    
    constructor(private db: Database, private wolService: WakeOnLanService) {
        // Match default power state message to the default power state.
        this.powerStateMessage = this._getPowerStateMessage(this.powerState);

        // Subscribe to power states
        objectVal(ref(this.db, `powerStates/${this.WOL_TARGET}`)).subscribe(powerState => {
            console.log(powerState)
            this.setPowerState(PowerStateFromNumber((powerState) as number));
        })

        // Subscribe to request queue
        wolService.requestQueue$.subscribe(requestQueue => {
            this.requestQueue = requestQueue == null ? [] : Object.values(requestQueue).filter((req: any) => req.device == this.WOL_TARGET);
        })
    }

    setPowerState(powerState: PowerState) {
        this.powerState = powerState; 
        this.powerStateMessage = this._getPowerStateMessage(this.powerState);
    }

    _getPowerStateMessage(powerState: PowerState) {
        switch(powerState) {
            case PowerState.UNKNOWN:
                return "Device State Unknown.";

            case PowerState.OFFLINE:
                return "Device Offline.";

            case PowerState.ONLINE:
                return "Device Online!"

            default:
                return `Unrecognised power state: ${powerState}.`
        }
    }

    onPowerBtnClick() {
        switch(this.powerState) {
            case PowerState.OFFLINE:
                this.wolService.sendWakeRequest(this.WOL_TARGET);
                break;

            case PowerState.ONLINE:
                this.powerStateMessage = "Device is already online!";
                break;

            case PowerState.UNKNOWN:
                break;  // Do nothing

            default:
                this.powerStateMessage = `Unrecognised power state: ${this.powerState}.`;
        }
    }

    onPingBtnClick() {
        this.wolService.sendDeviceStatusUpdateRequest(this.WOL_TARGET);
    }
}
