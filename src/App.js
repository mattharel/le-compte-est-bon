import logo from "./logo.svg";
import { initPlaques, NOMBRE_PLAQUE } from "./util/constant";
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
  Select,
  MenuItem,
  Paper,
  Avatar,
  Fab,
  Divider,
} from "@material-ui/core";

import { useState } from "react";
import { Plaque } from "./model/plaque";
import "./App.css";
function App() {
  const [but, setBut] = useState(140);
  const [bestResult, setBestResult] = useState(null);
  const [espaceExplore, setEspaceExplore] = useState(null);
  const [tempsTotal, setTempsTotal] = useState(null);

  const [plaquesSelectionnes, setPlaquesSelectionnees] = useState([
    4,
    11,
    12,
    13,
    22,
    23,
  ]);

  const handleFABPlaqueChange = (index) => {
    const newSelection = [...plaquesSelectionnes];

    if (plaquesSelectionnes.includes(index)) {
      newSelection.splice(newSelection.indexOf(index), 1);
    } else {
      if (plaquesSelectionnes.length >= NOMBRE_PLAQUE) {
        newSelection.shift();
      }
      newSelection.push(index);
    }
    setPlaquesSelectionnees(newSelection);
  };
  const handleCompte = () => {
    const plaques = [];
    for (let index = 0; index < NOMBRE_PLAQUE; index++) {
      plaques.push(new Plaque(initPlaques[plaquesSelectionnes[index]]));
    }
    let resultsTmp = [];
    let nombreDAppel = [0];
    const debut = Date.now();
    compte(plaques, but, resultsTmp, nombreDAppel);
    setTempsTotal(Date.now() - debut);
    let best = null;
    for (let index = 0; index < resultsTmp.length || !best; index++) {
      if (resultsTmp[index] && resultsTmp[index].length > 0) {
        best = resultsTmp[index][0];
        setBestResult(best);
        break;
      }
    }
    setEspaceExplore(nombreDAppel[0]);
  };

  const handleRandom = () => {
    const plaquesChoisies = [];
    const echantillion = [...initPlaques];
    for (let index = 0; index < NOMBRE_PLAQUE; index++) {
      let plaqueRandom;
      do {
        plaqueRandom = Math.floor(Math.random() * (echantillion.length - 1));
      } while (plaquesChoisies.includes(plaqueRandom));
      plaquesChoisies.push(plaqueRandom);
    }
    setPlaquesSelectionnees(plaquesChoisies);
    setBut(100 + Math.floor(Math.random() * 899));
  };
  return (
    <Container maxWidth="sm" className="container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            direction="row"
            justify="center"
          >
            {initPlaques.map((plaque, index) =>
              plaquesSelectionnes.includes(index) ? (
                <Grid key={index} item xs={"auto"}>
                  <Fab
                    key={index}
                    aria-label={plaque}
                    onClick={() => handleFABPlaqueChange(index)}
                    color={"primary"}
                  >
                    {plaque}
                  </Fab>
                </Grid>
              ) : (
                ""
              )
            )}
          </Grid>
        </Grid>

        <Divider />
        <Grid item xs={12}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            direction="row"
            justify="center"
          >
            {initPlaques.map((plaque, index) =>
              plaquesSelectionnes.includes(index) ? (
                ""
              ) : (
                <Grid key={index} item xs={"auto"}>
                  <Fab
                    key={index}
                    aria-label={plaque}
                    onClick={() => handleFABPlaqueChange(index)}
                    color={"default"}
                  >
                    {plaque}
                  </Fab>
                </Grid>
              )
            )}
          </Grid>
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
                Tirage aléatoire
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
                <InlineMath math={bestResult.latex} />. Espace exploré :{" "}
                {espaceExplore} états visités en {tempsTotal} ms.
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
