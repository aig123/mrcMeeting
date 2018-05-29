import mrcForm from './src/main.vue';
mrcForm.install = function(Vue) {
  Vue.component(mrcForm.name, mrcForm);
};
export default mrcForm;
