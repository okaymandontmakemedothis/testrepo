import { injectable } from 'inversify';
import 'reflect-metadata';
import { ApiDef } from '../../../common/communication/api-def';

@injectable()
export class DefService {
    async getDef(): Promise<ApiDef> {
        return {
            date: 'date',
            drawing: 'drawings',
            index: 'index',
            tag: 'tags',
        };
    }
}
