import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SimilaritySearchService } from '../../services/similarity-search.service';
import { IDocumentResponse } from '../../interfaces/idocument-response';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],
})
export class UploadDocumentsComponent implements OnDestroy {
  @Output() uploadSuccess = new EventEmitter<any>();
  @Output() uploadError = new EventEmitter<string>();

  selectedFile: File | null = null;
  isLoading: boolean = false; // Variável para controlar o estado de carregamento
  uploadMessage: string = 'Arraste e solte para enviar o arquivo'; // Mensagem de upload
  private uploadSubscription: Subscription | null = null;

  constructor(private similaritySearchService: SimilaritySearchService) { }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      console.log('Arquivo selecionado:', this.selectedFile.name);
      this.onUpload();
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      this.uploadError.emit('Nenhum arquivo selecionado.');
      return;
    }

    this.isLoading = true; // Inicia o carregamento
    this.uploadMessage = 'Carregando...'; // Atualiza a mensagem

    this.uploadSubscription = this.similaritySearchService.sendFile(this.selectedFile).subscribe({
      next: (response: IDocumentResponse[]) => {
        this.uploadSuccess.emit(response);
        console.log('Documentos recebidos com sucesso:', response);
      },
      error: (error) => {
        this.uploadError.emit('Erro ao fazer upload: ' + error.message);
        console.error('Erro ao buscar documentos:', error);
      },
      complete: () => {
        this.isLoading = false; // Para o carregamento
        this.uploadMessage = 'Arraste e solte para enviar o arquivo'; // Restaura a mensagem padrão
        console.log('Operação concluída com sucesso.');
      }
    });
  }

  ngOnDestroy() {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }
}
