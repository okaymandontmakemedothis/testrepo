import { injectable } from 'inversify';
import { ApiDef } from '../../../common/communication/api-def';
import { CONFIG_API_DEF } from '../res/environement';
import { DefService } from '../services/def.service';

@injectable()
export class DefServiceMockFail implements DefService {
    getDef(): Promise<ApiDef> {
        throw Error();
        return new Promise<ApiDef>((resolve) => resolve(CONFIG_API_DEF));
    }
}

// tslint:disable-next-line: max-classes-per-file
@injectable()
export class DefServiceMock implements DefService {
    getDef(): Promise<ApiDef> {
        return new Promise<ApiDef>((resolve) => resolve(CONFIG_API_DEF));
    }
}