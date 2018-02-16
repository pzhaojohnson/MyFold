
/**
 * Namespace for the thermodynamic parameters of hairpin loops.
 */
let HairpinG = new (function () {
  let that = this;
  
  // assumed to be at least 3
  this.MIN_LOOP_LENGTH = 3;
  
  // must go up to 9
  let INITIATION = {
    3: 5.7,
    4: 5.6,
    5: 5.6,
    6: 5.4,
    7: 5.9,
    8: 5.6,
    9: 6.4
  };
  
  let TETRAS = {
    "GGGGAC": -3.0,
    "GGUGAC": -3.0,
    "CGAAAG": -3.0,
    "GGAGAC": -3.0,
    "CGCAAG": -3.0,
    "GGAAAC": -3.0,
    "CGGAAG": -3.0,
    "CUUCGG": -3.0,
    "CGUGAG": -3.0,
    "CGAAGG": -2.5,
    "CUACGG": -2.5,
    "GGCAAC": -2.5,
    "CGCGAG": -2.5,
    "UGAGAG": -2.5,
    "CGAGAG": -2.0,
    "AGAAAU": -2.0,
    "CGUAAG": -2.0,
    "CUAACG": -2.0,
    "UGAAAG": -2.0,
    "GGAAGC": -1.5,
    "GGGAAC": -1.5,
    "UGAAAA": -1.5,
    "AGCAAU": -1.5
  };
  
  function isAllC(seq, p0, p1) {
    for (let r = p0 + 1; r < p1; r++) {
      if (seq.charAt(r) !== "C") {
        return false;
      }
    }
    
    return true;
  }
  
  function isUUorGAfirst(seq, p0, p1) {
    return (seq.charAt(p0 + 1) === "U" && seq.charAt(p1 - 1) === "U")
      || (seq.charAt(p0 + 1) === "G" && seq.charAt(p1 - 1) === "A");
  }
  
  let UUorGAfirst = -0.8;
  
  // parameters for all C loops
  let C3 = 1.4;
  let A = 0.3;
  let B = 1.6;
  
  this.calc = function (seq, p0, p1) {
    let loopLength = p1 - p0 - 1;
    
    if (loopLength < that.MIN_LOOP_LENGTH) {
      throw "Hairpin loop length is too small.";
    } else if (loopLength === 3) {
      return INITIATION[3] + (isAllC(seq, p0, p1) ? C3 : 0.0);
    } else if (loopLength === 4 && TETRAS[seq.substring(p0, p1 + 1)] !== undefined) {
      return TETRAS[seq.substring(p0, p1 + 1)];
    } else {
      let initG = loopLength <= 9 ? INITIATION[loopLength]
        : INITIATION[9] + (1.75 * Constants.R + Constants.T * Math.log(loopLength / 9));
      
      return initG
        + TermMisG.inner(seq, p0, p1)
        + (isUUorGAfirst(seq, p0, p1) ? UUorGAfirst : 0.0)
        + (isAllC(seq, p0, p1) ? A * loopLength + B : 0.0);
    }
  };
})();
