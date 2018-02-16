
/**
 * General namespace for properties shared by all Search namespaces.
 * 
 * Search namespaces direct searching through the matrices for the different kinds of optimal
 * substructures.
 */
let Search = new (function () {
  this.Store = function (p0, p1, totalG) {
    this.p0 = p0;
    this.p1 = p1;
    this.totalG = totalG;
  };
})();
