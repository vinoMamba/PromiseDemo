class PromiseVino {
    succeed = null
    failed = null
    resolve() {
        setTimeout(() => {
            this.succeed()
        }, 0);
    }
    reject() {
        setTimeout(() => {
            this.failed()
        }, 0);
    }
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw new Error("我只接受一个函数")
        }
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    then(succeed, failed) {
        this.succeed = succeed
        this.failed = failed
    }
}

export default PromiseVino