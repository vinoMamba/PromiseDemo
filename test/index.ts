import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

chai.use(sinonChai);

const assert = chai.assert;
import Promise2 from "../src/promise";

describe("Promise", () => {
    it("1. Promise 是一个类", () => {
        assert.isFunction(Promise2);
        assert.isObject(Promise2.prototype);
    });
    it("2. new Promise() 需要接收一个函数", () => {
        assert.throw(() => {
            // @ts-ignore
            new Promise2();
        });
        assert.throw(() => {
            // @ts-ignore
            new Promise2(1);
        });
        assert.throw(() => {
            // @ts-ignore
            new Promise2(false);
        });
    });
    it("3. new Promise() 会创建一个对象，该对象有then方法", () => {
        const promise = new Promise2(() => {
        });
        assert.isFunction(promise.then);
    });
    it("4. new Promise(fn) 中的fn会立即执行", () => {
        const fn = sinon.fake();
        new Promise2(fn);
        assert(fn.called);
    });
    it("5. new Promise(fn) 中的fn接收resolve,reject函数", (done) => {
        new Promise2((resolve, reject) => {
            assert.isFunction(resolve);
            assert.isFunction(reject);
            done();
        });
    });
    it("6. promise.then(success) 中的success,会在resolve被调用的时候执行", (done) => {
        const succeed = sinon.fake();
        const promise = new Promise2((resolve) => {
            assert.isFalse(succeed.called);
            resolve();
            setTimeout(() => {
                assert.isTrue(succeed.called);
                done();
            });
        });
        // @ts-ignore
        promise.then(succeed);
    });
    it("7. promise.then(null,fail) 中的fail,会在reject被调用的时候执行", (done) => {
        const fail = sinon.fake();
        const promise = new Promise2((resolve, reject) => {
            assert.isFalse(fail.called);
            reject();
            setTimeout(() => {
                assert.isTrue(fail.called);
                done();
            });
        });
        // @ts-ignore
        promise.then(null, fail);
    });
    it("2.2.1", () => {
        const promise = new Promise2((resolve) => {
            resolve();
        });
        promise.then(false, null);
    });
    it("2.2.2", (done) => {
        const succeed = sinon.fake();
        const promise = new Promise2((resolve) => {
            assert.isFalse(succeed.called);
            resolve(24);
            resolve(2444);
            setTimeout(() => {
                assert(promise.state === "fulfilled");
                assert.isTrue(succeed.calledOnce);
                assert(succeed.calledWith(24));
                done();
            });
        });
        promise.then(succeed);
    });

    it("2.2.3", (done) => {
        const fail = sinon.fake();
        const promise = new Promise2((resolve, reject) => {
            assert.isFalse(fail.called);
            reject(24);
            reject(2444);
            setTimeout(() => {
                assert(promise.state === "rejected");
                assert.isTrue(fail.calledOnce);
                assert(fail.calledWith(24));
                done();
            });
        });
        promise.then(null, fail);
    });
});