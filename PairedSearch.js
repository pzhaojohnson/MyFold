
let PairedSearch = new (function () {
  let that = this;
  
  this.writeToMatrixCode = Matrices.codes.PAIRED;
  
  let matrixCodes = Matrices.codes;
  
  let pairedMatrixCodes = [
    matrixCodes.HAIRPIN,
    matrixCodes.BULGE,
    matrixCodes.INTERNAL,
    matrixCodes.MULTI,
    matrixCodes.STACK
  ];
  
  this.Store = function (p0, p1, totalG, bestMatrixCode) {
    CasesSearch.Store.call(this, p0, p1, totalG, bestMatrixCode);
  };
  
  this.createOneBaseStore = function (p0) {
    return null;
  };

  /**
   * For the subsequence p0..p1, returns a Store indicating the type of the optimal substructure
   * where p0 is paired with p1.
   * 
   * Returns null if p0 and p1 cannot be paired.
   */
  this.find = function (p0, p1) {
    let totalG = null;
    let bestMatrixCode;
    
    pairedMatrixCodes.forEach(function (matrixCode) {
      let store = Matrices[matrixCode][p0][p1];
      
      if (store !== null) {
        if (totalG === null || store.totalG < totalG) {
          totalG = store.totalG;
          bestMatrixCode = matrixCode;
        }
      }
    });
    
    if (totalG === null) {
      return null;
    } else {
      return new that.Store(p0, p1, totalG, bestMatrixCode);
    }
  };
})();
