import React from 'react';
import strings from '../../../localization';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getError, hasError } from "../../../functions/Validation";
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography'

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  data,
  keyPress
}) => (
    <form id="login-form" onSubmit={onSubmit} action="#">
      <Box mt={2} border={1} borderRadius={16} className="mediaContainer">
        <Grid >
          <Box m={2}>
            <Grid item >
              <Typography variant="h6" component="h6" gutterBottom align="center">
                {strings.login.other}
              </Typography>
            </Grid>
          </Box>
          <Box m={2}>
            <Grid item >
              <Button component={Link} to={'/sign-up'} variant="contained" color="primary" fullWidth>
                <EmailIcon />{strings.login.googleSign}
              </Button>
            </Grid>
          </Box>
          <Box mt={2}>

          </Box>

        </Grid>
      </Box>


      <TextField
        label={strings.login.email}
        error={hasError(errors, 'email')}
        helperText={getError(errors, 'email')}
        fullWidth
        autoFocus
        name='email'
        onChange={onChange}
        onKeyPress={keyPress}
        margin="normal"
        value={data.email}
      />

      <TextField
        label={strings.login.password}
        error={hasError(errors, 'password')}
        helperText={getError(errors, 'password')}
        fullWidth
        name='password'
        type='password'
        onChange={onChange}
        onKeyPress={keyPress}
        margin="normal"
        value={data.password}
      />

      <Box mt={2}>
        <Grid>
          <Box mt={2}>
            <Grid item >
              <Link href="#" to={'/#'} onClick={(event) => event.preventDefault()}>
                {strings.login.forgetPasswordMsg}
              </Link>
            </Grid>
          </Box>
          <Box mt={1}>
            <Grid item >
              <Link to={'/sign-up'}  >
                {strings.login.signUpMsg}
              </Link>

              {/* <Typography align="center" >
                  <Link to={'/sign-up'}  >
                   {strings.login.signUpMsg}
                  </Link> 
                </Typography>       */}
            </Grid>
          </Box>

        </Grid>
      </Box>

      <div className='submit-container'>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          {strings.login.login}
        </Button>
      </div>
    </form>
  );

export default LoginForm;