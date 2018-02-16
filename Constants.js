
let Constants = new (function () {
  
  // Universal Gas Constant in kcal/mol/K
  this.R = 0.0019872;
  
  // absolute temperature in Kelvin
  this.T = 310.15;
  
  this.BASES = ["A", "U", "G", "C"];

  this.PAIRS = {
    "A": ["U"],
    "U": ["A", "G"],
    "G": ["C", "U"],
    "C": ["G"]
  };
})();
