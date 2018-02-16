
/**
 * Called when the user submits an RNA sequence for folding.
 */
function main() {
  Seq.SEQ = Utils.filterSeq(document.getElementById("SEQ").value);
  let structure = Fold.fold();
  let w = window.open("");
  
  w.document.write(
    "<!doctype html>\n"
    + "<html>\n"
    + "<head></head>\n"
    + "<body>\n"
    + ">name<br>\n"
    + Seq.SEQ + "<br>\n"
    + structure + "<br>\n"
    + "</body>\n"
    + "</html>\n"
  );
  
  w.stop();
  
  console.log(Matrices[Matrices.codes.BEST][0][Seq.SEQ.length - 1].totalG);
}
