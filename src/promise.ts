class PromiseVino {
    succeed = null
    failed = null
    state = "pending"
    resolve(result) {
        setTimeout(() => {
            this.state = 'fulfilled'
            if (typeof this.succeed === 'function') {
                this.succeed(result)
            }
        }, 0);
    }
    reject() {
        setTimeout(() => {
            this.state = 'rejected'
            if (typeof this.failed === 'function') {
                this.failed()
            }
        }, 0);
    }
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw new Error("我只接受一个函数")
        }
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    then(succeed?, failed?) {
        if (typeof succeed === "function") {
            this.succeed = succeed
        }
        if (typeof failed === "function") {
            this.failed = failed
        }
    }
}

export default PromiseVino