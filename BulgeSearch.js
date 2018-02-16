
let BulgeSearch = new (function () {
  let that = this;
  
  this.writeToMatrixCode = Matrices.codes.BULGE;
  
  this.Store = function (p0, p1, totalG, q0, q1) {
    StemSearch.Store.call(this, p0, p1, totalG, q0, q1);
  };
  
  this.createOneBaseStore = function (p0) {
    return StemSearch.createOneBaseStore(p0);
  };

  /**
   * For the subsequence p0..p1, returns a Store for the optimal substructure where the pairing of
   * p0 with p1 is part of a bulge loop.
   * 
   * Returns null if the pairing of p0 and p1 cannot be part of a bulge loop.
   */
  this.find = function (p0, p1) {
    if (!Utils.arePairable(Seq.SEQ, p0, p1)) {
      return null;
    }
    
    let PAIRED = Matrices[Matrices.codes.PAIRED];
    
    let store = new that.Store(p0, p1, null, null, null);
    
    let q0, q1;
    
    function improve() {
      if (PAIRED[q0][q1] !== null) {
        let inner = PAIRED[q0][q1];
        let bG = BulgeG.calc(Seq.SEQ, p0, p1, q0, q1);
        let tG = inner.totalG + bG;
        
        if (store.totalG === null || tG < store.totalG) {
          store.totalG = tG;
          store.q0 = q0;
          store.q1 = q1;
        }
      }
    }
    
    function loopNotTooBig() {
      return (q0 - p0 - 1) + (p1 - q1 - 1) <= BulgeG.MAX_LOOP_SIZE;
    }
    
    q1 = p1 - 1;
    
    for (q0 = p0 + 2; q0 < q1 && loopNotTooBig(); q0++) {
      improve();
    }
    
    q0 = p0 + 1;
    
    for (q1 = p1 - 2; q0 < q1 && loopNotTooBig(); q1--) {
      improve();
    }
    
    if (store.totalG === null) {
      return null;
    } else {
      return store;
    }
  };
})();
