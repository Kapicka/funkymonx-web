const heleprs = {
    methods: {
        getSrc(src) {
            const ret = require(src)
            console.log(ret)
            return ret
        }
    }
}
export default heleprs
