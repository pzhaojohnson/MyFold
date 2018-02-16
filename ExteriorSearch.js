
let ExteriorSearch = new (function () {
  let that = this;
  
  this.writeToMatrixCode = Matrices.codes.EXTERIOR;
  
  this.createOneBaseStore = function (p0) {
    return LoopSearch.createOneBaseStore(p0, false);
  };
  
  /**
   * For the subsequence p0..p1, returns a Store for the optimal substructure where the subsequence
   * is contained in an exterior loop.
   * 
   * Never returns null.
   */
  this.find = function (p0, p1) {
    return LoopSearch.find(
      p0, p1,
      0.0, 0.0,
      Matrices.codes.BEST, false,
      Matrices.codes.BEST, false);
  };
})();
