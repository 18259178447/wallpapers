module.exports = {
  dones(data, name) {
    if(!name) return data;
    if(data && data.length > 0){
      return data.map(item => this[name](item))
    } 
    return []
  },

}