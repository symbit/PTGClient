import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from '@ptg/auth-data-access-auth';

@Injectable({ providedIn: 'root' })
export class PdfService {
  private apiUrl = 'http://localhost:3001/generate-prediction-pdf';

  private readonly _authStore = inject(AuthStore);

  constructor(private http: HttpClient) {}

  generatePdf(id: number) {
    return this.http.post(
      `${this.apiUrl}/${id}`,
      {
        authToken: this._authStore.accessToken(),
      },
      {
        responseType: 'blob',
      },
    );
  }
}
