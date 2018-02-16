
/**
 * Namespace for the thermodynamic parameters of bulge loops.
 */
let BulgeG = new (function () {
  let that = this;
  
  this.MAX_LOOP_SIZE = 30;
  
  // must go up to 6
  let INITIATION = {
    1: 3.8,
    2: 2.8,
    3: 3.2,
    4: 3.6,
    5: 4.0,
    6: 4.4
  };
  
  this.calc = function (seq, p0, p1, q0, q1) {
    if (p0 + 1 !== q0 && p1 - 1 !== q1) {
      throw "This is not a bulge loop.";
    }
    
    let n = p0 + 1 === q0 ? p1 - q1 - 1 : q0 - p0 - 1;
    
    if (n === 1) {
      let SEQ = Seq.SEQ;
      
      let stG = StackG.calc(
        SEQ.charAt(p0) + SEQ.charAt(q0) + SEQ.charAt(q1) + SEQ.charAt(p1),
        0,
        3
      );
      
      return INITIATION[1] + stG;
    } else {
      let initG = n <= 6 ? INITIATION[n]
        : INITIATION[6] + (1.75 * Constants.R * Constants.T * Math.log(n / 6));
      
      return initG
        + StackG.endPenalty(Seq.SEQ, q0, q1);
    }
  };
})();
