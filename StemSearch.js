
/**
 * Namespace for properties shared by Search namespaces for stem substructures.
 */
let StemSearch = new (function () {
  let that = this;
  
  this.Store = function (p0, p1, totalG, q0, q1) {
    Search.Store.call(this, p0, p1, totalG);
    
    this.q0 = q0;
    this.q1 = q1;
  };
  
  this.createOneBaseStore = function (p0) {
    return null;
  };
})();
