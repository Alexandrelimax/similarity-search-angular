import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDocumentResponse } from '../interfaces/idocument-response';
import { ITextResponse } from '../interfaces/itext-response';

@Injectable({
  providedIn: 'root',
})
export class SimilaritySearchService {
  private apiUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) { }


  sendFile(file: File): Observable<IDocumentResponse[]> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<IDocumentResponse[]>(`${this.apiUrl}/search-document`, formData);

  }

  sendText(text: string): Observable<ITextResponse> {
    const body = { text };
    return this.http.post<ITextResponse>(`${this.apiUrl}/search-text`, body);
  }





  getDocuments(): Observable<IDocumentResponse[]> {
    return this.http.get<IDocumentResponse[]>(this.apiUrl);
  }

}
