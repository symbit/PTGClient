import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private socket$: WebSocketSubject<any>;

  constructor(private readonly _config: ConfigService) {
    this.socket$ = webSocket(
      `${_config.get('wsUrl')}/predictions/status-updates`,
    );
  }

  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  closeConnection() {
    this.socket$.complete();
  }
}
