
let StackSearch = new (function () {
  let that = this;
  
  this.writeToMatrixCode = Matrices.codes.STACK;
  
  this.Store = function (p0, p1, totalG, q0, q1) {
    StemSearch.Store.call(this, p0, p1, totalG, q0, q1);
  };
  
  this.createOneBaseStore = function (p0) {
    return StemSearch.createOneBaseStore(p0);
  };

  /**
   * For the subsequence p0..p1, returns a Store for the optimal substructure where the pairing of
   * p0 with p1 is stacked with the pairing of q0 with q1, where q0 = p0 + 1 and q1 = p1 - 1.
   * 
   * Returns null if p0 and p1 or q0 and q1 cannot be paired.
   */
  this.find = function (p0, p1) {
    let PAIRED = Matrices[Matrices.codes.PAIRED];
    
    let q0 = p0 + 1;
    let q1 = p1 - 1;
    
    let isPossible = Utils.arePairable(Seq.SEQ, p0, p1)
      && (q0 < q1 && PAIRED[q0][q1] !== null);
    
    if (!isPossible) {
      return null;
    }
    
    let inner = PAIRED[q0][q1];
    let stG = StackG.calc(Seq.SEQ, p0, p1);
    let totalG = inner.totalG + stG;
    
    return new that.Store(p0, p1, totalG, q0, q1);
  };
})();
