import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ComposedTextField() {
  const [name, setName] = React.useState('Composed TextField');
  const classes = useStyles();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Name</InputLabel>
        <FilledInput id="component-filled" value={name} onChange={handleChange} />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">username</InputLabel>
        <FilledInput id="component-filled" value={name} onChange={handleChange} />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">email</InputLabel>
        <FilledInput id="component-filled" value={name} onChange={handleChange} />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">sub-distric</InputLabel>
        <FilledInput id="component-filled" value={name} onChange={handleChange} />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">distric</InputLabel>
        <FilledInput id="component-filled" value={name} onChange={handleChange} />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">province</InputLabel>
        <FilledInput id="component-filled" value={name} onChange={handleChange} />
      </FormControl>

    </form>
  );
}
