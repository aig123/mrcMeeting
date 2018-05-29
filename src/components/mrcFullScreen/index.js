import mrcFullScreen from './src/main';
mrcFullScreen.install = function(Vue) {
  Vue.component(mrcFullScreen.name, mrcFullScreen);
};
export default mrcFullScreen;
