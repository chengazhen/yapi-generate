const template = require('art-template')
const request = require('request')

requestObj = Object.create({
	startTask = function () {
		let opts = {
			url: `${this.host}/api/plugin/export?type=json&pid=${this.pid}&status=all`,
			headers: {
				Cookie: this.cookie,
			}
		};
	}
})

var html = template('E:/工作/development-tools/yapi-generate/ejs/core/index.art', {
	user: 'aui',
})
console.log(html)
