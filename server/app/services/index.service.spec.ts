import {expect} from 'chai';
import { IndexService } from './index.service';
import { DateService } from './date.service';

let sinon = require('sinon')

describe('A sample service', () => {
    it('should be logged in the coverage', (done: Mocha.Done) => {
        // tslint:disable-next-line:no-unused-expression
        expect(1).to.be.not.null;
        done();
    });
});

describe('Testing index.service',()=>{
    beforeEach=()=>{
    }
    it('should return about content',(done)=>{
        const mockDateService = sinon.mock(IndexService)

        const indexService = new IndexService(mockDateService)

        let result = indexService.about()
        expect(result.body).eqls("Lorem ipsum........")
        expect(result.title).eqls("This is merely a test")
        done()
    })
    it('should return text resources',(done)=>{
        const mockDateService = sinon.mock(IndexService)
        const indexService = new IndexService(mockDateService)
        let result = indexService.about()
        expect(result.body).eqls("Lorem ipsum........")
        expect(result.title).eqls("This is merely a test")
        done()
    })


})

