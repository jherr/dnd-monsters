import React, { useState, useEffect, useDeferredValue } from 'react';
import ReactDOM from 'react-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import createKDTree from 'static-kdtree';

import monsters from './data/monsters.json';

const labels = {
  hit_points: "HP",
  max_damage: "Max Damage",
  strength: "Strengh",
  dexterity: "Dexterity",
  constitution: "Constitution",
  intelligence: "Intelligence",
  wisdom: "Wisdom",
  charisma: "Charisma",
  challenge_rating: "Challenge"
};

const fields = Object.keys(monsters[0])
  .filter(k => k !== 'name');
const ranges = {};
fields.forEach(k => { ranges[k] = { min: 10000, max: 0 }; });
monsters.forEach(monster => {
  fields.forEach(k => {
    ranges[k].min = Math.min(monster[k], ranges[k].min);
    ranges[k].max = Math.max(monster[k], ranges[k].max);
  });
});

const tree = createKDTree(
  monsters.map(monster => fields.map(f => monster[f]))
);

const startMonster = monsters.filter(({ name }) => name === 'Skeleton')[0];

const BoldCell = withStyles({
  root: {
    fontWeight: 'bold',
  }
})(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 520,
  },
});

function App() {
  const classes = useStyles();
  const [state, setState] = useState({
    monster: startMonster,
    values: { ...startMonster },
  });
  const [found, setFound] = useState([]);
  const deferredState = useDeferredValue(state);

  const change = (evt, monster) => {
    setState({
      ...state,
      monster,
      values: {
        ...monster,
      }
    });
  }
  const setValue = (field, value) => {
    setState({
      ...state,
      values: {
        ...state.values,
        [field]: value,
      },
    });
  }

  useEffect(() => {
    const res = tree.knn(fields.map(f => deferredState.values[f]), 20)
      .map(i => monsters[i]);
    setFound(res);
  }, [deferredState]);

  return (
    <Grid container spacing={3}>
      <Grid item md={3} xs={12}>
        <Autocomplete
          id="combo-box-demo"
          value={state.monster}
          options={monsters}
          getOptionLabel={option => option.name}
          onChange={change}
          renderInput={params => (
            <TextField {...params} label="Monster" fullWidth />
          )}
        />
        <br style={{ margin: '1em' }}/>
        {fields.map(f => (
          <div key={f}>
            <Typography id="discrete-slider" gutterBottom>
              {labels[f]}
            </Typography>
            <PrettoSlider
              value={state.values[f]}
              onChange={(evt, value) => setValue(f, value)}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              min={ranges[f].min}
              max={ranges[f].max}
            />
          </div>
        ))}
      </Grid>
      <Grid item md={9} xs={12}>
        <TableContainer component={Paper} className={classes.container}>
          <Table stickyHeader aria-label="monster table">
            <TableHead>
              <TableRow>
                <BoldCell>Name</BoldCell>
                {fields.map(f => (
                  <BoldCell align="center" key={f}>{labels[f]}</BoldCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {found.map(monster => (
                <StyledTableRow key={monster.name}>
                  <BoldCell>
                    {monster.name}
                  </BoldCell>
                  {fields.map(f => (
                    <TableCell align="center" key={`${monster.name}:${f}`}>{monster[f]}</TableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)