
let CasesSearch = new (function () {
  let that = this;
  
  this.Store = function (p0, p1, totalG, bestMatrixCode) {
    Search.Store.call(this, p0, p1, totalG);
    
    this.bestMatrixCode = bestMatrixCode;
  };
})();
