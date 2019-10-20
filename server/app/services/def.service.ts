import { injectable } from 'inversify';
import 'reflect-metadata';
import { ApiDef } from '../../../common/communication/api-def';
import { CONFIG_API_DEF } from '../res/environement';

@injectable()
export class DefService {
    async getDef(): Promise<ApiDef> {
        return CONFIG_API_DEF;
    }
}
