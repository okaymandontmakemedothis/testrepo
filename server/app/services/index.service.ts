import * as fs from 'fs';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { WelcomeMessage } from '../../../common/communication/message';

@injectable()
export class IndexService {
    getTextRessource(pathName: string): WelcomeMessage {
        const file = fs.readFileSync(__dirname + pathName);
        const obj = JSON.parse(file.toString());
        return obj;
    }
}
