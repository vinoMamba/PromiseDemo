import * as chai from "chai"
import Promise from '../src/promise'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)

const assert = chai.assert

describe('Promise', () => {
    it("是一个类", () => {
        assert.isFunction(Promise)
        assert.isObject(Promise.prototype)
    })
    it('new Promise() 必须接受一个函数', () => {
        assert.throw(() => {
            //@ts-ignore
            new Promise()
        })
    })
    it('new Promise(fn) 会生成一个对象，对象有then方法', () => {
        const promise = new Promise(() => { })
        assert.isFunction(promise.then)
    })
    it('new Promise(fn) 中的fn是立即执行的', () => {
        let fn = sinon.fake()
        new Promise(fn)
        assert(fn.called)
    })
    it('new Promise(fn) 中的fn接收resolve和reject两个函数', (done) => {
        new Promise((resolve, reject) => {
            assert.isFunction(resolve)
            assert.isFunction(reject)
            done()
        })
    })
    it('promise.then(success) 中的 success 会在 resolve 被调用的时候执行', (done) => {
        let success = sinon.fake()
        const promise = new Promise((resolve, reject) => {
            //该函数没有执行
            assert.isFalse(success.called)
            resolve()
            //该函数执行了
            setTimeout(() => {
                assert.isTrue(success.called)
                done()
            }, 0);
        })
        //@ts-ignore
        promise.then(success)
    })
    it('promise.then(null,fail) 中的 fail 会在 reject 被调用的时候执行', (done) => {
        let fail = sinon.fake()
        const promise = new Promise((resolve, reject) => {
            //该函数没有执行
            assert.isFalse(fail.called)
            reject()
            //该函数执行了
            setTimeout(() => {
                assert.isTrue(fail.called)
                done()
            }, 0);
        })
        //@ts-ignore
        promise.then(null, fail)
    })
    it('2.2.1', () => {
        const promise = new Promise((resolve) => {
            resolve()
        })
        promise.then(false, null)
    })
    it('2.2.2', (done) => {
        const succeed = sinon.fake()
        const promise = new Promise((resolve) => {
            assert.isFalse(succeed.called)
            resolve(123)
            resolve(1234)
            setTimeout(() => {
                assert(promise.state === 'fulfilled')
                assert.isTrue(succeed.calledOnce)
                assert(succeed.calledWith(123))
                done()
            }, 0);
        })
        promise.then(succeed)
    })
    it('2.2.3', (done) => {
        const fail = sinon.fake()
        const promise = new Promise((resolve, reject) => {
            assert.isFalse(fail.called)
            reject(123)
            reject(1234)
            setTimeout(() => {
                assert(promise.state === 'rejected')
                assert.isTrue(fail.calledOnce)
                assert(fail.calledWith(123))
                done()
            }, 0);
        })
        promise.then(null, fail)
    })
    it('在我的代码执行完之前，不得调用then后面的两个函数', (done) => {
        const succeed = sinon.fake()
        const promise = new Promise((resolve, reject) => {
            resolve()
        })
        promise.then(succeed)
        assert.isFalse(succeed.called)
        setTimeout(() => {
            assert.isTrue(succeed.called)
            done()
        }, 0);
    })
    it('在我的代码执行完之前，不得调用then后面的两个函数', (done) => {
        const fail = sinon.fake()
        const promise = new Promise((resolve, reject) => {
            reject()
        })
        promise.then(null, fail)
        assert.isFalse(fail.called)
        setTimeout(() => {
            assert.isTrue(fail.called)
            done()
        }, 0);
    })
})