
/**
 * Namespace that directs the folding of the RNA sequence.
 */
let Fold = new (function () {
  
  /*
  An Array of all Search namespaces, which find optimal substructures of a given type.
  
  The Search namespaces must be in a valid ordering for filling out the matrices, as this Array is
  used by the fillOut function.
  */
  let searches = [
    HairpinSearch,
    BulgeSearch,
    InternalSearch,
    MultiLoop0Search,
    MultiLoop1Search,
    MultiLoop2Search,
    MultiSearch,
    StackSearch,
    PairedSearch,
    ExteriorSearch,
    BestSearch
  ];
  
  /**
   * For all matrix references in the Matrices namespace, this function creates new 2D Arrays.
   * 
   * For all positions p0, this function initializes MATRIX[p0][p0] (a substructure of length 1) to
   * the output of the createOneBaseStore function of the corresponding Search namespace.
   * 
   * All other positions in the matrices are left initialized as undefined.
   */
  let initializeMatrices = function () {
    function generate2D(createOneBaseStore) {
      let matrix = new Array(Seq.SEQ.length);
      
      for (let p0 = 0; p0 < Seq.SEQ.length; p0++) {
        let row = new Array(Seq.SEQ.length);
        row[p0] = createOneBaseStore(p0);
        matrix[p0] = row;
      }
      
      return matrix;
    }
    
    searches.forEach(function (s) {
      Matrices[s.writeToMatrixCode] = generate2D(s.createOneBaseStore);
    });
  };

  /**
   * Fills out the matrices.
   * 
   * Assumes that the matrix references in the Matrices namespace already refer to 2D Arrays of
   * appropriate size and that cells for subsequences of length 1 have already been filled in. (The
   * initializeMatrices function defined above is meant to fulfill these requirements and, hence,
   * should be called before this one.)
   * 
   * Makes use of the searches Array defined above and assumes that it has a valid ordering.
   * 
   * Whenever the find function of a Search namespace is called, it is guaranteed that p0 and p1
   * are within the bounds of the RNA sequence and that p0 < p1.
   */
  let fillOut = function () {
    let p0, p1;
    
    function fillIn() {
      
      // assumes that the Search namespaces are in a valid ordering
      searches.forEach(function (s) {
        
        /*
        Sometimes the find function of a Search namespace returns null, but it is still important
        to set the corresponding cell in the matrix to null, since the find functions of other
        Search namespaces depend on the null values being present in the matrices.
        */
        Matrices[s.writeToMatrixCode][p0][p1] = s.find(p0, p1);
      });
    }
    
    // d is the distance between p0 and p1
    for (let d = 1; d < Seq.SEQ.length; d++) {
      for (p0 = 0; p0 + d < Seq.SEQ.length; p0++) {
        
        // guarantees that p0 < p1
        p1 = p0 + d;
        
        fillIn();
      }
    }
  };

  /**
   * Backtracks through the matrices to produce the optimal folding.
   * 
   * Assumes that the matrices have already been filled out.
   * 
   * Returns a String representing the secondary structure of the optimal folding.
   */
  let backtrack = function () {
    
    // an Array of characters (really one character Strings) representing the secondary structure
    let structure;
    
    let matrixCodes = Matrices.codes;
    
    function handleCases(p0, p1, matrixCode) {
      let store = Matrices[matrixCode][p0][p1];
      bt(p0, p1, store.bestMatrixCode);
    }
    
    function handleLoop(p0, p1, matrixCode) {
      let store = Matrices[matrixCode][p0][p1];
      
      if (store.type === LoopSearch.types.UNPAIRED_FREE) {
        if (p1 - 1 >= p0) {
          bt(p0, p1 - 1, store.rightMatrixCode);
        }
      } else {
        bt(store.r, store.p1Minus, matrixCodes.PAIRED);
        
        if (store.leftInBounds) {
          bt(p0, store.rMinus, store.leftMatrixCode);
        }
      }
    }
    
    function handleStem(p0, p1, matrixCode) {
      structure[p0] = "(";
      structure[p1] = ")";
      
      let store = Matrices[matrixCode][p0][p1];
      bt(store.q0, store.q1, matrixCodes.PAIRED);
    }
    
    function handleMulti(p0, p1, matrixCode) {
      structure[p0] = "(";
      structure[p1] = ")";
      
      let store = Matrices[matrixCodes.MULTI][p0][p1];
      bt(store.p0Plus, store.p1Minus, matrixCodes.MULTI_LOOP_2);
    }
    
    function handleEnd(p0, p1, matrixCode) {
      structure[p0] = "(";
      structure[p1] = ")";
    }
    
    function bt(p0, p1, matrixCode) {
      switch (matrixCode) {
        case matrixCodes.HAIRPIN:
          handleEnd(p0, p1, matrixCode);
          break;
        case matrixCodes.BULGE:
          handleStem(p0, p1, matrixCode);
          break;
        case matrixCodes.INTERNAL:
          handleStem(p0, p1, matrixCode);
          break;
        case matrixCodes.MULTI_LOOP_0:
          handleLoop(p0, p1, matrixCode);
          break;
        case matrixCodes.MULTI_LOOP_1:
          handleLoop(p0, p1, matrixCode);
          break;
        case matrixCodes.MULTI_LOOP_2:
          handleLoop(p0, p1, matrixCode);
          break;
        case matrixCodes.MULTI:
          handleMulti(p0, p1, matrixCode);
          break;
        case matrixCodes.STACK:
          handleStem(p0, p1, matrixCode);
          break;
        case matrixCodes.PAIRED:
          handleCases(p0, p1, matrixCode);
          break;
        case matrixCodes.EXTERIOR:
          handleLoop(p0, p1, matrixCode);
          break;
        case matrixCodes.BEST:
          handleCases(p0, p1, matrixCode);
          break;
        default:
          throw new Error("Unrecognized matrixCode: " + matrixCode);
      }
    }
    
    structure = new Array(Seq.SEQ.length);
    structure.fill(".");
    
    // start backtracking
    bt(0, Seq.SEQ.length - 1, matrixCodes.BEST);
    
    return structure.join("");
  };

  /**
   * Returns a String representing the secondary structure of the optimal folding of the RNA
   * sequence.
   */
  this.fold = function () {
    if (Seq.SEQ.length === 0) {
      return "";
    }
    
    initializeMatrices();
    fillOut();
    return backtrack();
  };
})();
