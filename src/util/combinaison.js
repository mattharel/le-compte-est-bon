function possibilites(a, b) {
  const lpossibles = [];
  lpossibles.push(a.plus(b));
  if (a.valeur > b.valeur) {
    // abs(a-b)==abs(b-a) donc inutile d'avoir les deux
    // a == b -> a-b == 0 -> aucun interet
    lpossibles.push(a.moins(b));
    if (b.valeur !== 0 && b.valeur !== 1 && a.valeur % b.valeur === 0) {
      // division par zero et division par 1 inutile
      lpossibles.push(a.divise(b));
    }
  } else {
    lpossibles.push(b.moins(a));
    if (a.valeur !== 0 && a.valeur !== 1 && b.valeur % a.valeur === 0) {
      lpossibles.push(b.divise(a));
    }
  }
  if (b.valeur !== 1 && a.valeur !== 1 && b.valeur !== 0 && a.valeur !== 0) {
    // multiplication par 1 inutile, par 0 aussi
    lpossibles.push(a.fois(b));
  }
  return lpossibles;
}

export function compte(
  plaques,
  but,
  listeResultat,
  nombreDAppel = [0],
  meilleur = [Number.MAX_SAFE_INTEGER]
) {
  nombreDAppel[0]++;
  // En recursif Tant que le meilleur resultat n'a pas 0 d'ecart avec le but on continue
  // sauf si plaques restante == 1 voir plus bas
  if (meilleur[0] !== 0) {
    //On regarde si chacune des plaques est le resultat sinon on enregistre le meilleur resultat
    plaques.forEach((plaque) => {
      if (!(plaque in listeResultat)) {
        const index = Math.abs(plaque.valeur - but);
        if (index <= meilleur[0]) {
          // Si on veut tout l'espace d'etat on enleve le if du dessus
          // Si on veut tout les resultats parfait on enleve le premier if et le prochain if s'occupe du reste
          if (listeResultat[index] != null) {
            listeResultat[index].push(plaque);
          } else {
            listeResultat[index] = [plaque];
            meilleur[0] = index;
          }
        }
      }
    });
    // En recursif si il nous reste qu'une plaque, plus aucune combinaison est possible on remonte le noeud
    if (plaques.length === 1) {
      return;
    }
    // Sinon on compare chaque plaque deux a deux
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
        // On fait toutes les combinaisons possibles pour ces plaques, on
        // On les retires de l'espace d'etat
        // Et on explore chacun des nouveaux noeud
        let combinaison = possibilites(plaque1, plaque2);
        // eslint-disable-next-line no-loop-func
        combinaison.forEach((plaque) => {
          const plaquesCopy = [...plaques];
          plaquesCopy.splice(indexPlaque1, 1);
          plaquesCopy.splice(indexPlaque2 - 1, 1);
          plaquesCopy.push(plaque);
          compte(plaquesCopy, but, listeResultat, nombreDAppel, meilleur);
        });
      }
    }
  }
}
