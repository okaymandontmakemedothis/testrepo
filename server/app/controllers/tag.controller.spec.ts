import { expect } from 'chai';
import { stub } from 'sinon';
import { Tag } from '../../../common/communication/drawing';
import { TagService } from '../services/tag.service';

describe('/tag', () => {
    it('#getAllTags should send all tags if success', async (done: Mocha.Done) => {
        const tagService = stub(new TagService());
        const tagList: Tag[] = [{ name: 'tag', numberOfUses: 4 }];
        tagService.getAllTags.returns(new Promise<Tag[]>((resolve) => resolve(tagList)));
        const res: Response = new Response();
        expect(res.body).to.equal(tagList);
        done();
    });

    it('#getAllTags should send status 500 if fails', async (done: Mocha.Done) => {
        const tagService = stub(new TagService());
        tagService.getAllTags.returns(Promise.reject());
        const res: Response = new Response();
        expect(res.status).to.equal(500);
        done();
    });
});
