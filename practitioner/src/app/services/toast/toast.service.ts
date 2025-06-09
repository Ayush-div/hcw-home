// src/app/services/toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _messages = new BehaviorSubject<string[]>([]);
  readonly messages$ = this._messages.asObservable();

  show(message: string, durationMs = 3000) {
    const current = this._messages.getValue();
    this._messages.next([...current, message]);

    setTimeout(() => {
      const after = this._messages.getValue().filter((m) => m !== message);
      this._messages.next(after);
    }, durationMs);
  }
}
