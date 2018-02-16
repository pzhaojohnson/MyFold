
/**
 * Namespace for the thermodynamic parameters of dangling ends.
 */
let DanglingG = new (function () {
  let ENDS5 = {
    "A": {
      "U": { "A": -0.3, "C": -0.1, "G": -0.2, "U": -0.2 }
    },
    "C": {
      "G": { "A": -0.2, "C": -0.3, "G": 0.0, "U": 0.0 }
    },
    "G": {
      "C": { "A": -0.5, "C": -0.3, "G": -0.2, "U": -0.1 },
      "U": { "A": -0.3, "C": -0.1, "G": -0.2, "U": -0.2 },
    },
    "U": {
      "A": { "A": -0.3, "C": -0.3, "G": -0.4, "U": -0.2 },
      "G": { "A": -0.3, "C": -0.3, "G": -0.4, "U": -0.2 }
    }
  };
  
  let ENDS3 = {
    "A": {
      "U": { "A": -0.8, "C": -0.5, "G": -0.8, "U": -0.6 }
    },
    "C": {
      "G": { "A": -1.7, "C": -0.8, "G": -1.7, "U": -1.2 }
    },
    "G": {
      "C": { "A": -1.1, "C": -0.4, "G": -1.3, "U": -0.6 },
      "U": { "A": -0.8, "C": -0.5, "G": -0.8, "U": -0.6 },
    },
    "U": {
      "A": { "A": -0.7, "C": -0.1, "G": -0.7, "U": -0.1 },
      "G": { "A": -0.7, "C": -0.1, "G": -0.7, "U": -0.1 }
    }
  };
  
  this.outer5 = function (seq, p0, p1) {
    if (ENDS5[seq.charAt(p0)][seq.charAt(p1)] === undefined) {
      console.log(p0 + "," + seq.charAt(p0) + "," + p1 + "," + seq.charAt(p1));
    }
    return ENDS5[seq.charAt(p0)][seq.charAt(p1)][seq.charAt(p0 - 1)];
  };
  
  this.outer3 = function (seq, p0, p1) {
    return ENDS3[seq.charAt(p1)][seq.charAt(p0)][seq.charAt(p1 + 1)];
  };
  
  this.inner5 = function (seq, p0, p1) {
    return ENDS5[seq.charAt(p1)][seq.charAt(p0)][seq.charAt(p1 - 1)];
  };
  
  this.inner3 = function (seq, p0, p1) {
    return ENDS3[seq.charAt(p0)][seq.charAt(p1)][seq.charAt(p0 + 1)];
  };
})();
