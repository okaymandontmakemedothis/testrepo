import { expect } from 'chai';
import { ApiDef } from '../../../common/communication/api-def';
import { CONFIG_API_DEF } from '../res/environement';
import { DefService } from './def.service';

describe('Testing def.service', () => {
    it('should return def resources', (done) => {
        const defService = new DefService();
        defService.getDef().then((def: ApiDef) => {
            expect(def).to.be.equal(CONFIG_API_DEF);
            done();
        });
    });
});
