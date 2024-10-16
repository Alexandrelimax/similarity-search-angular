import { Component } from '@angular/core';
import { SimilaritySearchService } from '../../services/similarity-search.service';
import { IDocumentResponse } from '../../interfaces/idocument-response'; // Importa a interface de documento

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedFile: File | null = null;
  textInput: string = '';
  results: IDocumentResponse[] = [];  // Atualizado para armazenar resultados no formato IDocumentResponse

  constructor(private similaritySearchService: SimilaritySearchService) { }

  handleUploadSuccess(event: IDocumentResponse[]) {
    console.log('Upload realizado com sucesso:', event);

    // Atualiza o array de resultados com os dados recebidos do componente filho
    this.results = event; // O 'event' contém os documentos recebidos
  }

  handleUploadError(error: string) {
    console.error('Erro ao fazer upload:', error);
  }
}
