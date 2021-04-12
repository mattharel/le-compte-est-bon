import { Plaque } from "../model/plaque";

function possibilites(a, b) {
  const lpossibles = [];
  lpossibles.push(a.plus(b));
  if (a.valeur > b.valeur) {
    lpossibles.push(a.moins(b));
    if (b.valeur !== 0 && b.valeur !== 1 && a.valeur % b.valeur === 0) {
      lpossibles.push(a.divise(b));
    }
  } else {
    lpossibles.push(b.moins(a));
    if (a.valeur !== 0 && a.valeur !== 1 && b.valeur % a.valeur === 0) {
      lpossibles.push(b.divise(a));
    }
  }
  if (b.valeur !== 1 && a.valeur !== 1 && b.valeur !== 0 && a.valeur !== 0) {
    lpossibles.push(a.fois(b));
  }

  return lpossibles;
}

export const testPossible = () => {
  let plaque1 = new Plaque(3);
  let plaque2 = new Plaque(6);
  let plaque3 = new Plaque(6);
  let plaque4 = new Plaque(7);
  let plaque5 = new Plaque(50);
  let plaque6 = new Plaque(50);
  let but = 140;
  const resultats = []; //possibilites(plaque1, plaque2);
  compte(
    [plaque1, plaque2, plaque3, plaque4, plaque5, plaque6],
    but,
    resultats,
    [Number.MAX_SAFE_INTEGER]
  );
  resultats.forEach((resultat, index) => console.log(index + resultat));
};

export function compte(
  plaques,
  but,
  listeResultat,
  meilleur = [Number.MAX_SAFE_INTEGER]
) {
  if (meilleur[0] !== 0) {
    plaques.forEach((plaque) => {
      if (!(plaque in listeResultat)) {
        const index = Math.abs(plaque.valeur - but);
        if (index <= meilleur[0]) {
          if (listeResultat[index] != null) {
            listeResultat[index].push(plaque);
          } else {
            listeResultat[index] = [plaque];
            meilleur[0] = index;
          }
        }
      }
    });
    if (plaques.length === 1) {
      return;
    }
    for (
      let indexPlaque1 = 0;
      indexPlaque1 < plaques.length - 1;
      indexPlaque1++
    ) {
      for (
        let indexPlaque2 = indexPlaque1 + 1;
        indexPlaque2 < plaques.length;
        indexPlaque2++
      ) {
        let plaque1 = plaques[indexPlaque1];
        let plaque2 = plaques[indexPlaque2];

        let combinaison = possibilites(plaque1, plaque2);
        // eslint-disable-next-line no-loop-func
        combinaison.forEach((plaque) => {
          const plaquesCopy = [...plaques];
          plaquesCopy.splice(indexPlaque1, 1);
          plaquesCopy.splice(indexPlaque2 - 1, 1);
          plaquesCopy.push(plaque);
          compte(plaquesCopy, but, listeResultat, meilleur);
        });
      }
    }
  }
}
