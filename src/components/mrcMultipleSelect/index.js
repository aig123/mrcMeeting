import mrcDialog from './src/main';
mrcDialog.install = function(Vue) {
  Vue.component(mrcDialog.name, mrcDialog);
};
export default mrcDialog;
