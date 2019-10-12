import { fail } from 'assert';
import { expect } from 'chai';
import { DateService } from './date.service';
import { IndexService } from './index.service';

describe('A sample service', () => {
    it('should be logged in the coverage', (done: Mocha.Done) => {
        // tslint:disable-next-line:no-unused-expression
        expect(1).to.be.not.null;
        done();
    });
});

describe('Testing index.service', () => {
    it('should return about content', (done) => {
        // const mockDateService = sinon.mock(DateService);

        const indexService = new IndexService(new DateService());

        const result = indexService.about();
        expect(result.body).eqls('Lorem ipsum........');
        expect(result.title).eqls('This is merely a test');
        done();
    });
    it('should return text resources', (done) => {
        // const mockDateService = sinon.mock(DateService);

        const indexService = new IndexService(new DateService());
        const pathText = '/../res/text/welcome_text2.json';
        const result = indexService.getTextRessource(pathText);
        expect(result.body);
        done();
    });
    it('should return hello world message', async (done) => {
        // const mockDateService = sinon.mock(DateService);

        const indexService = new IndexService(new DateService());
        let result;
        try {
            result = await indexService.helloWorld();
            expect(result);
        } catch {
            fail();
        }
        done();
    });

});
