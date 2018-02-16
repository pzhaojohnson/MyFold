
// namespace related to the RNA sequence
let Seq = new (function () {
  let that = this;
  
  // references the RNA sequence
  this.SEQ = null;
  
  this.areComplementary = function (p0, p1) {
    return Utils.areComplementary(that.SEQ, p0, p1);
  };
  
  this.arePairable = function (p0, p1) {
    return Utils.arePairable(that.SEQ, p0, p1);
  };
  
  this.isAU = function (p0, p1) {
    return Utils.isAU(that.SEQ, p0, p1);
  };
  
  this.isGU = function (p0, p1) {
    return Utils.isGU(that.SEQ, p0, p1);
  };
})();
