
// namespace for all matrices
let Matrices = new (function () {
  let that = this;
  
  this.codes = {
    HAIRPIN: 0,
    BULGE: 1,
    INTERNAL: 2,
    MULTI_LOOP_0: 3,
    MULTI_LOOP_1: 4,
    MULTI_LOOP_2: 5,
    MULTI: 6,
    STACK: 7,
    PAIRED: 8,
    EXTERIOR: 9,
    BEST: 10
  };
  
  this.compare = function (code0, code1, p0, p1) {
    let matrix0 = that[code0];
    let matrix1 = that[code1];
    
    if (matrix0[p0][p1] === null && matrix1[p0][p1] === null) {
      return 0;
    } else if (matrix0[p0][p1] === null) {
      return 1;
    } else if (matrix1[p0][p1] === null) {
      return -1;
    } else {
      return matrix0[p0][p1].totalG - matrix1[p0][p1].totalG;
    }
  };
})();

// initialize references to matrices
Object.keys(Matrices.codes).forEach(function (name) {
  Matrices[Matrices.codes[name]] = null;
});
