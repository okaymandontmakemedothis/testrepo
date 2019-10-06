import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Message, WelcomeMessage } from '../../../common/communication/message';
import Types from '../types';
import { DateService } from './date.service';

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
    getTextRessource(pathName: string): WelcomeMessage {
        const file = fs.readFileSync(__dirname + pathName);
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
