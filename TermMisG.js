
/**
 * Namespace for the thermodynamic parameters of terminal mismatches.
 */
let TermMisG = new (function () {
  let MISMATCHES = {
    "AA": { "AU": -0.8, "CU": -1.0, "GU": -0.8, "UU": -0.4 },
    "AC": { "AU": -0.6, "CU": -0.7, "GU": -1.7, "UU": -0.7 },
    "AG": { "AU": -0.8, "CU": -1.6, "GU": -0.8, "UU": -0.1 },
    "AU": { "AU": -0.6, "CU": -0.8, "GU": -0.9, "UU": -0.8 },
    "CA": { "AG": -1.5, "CG": -1.5, "GG": -1.4, "UG": -1.6 },
    "CC": { "AG": -1.0, "CG": -1.1, "GG": -2.8, "UG": -0.8 },
    "CG": { "AG": -1.4, "CG": -1.9, "GG": -1.6, "UG": -0.9 },
    "CU": { "AG": -1.6, "CG": -1.4, "GG": -1.6, "UG": -1.2 },
    "GA": { "AC": -1.1, "CC": -1.5, "GC": -1.3, "UC": -1.9, "AU": -0.3, "CU": -1.0, "GU": -0.8, "UU": -0.8 },
    "GC": { "AC": -1.1, "CC": -0.7, "GC": -2.9, "UC": -0.5, "AU": -0.6, "CU": -0.7, "GU": -2.0, "UU": -0.7 },
    "GG": { "AC": -1.6, "CC": -2.8, "GC": -1.4, "UC": -1.0, "AU": -0.6, "CU": -1.6, "GU": -0.8, "UU": 0.0 },
    "GU": { "AC": -1.7, "CC": -1.0, "GC": -2.0, "UC": -0.7, "AU": -0.9, "CU": -0.8, "GU": 1.8, "UU": -0.8 },
    "UA": { "AA": -1.0, "CA": -0.8, "GA": -1.1, "UA": -0.8, "AG": -1.0, "CG": -0.8, "GG": -1.1, "UG": -0.5 },
    "UC": { "AA": -0.7, "CA": -0.6, "GA": -1.9, "UA": -0.5, "AG": -0.7, "CG": -0.6, "GG": -1.0, "UG": -0.5 },
    "UG": { "AA": -1.1, "CA": -1.6, "GA": -1.2, "UA": -0.5, "AG": -0.5, "CG": -0.9, "GG": -0.8, "UG": -0.8 },
    "UU": { "AA": -0.4, "CA": -0.6, "GA": -0.8, "UA": -0.5, "AG": -0.1, "CG": -0.6, "GG": 0.0, "UG": -0.5 }
  };
  
  this.inner = function (seq, p0, p1) {
    return MISMATCHES[seq.substring(p0, p0 + 2)][seq.substring(p1 - 1, p1 + 1)];
  };
  
  this.outer = function (seq, p0, p1) {
    return MISMATCHES[seq.substring(p0 - 1, p0 + 1)][seq.substring(p1, p1 + 2)];
  };
})();
