import indexApp from './src/main';
indexApp.install = function(Vue) {
  Vue.component(indexApp.name, indexApp);
};
export default indexApp;