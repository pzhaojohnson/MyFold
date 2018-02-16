
let HairpinSearch = new (function () {
  let that = this;
  
  this.writeToMatrixCode = Matrices.codes.HAIRPIN;
  
  this.Store = function (p0, p1, totalG) {
    Search.Store.call(this, p0, p1, totalG);
  };
  
  this.createOneBaseStore = function (p0) {
    return null;
  };

  /**
   * For the subsequence p0..p1, returns a Store for the optimal substructure where p0 and p1 pair
   * to form a hairpin loop.
   * 
   * Returns null if p0 and p1 cannot pair to form a hairpin loop.
   */
  this.find = function (p0, p1) {
    if (!Utils.arePairable(Seq.SEQ, p0, p1)) {
      return null;
    }
    
    let loopLength = p1 - p0 - 1;
    
    if (loopLength < HairpinG.MIN_LOOP_LENGTH) {
      return null;
    }
    
    return new that.Store(p0, p1, HairpinG.calc(Seq.SEQ, p0, p1));
  };
})();
