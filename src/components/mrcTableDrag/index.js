import mrcTable from './src/main';
mrcTable.install = function(Vue) {
  Vue.component(mrcTable.name, mrcTable);
};
export default mrcTable;
