import mrcTableSimple from './src/main';
mrcTableSimple.install = function(Vue) {
  Vue.component(mrcTableSimple.name, mrcTableSimple);
};
export default mrcTableSimple;
