import { Component } from '@angular/core';
import { SimilaritySearchService } from '../../services/similarity-search.service';
import { ITextResponse } from '../../interfaces/itext-response';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrl: './search-text.component.css'
})
export class SearchTextComponent {
  userInput: string = '';
  responseText: string = '';
  documentLink: string = '';
  loading: boolean = false;

  constructor(private similaritySearchService: SimilaritySearchService) { }

  submit() {
    this.loading = true;
    this.similaritySearchService.sendText(this.userInput).subscribe({
      next: (response: ITextResponse) => {
        console.log(response)
        this.responseText = response.answer;
        this.documentLink = response.document_url;
        console.log(this.responseText)
        console.log('--------------------------------------------------------')
        console.log(this.documentLink)
      },
      error: (err) => {
        console.error('Erro ao buscar texto:', err);
        this.responseText = 'Erro ao buscar a resposta.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
