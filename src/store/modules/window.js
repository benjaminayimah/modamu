export default {
    state: {
        device: '',
    },
    mutations: {
      computeWindow(state) {
        let appWidth = 1344
        let winWidth = window.innerWidth
        state.windowHeight = window.innerHeight
        state.windowWidth = winWidth
        if(winWidth < 500){
          state.device = 'mobile'
        }else if(winWidth > appWidth){
          state.device = 'desktop'
        }else{
          state.device = 'tablet'
        }
      }
    },
    getters: {
      getDevice: (state) => state.device,
    }
}