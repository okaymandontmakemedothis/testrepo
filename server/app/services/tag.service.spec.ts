import { expect } from 'chai';
import { Tag } from '../../../common/communication/drawing';
import { TagService } from './tag.service';

describe('Testing tag.service', () => {
    it('should return all tags', (done) => {
        const tagService: TagService = new TagService();
        tagService.getAllTags().then((tags: Tag[]) => {
            expect(tags);
            done();
        });
    });
});
