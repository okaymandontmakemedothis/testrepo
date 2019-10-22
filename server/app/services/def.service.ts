import { injectable } from 'inversify';
import 'reflect-metadata';
import { ApiDef } from '../../../common/communication/api-def';
import { CONFIG_API_DEF } from '../res/environement';

/// Service pour controller la configuration du REST Api
@injectable()
export class DefService {
    /// Retourne le fichier de configuration du REST Api
    async getDef(): Promise<ApiDef> {
        return CONFIG_API_DEF;
    }
}
