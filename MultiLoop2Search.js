
let MultiLoop2Search = new (function () {
  let that = this;
  
  this.writeToMatrixCode = Matrices.codes.MULTI_LOOP_2;
  
  this.createOneBaseStore = function (p0) {
    return LoopSearch.createOneBaseStore(p0, true);
  };
  
  /**
   * Returns a Store for the optimal substructure where the subsequence p0..p1 is contained in a
   * multibranch loop containing at least 2 stems.
   * 
   * Returns null if such a multibranch loop cannot form.
   */
  this.find = function (p0, p1) {
    return LoopSearch.find(
      p0, p1,
      MultiG.b, MultiG.c,
      Matrices.codes.MULTI_LOOP_1, true,
      that.writeToMatrixCode, true);
  };
})();
