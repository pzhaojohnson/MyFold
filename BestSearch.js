
let BestSearch = new (function () {
  let that = this;
  
  this.writeToMatrixCode = Matrices.codes.BEST;
  
  this.Store = function (p0, p1, totalG, bestMatrixCode) {
    CasesSearch.Store.call(this, p0, p1, totalG, bestMatrixCode);
  };
  
  this.createOneBaseStore = function (p0) {
    return new that.Store(p0, p0, 0.0, Matrices.codes.EXTERIOR);
  }
  
  /**
   * Returns a Store indicating the type of the optimal structure for the subsequence p0..p1.
   * 
   * Never returns null.
   */
  this.find = function (p0, p1, beStore) {
    let eCode = Matrices.codes.EXTERIOR;
    let EXTERIOR = Matrices[eCode];
    
    let pCode = Matrices.codes.PAIRED;
    let PAIRED = Matrices[pCode];
    
    let totalG = EXTERIOR[p0][p1].totalG;
    let bestMatrixCode = eCode;
    
    if (PAIRED[p0][p1] !== null) {
      let pG = PAIRED[p0][p1].totalG
        + StackG.endPenalty(Seq.SEQ, p0, p1);
      
      if (pG < totalG) {
        totalG = pG;
        bestMatrixCode = pCode;
      }
    }
    
    return new that.Store(p0, p1, totalG, bestMatrixCode);
  }
})();
