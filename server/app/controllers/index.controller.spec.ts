import { expect } from 'chai';
import { stub } from 'sinon';
import { WelcomeMessage } from '../../../common/communication/message';
import { IndexService } from '../services/index.service';

describe('/text', () => {
    it('#getAllTags should send all tags if success', async (done: Mocha.Done) => {
        const indexService = stub(new IndexService());
        const message: WelcomeMessage = {
            body: 'body',
            end: 'end',
        };
        indexService.getTextRessource.returns(message);
        const res: Response = new Response();
        expect(res.body).to.equal(message);
        done();
    });
});
