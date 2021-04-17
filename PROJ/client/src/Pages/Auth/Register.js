import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import validator from 'validator';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");



  const handleOnSubmit = async event => {
    event.preventDefault();
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setPasswordConfirmationError(null);

    let errors = 0;

    if(!name) {
        setNameError("Name is required");
        errors++;
    }

    if(!validator.isEmail(email)) {
        setEmailError("Email must be in correct format xyz@abc.com");
        errors++;
    }

    if(!password) {
        setPasswordError("Password is required");
        errors++;

    }

    if(password !== passwordConfirmation){
        setPasswordConfirmationError("Passwords don't match");
        errors++;
    }

    if(errors){
        return;
    }

    const data = {
        name,
        email,
        password
    };

    try{
          await axios.post('/api/auth/register', data); 
    } catch(e){
        const message = e.response.data.message;
        if(message === "email_already_exists"){
          setEmailError("User with this email already exists");
        }
    }
};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit = {handleOnSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            value = {name}
            onChange = {e => setName(e.target.value)}
            error = {!!nameError}
            helperText = {nameError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value = {email}
            onChange = {e => setEmail(e.target.value)}
            error = {!!emailError}
            helperText = {emailError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value = {password}
            onChange = {e => setPassword(e.target.value)}
            error = {!!passwordError}
            helperText = {passwordError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value = {passwordConfirmation}
            onChange = {e => setPasswordConfirmation(e.target.value)}
            error = {!!passwordConfirmationError}
            helperText = {passwordConfirmationError}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}
