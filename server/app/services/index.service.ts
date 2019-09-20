import {inject, injectable} from 'inversify';
import 'reflect-metadata';
import {Message, WelcomeMessage} from '../../../common/communication/message';
import Types from '../types';
import {DateService} from './date.service';
import * as fs from 'fs';

@injectable()
export class IndexService {

    constructor(
        @inject(Types.DateService) private dateService: DateService,
    ) {
    }

    about(): Message {
        return {
            title: 'This is merely a test',
            body: 'Lorem ipsum........',
        };
    }
     getTextRessource(): WelcomeMessage {
        //const path = window.location.pathname + './res/text/welcome_text2.json';
        const file = fs.readFileSync('C: \Users\sophi\OneDrive\Documents\PolyDessin-E16\server\app\services\res\text\welcome_text2.json');
        const obj = JSON.parse(file.toString());
        return obj;
     }
     
     async helloWorld(): Promise<Message> {
        return this.dateService.currentTime().then((timeMessage: Message) => {
            return {
                title: 'Hello world',
                body: 'Time is ' + timeMessage.body,
            };
        }).catch((error: unknown) => {
            console.error(`There was an error!!!`, error);

            return {
                title: `Error`,
                body: error as string,
            };
        });
    }
}
