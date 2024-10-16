import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDocumentResponse } from '../interfaces/idocument-response';
import { ITextResponse } from '../interfaces/itext-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SimilaritySearchService {
  private apiUrl = 'http://localhost:8000/similarity/document';
  private apiUrl2 = 'http://localhost:8000/similarity/text';
  constructor(private http: HttpClient) { }


  sendFile(file: File): Observable<IDocumentResponse[]> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ response: IDocumentResponse[] }>(this.apiUrl, formData).pipe(
      map((response) => response.response) // Retorna diretamente a lista de documentos
    );
  }



  sendText(text: string): Observable<ITextResponse> {
    const body = { text };

    return this.http.post<{ response: ITextResponse }>(this.apiUrl2, body).pipe(
      map((res) => res.response) // Mapeia a resposta para extrair apenas o objeto ITextResponse
    );
  }



}
