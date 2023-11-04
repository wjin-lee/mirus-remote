import { Injectable } from '@angular/core';
import { Database, objectVal, orderByChild, push, query, ref, serverTimestamp, set } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';

enum RequestType {
  WAKE_ON_LAN = "WAKE_ON_LAN",
  DEVICE_STATUS_UPDATE = "DEVICE_STATUS_UPDATE",
}

enum RequestStatus {
  QUEUED = 0,
  PROCESSING = 1,
  // COMPLETED = 2,   Orders are deleted on completion to save storage space.
}

@Injectable({
  providedIn: 'root'
})
export class WakeOnLanService {
  private requestQueueSubject = new BehaviorSubject<any>([]);
  requestQueue$: Observable<any> = this.requestQueueSubject.asObservable();

  constructor(private db: Database) {

    // Subscribe to request queue updates
    objectVal(query(ref(this.db, `requests/`), orderByChild("timestamp"))).subscribe(requestQueue => {
      this.requestQueueSubject.next(requestQueue);
    })
  }

  /**
   * Returns currently 'active' (i.e. incomplete) requests from the queue in descending order of issue date.
   * 
   * @param deviceName device to retrieve the requests for
   */
  // getDeviceRequestQueue(deviceName: string) {
  //   return 
  // }

  /**
   * Issues a wake request message to the WoL server.
   * 
   * @param deviceName name of the device to wake. (Same as power state key in RTDB)
   */
  sendWakeRequest(deviceName: string) {
    this._sendRequest(deviceName, RequestType.WAKE_ON_LAN);
  }

  /**
   * Issues a device status update to the WoL server.
   * 
   * @param deviceName name of the device to ping. (Same as power state key in RTDB)
   */
  sendDeviceStatusUpdateRequest(deviceName: string) {
    this._sendRequest(deviceName, RequestType.DEVICE_STATUS_UPDATE);
  }

  /**
   * Issues a new request to the Wake-on-LAN server through RTDB.
   * 
   * Requests under /requests will be processed by the WoL server inside the home network.
   * This bypasses the need to pay for a higher tier with access to cloud functions.
   * 
   * @param deviceName name of the target device
   * @param requestType type of request to issue.
   */
  _sendRequest(deviceName: string, requestType: RequestType) {
    const newRequestRef = push(ref(this.db, `requests/`));
    set(newRequestRef, {
        timestamp: serverTimestamp(),
        type: requestType,
        device: deviceName,
        status: RequestStatus.QUEUED
    });
  }


}
