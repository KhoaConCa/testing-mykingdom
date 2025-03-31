const assert = require('assert');
const { describe } = require('mocha');

describe('TestSuite1', function () {
    it("Testcase1", function () {
        console.log("This is the Testcase 1");
        assert.equal(1, 1, "One is equal one");
    });
    it("Testcase2", function () {
        console.log("This is the Testcase 2");
        assert.equal(0, 0, "0 is equal 0");
    });
});