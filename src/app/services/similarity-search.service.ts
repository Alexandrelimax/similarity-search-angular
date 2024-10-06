import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDocument } from '../components/upload-documents/idocument';

@Injectable({
  providedIn: 'root',
})
export class SimilaritySearchService {
  private apiUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) { }


  sendFile(file: File): Observable<IDocument[]> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<IDocument[]>(this.apiUrl, formData);

  }

  sendText(text: string): Observable<any> {
    const body = { text };
    return this.http.post<any>(`${this.apiUrl}/search-text`, body);
  }

  getDocuments(): Observable<IDocument[]> {
    return this.http.get<IDocument[]>(this.apiUrl);
  }

}
