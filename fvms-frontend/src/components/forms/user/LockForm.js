import React from 'react';
import strings from '../../../localization';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getError, hasError} from "../../../functions/Validation";

const LockForm = ({
                       onSubmit,
                       onChange,
                       errors,
                       data
                   }) => (
    <form id="lock-form" onSubmit={ onSubmit } action = "#">

        <TextField
            label={ strings.lock.password }
            error={ hasError(errors, 'password') }
            helperText={ getError(errors, 'password') }
            fullWidth
            name='password'
            type='password'
            onChange={ onChange }
            margin="normal"
            value={ data.password }
        />

        <div className='submit-container'>
            <Button variant="contained" color="primary" onClick={ onSubmit }>
                { strings.lock.unlock }
            </Button>
        </div>
    </form>
);

export default LockForm;