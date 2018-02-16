
/**
 * Namespace for utility functions.
 */
let Utils = new (function () {
  let that = this;
  
  this.isBase = function (seq, p) {
    return Constants.BASES.includes(seq.charAt(p));
  };
  
  this.areComplementary = function (seq, p0, p1) {
    return Constants.PAIRS[seq.charAt(p0)].includes(seq.charAt(p1));
  };
  
  this.arePairable = function (seq, p0, p1) {
    return that.areComplementary(seq, p0, p1);
  };
  
  this.isAUPair = function (seq, p0, p1) {
    return (seq.charAt(p0) === "A" && seq.charAt(p1) === "U")
      || (seq.charAt(p0) === "U" && seq.charAt(p1) === "A");
  };
  
  this.isGUPair = function (seq, p0, p1) {
    return (seq.charAt(p0) === "G" && seq.charAt(p1) === "U")
      || (seq.charAt(p0) === "U" && seq.charAt(p1) === "G");
  };
  
  this.isAUorGUPair = function (seq, p0, p1) {
    return that.isAUPair(seq, p0, p1) || that.isGUPair(seq, p0, p1);
  };
  
  /**
   * Capitalizes the sequence, replaces Ts with Us, and then removes characters that are not A, C,
   * G, or U.
   */
  this.filterSeq = function (seq) {
    let upper = seq.toUpperCase();
    let TtoU = upper.split("T").join("U");
    let chars = TtoU.split("");
    
    for (let i = 0; i < chars.length; i++) {
      if (!Constants.BASES.includes(chars[i])) {
        chars[i] = "";
      }
    }
    
    return chars.join("");
  };
})();
