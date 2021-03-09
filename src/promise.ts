class PromiseVino {
    succeed = null
    failed = null
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw new Error("我只接受一个函数")
        }
        fn(() => {
            setTimeout(() => {
                this.succeed()
            }, 0);
        }, () => {
            this.failed()
        })
    }
    then(succeed, failed) {
        this.succeed = succeed
        this.failed = failed
    }
}

export default PromiseVino