import { Component } from '@angular/core';
import { SimilaritySearchService } from '../../services/similarity-search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedFile: File | null = null;
  textInput: string = '';
  results: any[] = [];  // Array para armazenar os resultados de documentos

  constructor(private similaritySearchService: SimilaritySearchService) { }

  handleUploadSuccess(event: any) {
    console.log('Upload realizado com sucesso:', event);

    // Atualiza o array de resultados com os dados recebidos do componente filho
    this.results = event; // O 'event' contém os documentos mockados
  }

  handleUploadError(error: string) {
    console.error('Erro ao fazer upload:', error);
  }
}
