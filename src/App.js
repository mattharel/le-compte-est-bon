import logo from "./logo.svg";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { testPossible, compte } from "./util/combinaison";
import {
  Container,
  TextField,
  Grid,
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from "@material-ui/core";

import { useState } from "react";
import { Plaque } from "./model/plaque";
import "./App.css";
function App() {
  const [plaque1Valeur, setPlaque1Valeur] = useState(3);
  const [plaque2Valeur, setPlaque2Valeur] = useState(6);
  const [plaque3Valeur, setPlaque3Valeur] = useState(6);
  const [plaque4Valeur, setPlaque4Valeur] = useState(7);
  const [plaque5Valeur, setPlaque5Valeur] = useState(50);
  const [plaque6Valeur, setPlaque6Valeur] = useState(50);
  const [but, setBut] = useState(140);
  const [bestResult, setBestResult] = useState(null);
  const handleCompte = () => {
    let plaque1 = new Plaque(plaque1Valeur);
    let plaque2 = new Plaque(plaque2Valeur);
    let plaque3 = new Plaque(plaque3Valeur);
    let plaque4 = new Plaque(plaque4Valeur);
    let plaque5 = new Plaque(plaque5Valeur);
    let plaque6 = new Plaque(plaque6Valeur);
    let resultsTmp = [];
    compte(
      [plaque1, plaque2, plaque3, plaque4, plaque5, plaque6],
      but,
      resultsTmp
    );
    console.log(resultsTmp);
    let best = null;
    for (let index = 0; index < resultsTmp.length || !best; index++) {
      if (resultsTmp[index] && resultsTmp[index].length > 0) {
        best = resultsTmp[index][0];
        setBestResult(best);
        break;
      }
    }
  };
  const handleRandom = () => {
    const initPlaques = [
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      10,
      10,
      25,
      25,
      50,
      50,
      75,
      75,
      100,
      100,
    ];
    const plaquesChoisies = [];
    for (let index = 0; index < 6; index++) {
      const plaqueRandom = initPlaques.splice(
        Math.floor(Math.random() * (initPlaques.length - 1)),
        1
      );
      plaquesChoisies.push(plaqueRandom);
    }
    setPlaque1Valeur(plaquesChoisies[0]);
    setPlaque2Valeur(plaquesChoisies[1]);
    setPlaque3Valeur(plaquesChoisies[2]);
    setPlaque4Valeur(plaquesChoisies[3]);
    setPlaque5Valeur(plaquesChoisies[4]);
    setPlaque6Valeur(plaquesChoisies[5]);
    setBut(100 + Math.floor(Math.random() * 899));
  };
  return (
    <Container maxWidth="sm" className="container">
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            label="Plaque 1"
            value={plaque1Valeur}
            type="number"
            onChange={(e) => setPlaque1Valeur(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Plaque 1"
            value={plaque1Valeur}
            type="number"
            onChange={(e) => setPlaque1Valeur(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Plaque 2"
            type="number"
            value={plaque2Valeur}
            onChange={(e) => setPlaque2Valeur(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Plaque 3"
            value={plaque3Valeur}
            type="number"
            onChange={(e) => setPlaque3Valeur(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Plaque 4"
            value={plaque4Valeur}
            type="number"
            onChange={(e) => setPlaque4Valeur(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Plaque 5"
            value={plaque5Valeur}
            type="number"
            onChange={(e) => setPlaque5Valeur(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Plaque 6"
            value={plaque6Valeur}
            type="number"
            onChange={(e) => setPlaque6Valeur(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="But"
            fullWidth
            value={but}
            type="number"
            onChange={(e) => setBut(parseInt(e.target.value))}
          />
        </Grid>
        <Grid xs={12} item>
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="center"
            spacing={3}
          >
            <Grid xs={4} item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleRandom()}
              >
                Remplissage automatique
              </Button>
            </Grid>
            <Grid xs={4} item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleCompte()}
              >
                Le compte est bon
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} item>
          <Grid container alignItems="center" direction="row" justify="center">
            {bestResult && (
              <Typography variant="overline">
                Meilleur resultat, {bestResult.valeur} ={" "}
                <InlineMath math={bestResult.latex} />
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid xs={12} item>
          {bestResult && (
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="heading">Étapes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="overline">
                  <p style={{ whiteSpace: "pre-line" }}>
                    {bestResult.debugCalculus}
                  </p>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
