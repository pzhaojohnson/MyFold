
/**
 * Namespace for the thermodynamic parameters of base pair stacks.
 */
let StackG = new (function () {
  let that = this;
  
  let STACKS = {
    "AA": { "UU": -0.93 },
    "AC": { "GU": -2.24 },
    "AG": { "CU": -2.08, "UU": -0.55 },
    "AU": { "AU": -1.10, "GU": -1.36 },
    "CA": { "UG": -2.11 },
    "CC": { "GG": -3.26 },
    "CG": { "CG": -2.36, "UG": -1.41 },
    "CU": { "AG": -2.08, "GG": -2.11 },
    "GA": { "UC": -2.35, "UU": -1.27 },
    "GC": { "GC": -3.42, "GU": -2.51 },
    "GG": { "CC": -3.26, "UC": -1.53, "CU": -2.11, "UU": -0.5 },
    "GU": { "AC": -2.24, "GC": -2.51, "AU": -1.36, "GU": 1.29 },
    "UA": { "UA": -1.33, "UG": -1.00 },
    "UC": { "GA": -2.35, "GG": -1.53 },
    "UG": { "CA": -2.11, "UA": -1.00, "CG": -1.41, "UG": 0.30 },
    "UU": { "AA": -0.93, "GA": -1.27, "AG": -0.55, "GG": -0.5 }
  };
  
  let INTERMOL_INIT = 4.09;
  
  let AU_END = 0.45;
  let GU_END = 0.45;
  
  this.endPenalty = function (seq, p0, p1) {
    if (Utils.isAUPair(seq, p0, p1)) {
      return AU_END;
    } else if (Utils.isGUPair(seq, p0, p1)) {
      return GU_END;
    } else {
      return 0.0;
    }
  };
  
  let SYM_CORR = 0.43;
  
  this.calc = function (seq, p0, p1) {
    return STACKS[seq.substring(p0, p0 + 2)][seq.substring(p1 - 1, p1 + 1)];
  };
})();
