import React from 'react';
import strings from '../../../localization';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getError, hasError} from "../../../functions/Validation";

const ResetPasswordRequestForm = ({
                       onSubmit,
                       onChange,
                       errors,
                       data,
                       keyPress
                   }) => (
    <form id="login-form" onSubmit={ onSubmit } action = "#">
        <TextField
            label={ strings.resetPassword.email }
            error={ hasError(errors, 'email') }
            helperText={ getError(errors, 'email') }
            fullWidth
            autoFocus
            name='email'
            onChange={ onChange }
            onKeyPress={ keyPress }
            margin="normal"
            value={ data.email }
        />
        <div className='submit-container'>
            <Button variant="contained" color="primary" onClick={ onSubmit }>
                { strings.resetPassword.resetPassword }
            </Button>
        </div>
    </form>
);

export default ResetPasswordRequestForm;