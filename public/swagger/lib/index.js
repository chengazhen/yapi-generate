var utils = {
  /**
    * @description: 获取tags和method
    * @param {*} target
    * @return {*}
    */
  getTagsAndMethod(target) {
    const method = target['get'] ? 'get' : 'post'
    const tag = target[method].tags || []
    return {
      tag,
      method
    }
  }

}