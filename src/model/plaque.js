export class Plaque {
  constructor(valeur, construction = null, latex = null, debugCalculus = null) {
    this.valeur = valeur;
    if (construction === null) {
      this.construction = valeur.toString();
    } else {
      this.construction = construction;
    }
    if (latex === null) {
      this.latex = valeur.toString();
    } else {
      this.latex = latex;
    }
    if (debugCalculus === null) {
      this.debugCalculus = "";
    } else {
      this.debugCalculus = debugCalculus;
    }
  }
  toString() {
    return (
      "On obtient " +
      this.valeur +
      " en faisant le calcul suivant " +
      this.construction
    );
  }
  plus(autrePlaque) {
    return new Plaque(
      parseInt(this.valeur) + parseInt(autrePlaque.valeur),
      "(" + this.construction + "+" + autrePlaque.construction + ")",
      "(" + this.latex + "+" + autrePlaque.latex + ")",
      this.debugCalculus +
        autrePlaque.debugCalculus +
        this.valeur +
        " + " +
        autrePlaque.valeur +
        " = " +
        (parseInt(this.valeur) + parseInt(autrePlaque.valeur)) +
        "\n"
    );
  }
  moins(autrePlaque) {
    return new Plaque(
      this.valeur - autrePlaque.valeur,
      "(" + this.construction + "-" + autrePlaque.construction + ")",
      "(" + this.latex + "-" + autrePlaque.latex + ")",
      this.debugCalculus +
        autrePlaque.debugCalculus +
        +this.valeur +
        " - " +
        autrePlaque.valeur +
        " = " +
        (this.valeur - autrePlaque.valeur) +
        "\n"
    );
  }
  fois(autrePlaque) {
    return new Plaque(
      this.valeur * autrePlaque.valeur,
      "(" + this.construction + "*" + autrePlaque.construction + ")",
      this.latex + "\\times" + autrePlaque.latex,
      this.debugCalculus +
        autrePlaque.debugCalculus +
        +this.valeur +
        " * " +
        autrePlaque.valeur +
        " = " +
        this.valeur * autrePlaque.valeur +
        "\n"
    );
  }
  divise(autrePlaque) {
    if (autrePlaque.valeur !== 0) {
      return new Plaque(
        this.valeur / autrePlaque.valeur,
        "(" + this.construction + "/" + autrePlaque.construction + ")",
        "\\frac{" + this.latex + "}{" + autrePlaque.latex + "}",
        this.debugCalculus +
          autrePlaque.debugCalculus +
          +this.valeur +
          " / " +
          autrePlaque.valeur +
          " = " +
          this.valeur / autrePlaque.valeur +
          "\n"
      );
    }
  }
}
