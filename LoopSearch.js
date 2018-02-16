
/**
 * Namespace for properties shared by Search namespaces for loop substructures.
 */
let LoopSearch = new (function () {
  let that = this;
  
  this.types = {
    UNPAIRED_FREE: 0,
    DANGLING_OUTER_5: 1,
    DANGLING_OUTER_3: 2,
    TERM_MIS_OUTER: 3,
    PAIRED_FREE: 4
  };
  
  this.Store = function (p0, p1, totalG, leftMatrixCode, rightMatrixCode, type, r, p1Minus, leftInBounds, rMinus) {
    Search.Store.call(this, p0, p1, totalG);
    
    this.leftMatrixCode = leftMatrixCode;
    this.rightMatrixCode = rightMatrixCode;
    this.type = type;
    this.r = r;
    this.p1Minus = p1Minus;
    this.leftInBounds = leftInBounds;
    this.rMinus = rMinus;
  };
  
  this.createOneBaseStore = function (p0, rightRequired) {
    if (rightRequired) {
      return null;
    } else {
      return new that.Store(p0, p0, 0.0, null, null, that.types.UNPAIRED_FREE, null, null, null, null);
    }
  };
  
  this.find = function (p0, p1, b, c, leftMatrixCode, leftRequired, rightMatrixCode, rightRequired) {
    let leftMatrix = Matrices[leftMatrixCode];
    let rightMatrix = Matrices[rightMatrixCode];
    let PAIRED = Matrices[Matrices.codes.PAIRED];
    
    let store = new that.Store(p0, p1, null, leftMatrixCode, rightMatrixCode, null, null, null, null, null);
    
    let totalG;
    let type;
    let r, p1Minus;
    let leftInBounds;
    let rMinus;
    
    // UF: UNPAIRED_FREE
    function improveUF() {
      let isPossible = (!rightRequired || rightMatrix[p0][p1 - 1] !== null);
      
      if (isPossible) {
        totalG = b;
        
        if (rightMatrix[p0][p1 - 1] !== null) {
          totalG += rightMatrix[p0][p1 - 1].totalG;
        }
        
        type = that.types.UNPAIRED_FREE;
        
        update();
      }
    }
    
    // DO5: DANGLING_OUTER_5
    function improveDO5() {
      let isPossible = r - 1 >= p0
        && PAIRED[r][p1] !== null
        && (!leftRequired || (r - 2 >= p0 && leftMatrix[p0][r - 2] !== null));
      
      if (isPossible) {
        type = that.types.DANGLING_OUTER_5;
        p1Minus = p1;
        
        totalG = PAIRED[r][p1Minus].totalG
          + DanglingG.outer5(Seq.SEQ, r, p1Minus)
          + b
          + c
          + StackG.endPenalty(Seq.SEQ, r, p1Minus);
        
        if (leftRequired || (r - 2 >= p0 && leftMatrix[p0][r - 2] !== null)) {
          totalG += leftMatrix[p0][r - 2].totalG;
          leftInBounds = true;
          rMinus = r - 2;
        } else {
          leftInBounds = false;
        }
        
        update();
      }
    }
    
    // DO3: DANGLING_OUTER_3
    function improveDO3() {
      let isPossible = PAIRED[r][p1 - 1] !== null
        && (!leftRequired || (r - 1 >= p0 && leftMatrix[p0][r - 1] !== null));
      
      if (isPossible) {
        type = that.types.DANGLING_OUTER_3;
        p1Minus = p1 - 1;
        
        totalG = PAIRED[r][p1Minus].totalG
          + DanglingG.outer3(Seq.SEQ, r, p1Minus)
          + b
          + c
          + StackG.endPenalty(Seq.SEQ, r, p1Minus);
        
        if (leftRequired || (r - 1 >= p0 && leftMatrix[p0][r - 1] !== null)) {
          totalG += leftMatrix[p0][r - 1].totalG;
          leftInBounds = true;
          rMinus = r - 1;
        } else {
          leftInBounds = false;
        }
        
        update();
      }
    }
    
    // TMO: TERM_MIS_OUTER
    function improveTMO() {
      let isPossible = r - 1 >= p0
        && PAIRED[r][p1 - 1] !== null
        && (!leftRequired || (r - 2 >= p0 && leftMatrix[p0][r - 2] !== null));
      
      if (isPossible) {
        type = that.types.TERM_MIS_OUTER;
        p1Minus = p1 - 1;
        
        totalG = PAIRED[r][p1Minus].totalG
          + TermMisG.outer(Seq.SEQ, r, p1Minus)
          + (2 * b)
          + c
          + StackG.endPenalty(Seq.SEQ, r, p1Minus);
        
        if (leftRequired || (r - 2 >= p0 && leftMatrix[p0][r - 2] !== null)) {
          totalG += leftMatrix[p0][r - 2].totalG;
          leftInBounds = true;
          rMinus = r - 2;
        } else {
          leftInBounds = false;
        }
        
        update();
      }
    }
    
    // PF: PAIRED_FREE
    function improvePF() {
      let isPossible = r > p0
        && PAIRED[r][p1] !== null
        && (!leftRequired || (r - 1 >= p0 && leftMatrix[p0][r - 1] !== null));
      
      if (isPossible) {
        type = that.types.PAIRED_FREE;
        p1Minus = p1;
        
        totalG = PAIRED[r][p1].totalG
          + c
          + StackG.endPenalty(Seq.SEQ, r, p1Minus);
        
        if (leftRequired || (r - 1 >= p0 && leftMatrix[p0][r - 1] !== null)) {
          totalG += leftMatrix[p0][r - 1].totalG;
          leftInBounds = true;
          rMinus = r - 1;
        } else {
          leftInBounds = false;
        }
        
        update();
      }
    }
    
    function update() {
      if (store.totalG === null || totalG < store.totalG) {
        store.totalG = totalG;
        store.type = type;
        store.r = r;
        store.p1Minus = p1Minus;
        store.leftInBounds = leftInBounds;
        store.rMinus = rMinus;
      }
    }
    
    improveUF();
    
    for (r = p0; r < p1; r++) {
      improveDO3();
      improveTMO();
      improveDO5();
      improvePF();
    }
    
    if (store.totalG === null) {
      return null;
    } else {
      return store;
    }
  };
})();
