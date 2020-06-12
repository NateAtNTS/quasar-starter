const globalSettings = {
  data: function() {
    return {

      get baseURL () {
        return "http://localhost:8080/"
      },

    } // returned object

  } // data

} // global settings const


export default {
  install (Vue, options) {
    Vue.mixin(globalSettings)
  }
}
