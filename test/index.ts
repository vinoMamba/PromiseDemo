import * as chai from "chai"
import Promise from '../src/promise'

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
        let called = false
        const promise = new Promise(() => {
            called = true
        })
        //@ts-ignore
        assert(called === true)
    })

    it('new Promise(fn) 中的fn接收resolve和reject两个函数', () => {
        let called = false
        const promise = new Promise((resolve, reject) => {
            called = true
            assert.isFunction(resolve)
            assert.isFunction(reject)
        })
        //@ts-ignore
        assert(called === true)
    })
})