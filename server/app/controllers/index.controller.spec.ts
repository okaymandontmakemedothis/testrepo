import {assert} from 'chai';

let chaiHttp = require('chai-http');


//Configure chai
chai.use(chaiHttp)
it('Sample test: should complete this test', (done) => {
    assert.ok(true);
    done();
});

