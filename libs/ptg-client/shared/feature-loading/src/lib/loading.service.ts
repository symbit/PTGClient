import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  readonly loading = signal(false);

  setLoading(value: boolean): void {
    this.loading.set(value);
  }

  isLoading(): boolean {
    return this.loading();
  }
}
