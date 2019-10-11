import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DrawingPreview } from '../../../../../common/communication/drawing';
import { Message, ShortcutClavier, WelcomeMessage } from '../../../../../common/communication/message';

/// Service qui rassembler les getter des serveurs
@Injectable({
  providedIn: 'root',
})
export class IndexService {

  readonly BASE_URL: string = 'http://localhost:3000/api/index';

  constructor(private http: HttpClient) {
  }

  basicGet(): Observable<Message> {
    return this.http.get<Message>(this.BASE_URL).pipe(
      catchError(this.handleError<Message>('basicGet')),
    );
  }

  /// Transmet le message contenue dans le JSON file pour le message de bienvenue
  welcomeGet(): Observable<WelcomeMessage> {
    return this.http.get<WelcomeMessage>('http://localhost:3000/api/index/text').pipe(
      catchError(this.handleError<WelcomeMessage>('welcomeGet')),
    );
  }
  // GET tout les dessins du backend
  getDrawingPreview(): Observable<DrawingPreview[]> {
    return this.http.get<DrawingPreview[]>('http://localhost:3000/api/drawings/').pipe(
      catchError(this.handleError<DrawingPreview[]>('getDrawingPreview')),
    );
  }

  /// Transmet le message contenue dans le JSON file pour le message de shortcut clavier
  aideGet(): Observable<ShortcutClavier> {
    return this.http.get<ShortcutClavier>('http://localhost:3000/api/index/text').pipe(
      catchError(this.handleError<ShortcutClavier>('aideGet')),
    );
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
