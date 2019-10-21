import { expect } from 'chai';
import { stub } from 'sinon';
import { ApiDef } from '../../../common/communication/api-def';
import { CONFIG_API_DEF } from '../res/environement';
import { DefService } from '../services/def.service';

describe('/def', () => {
    it('#getDef should send apidef if success', async (done: Mocha.Done) => {
        const defService = stub(new DefService());
        defService.getDef.returns(new Promise<ApiDef>((resolve) => resolve(CONFIG_API_DEF)));
        const res: Response = new Response();
        expect(res.body).to.equal(CONFIG_API_DEF);
        done();
    });

    it('#getDef should send status 500 if fails', async (done: Mocha.Done) => {
        const defService = stub(new DefService());
        defService.getDef.returns(Promise.reject());
        const res: Response = new Response();
        expect(res.status).to.equal(500);
        done();
    });
});
