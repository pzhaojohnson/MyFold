
let MultiLoop0Search = new (function () {
  let that = this;
  
  this.writeToMatrixCode = Matrices.codes.MULTI_LOOP_0;
  
  this.createOneBaseStore = function (p0) {
    return LoopSearch.createOneBaseStore(p0, false);
  };
  
  /**
   * Returns a Store for the optimal substructure where the subsequence p0..p1 is contained in a
   * multibranch loop with no minimum number of stems required.
   * 
   * Never returns null;
   */
  this.find = function (p0, p1) {
    return LoopSearch.find(
      p0, p1,
      MultiG.b, MultiG.c,
      that.writeToMatrixCode, false,
      that.writeToMatrixCode, false);
  };
})();
