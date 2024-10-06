import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SimilaritySearchService } from '../../services/similarity-search.service';
import { IDocument } from './idocument';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],
})
export class UploadDocumentsComponent implements OnDestroy {
  @Output() uploadSuccess = new EventEmitter<any>();
  @Output() uploadError = new EventEmitter<string>();

  selectedFile: File | null = null;
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
    const formData = new FormData();
    formData.append('file', this.selectedFile!, this.selectedFile!.name);

    this.uploadSubscription = this.similaritySearchService.getDocuments().subscribe({
      next: (response) => {
        this.uploadSuccess.emit(response);
        console.log('Documentos recebidos com sucesso:', response);
      },
      error: (error) => {
        this.uploadError.emit('Erro ao fazer upload: ' + error.message);
        console.error('Erro ao buscar documentos:', error);
      },
      complete: () => {
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
