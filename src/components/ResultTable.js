import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  withStyles,
} from '@material-ui/core';
import { useRecoilState } from 'recoil';

import { labels, fields } from '../searchEngine';
import { foundAtom } from '../atoms';

const BoldCell = withStyles({
  root: {
    fontWeight: 'bold',
  },
})(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const ResultTable = () => {
  const [results] = useRecoilState(foundAtom);
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="Results table">
        <TableHead>
          <TableRow>
            <BoldCell>Name</BoldCell>
            {fields.map((f) => (
              <BoldCell align="center" key={f}>
                {labels[f]}
              </BoldCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result) => (
            <StyledTableRow key={result.name}>
              <BoldCell>{result.name}</BoldCell>
              {fields.map((f) => (
                <TableCell align="center" key={`${result.name}:${f}`}>
                  {result[f]}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
