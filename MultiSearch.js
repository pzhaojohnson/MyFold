
let MultiSearch = new (function () {
  let that = this;
  
  this.writeToMatrixCode = Matrices.codes.MULTI;
  
  this.types = {
    FREE: 0,
    DANGLING_INNER_5: 1,
    DANGLING_INNER_3: 2,
    TERM_MIS_INNER: 3,
  };
  
  this.Store = function (p0, p1, totalG, type, p0Plus, p1Minus) {
    Search.Store.call(this, p0, p1, totalG);
    
    this.type = type;
    this.p0Plus = p0Plus;
    this.p1Minus = p1Minus;
  };
  
  this.createOneBaseStore = function (p0) {
    return null;
  };
  
  /**
   * For the subsequence p0..p1, returns a Store for the optimal substructure where the pairing of
   * p0 with p1 forms a multibranch loop.
   * 
   * Returns null if the pairing of p0 with p1 cannot form a multibranch loop.
   */
  this.find = function (p0, p1) {
    if (!Utils.arePairable(Seq.SEQ, p0, p1)) {
      return null;
    }
    
    let MULTI_LOOP_2 = Matrices[Matrices.codes.MULTI_LOOP_2];
    
    let store = new that.Store(p0, p1, null, null, null, null);
    
    let tG;
    let type;
    let p0Plus, p1Minus;
    
    function isPossible() {
      return p0Plus < p1Minus && MULTI_LOOP_2[p0Plus][p1Minus] !== null;
    }
    
    // F: FREE
    function improveF() {
      p0Plus = p0 + 1;
      p1Minus = p1 - 1;
      
      if (isPossible()) {
        type = that.types.FREE;
        tG = MultiG.a
          + MULTI_LOOP_2[p0Plus][p1Minus].totalG;
        
        update();
      }
    }
    
    // DI5: DANGLING_INNER_5
    function improveDI5() {
      p0Plus = p0 + 1;
      p1Minus = p1 - 2;
      
      if (isPossible()) {
        type = MultiSearch.types.DANGLING_INNER_5;
        tG = MultiG.a
          + DanglingG.inner5(Seq.SEQ, p0, p1)
          + MULTI_LOOP_2[p0Plus][p1Minus].totalG;
        
        update();
      }
    }
    
    // DI3: DANGLING_INNER_3
    function improveDI3() {
      p0Plus = p0 + 2;
      p1Minus = p1 - 1;
      
      if (isPossible()) {
        type = MultiSearch.types.DANGLING_INNER_3;
        tG = MultiG.a
          + DanglingG.inner3(Seq.SEQ, p0, p1)
          + MULTI_LOOP_2[p0Plus][p1Minus].totalG;
        
        update();
      }
    }
    
    // TMI: TERM_MIS_INNER
    function improveTMI() {
      p0Plus = p0 + 2;
      p1Minus = p1 - 2;
      
      if (isPossible()) {
        type = MultiSearch.types.TERM_MIS_INNER;
        tG = MultiG.a
          + TermMisG.inner(Seq.SEQ, p0, p1)
          + MULTI_LOOP_2[p0Plus][p1Minus].totalG;
        
        update();
      }
    }
    
    function update() {
      if (store.totalG === null || tG < store.totalG) {
        store.totalG = tG;
        store.type = type;
        store.p0Plus = p0Plus;
        store.p1Minus = p1Minus;
      }
    }
    
    improveF();
    improveDI5();
    improveDI3();
    improveTMI();
    
    if (store.totalG === null) {
      return null;
    } else {
      return store;
    }
  };
})();
