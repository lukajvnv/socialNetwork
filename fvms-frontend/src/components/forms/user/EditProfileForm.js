import React from 'react';
import strings from '../../../localization';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { getError, hasError } from "../../../functions/Validation";
import Box from '@material-ui/core/Box';

import { splitDatePartFromString } from "../../../util/DateUtil";
import ProfileEditAttributes from "../../../pages/user/profile/edit/ProfileEditAttributes";


const EditProfileForm = ({
    onSubmit,
    onChange,
    onChangeButtonGroup,
    errors,
    data,
    keyPress,
    usersAttributesDataSource
}) => {

    return (
        <form id="editProfileForm" onSubmit={onSubmit} action="#">
            <TextField
                label={strings.signUp.firstName}
                error={hasError(errors, 'firstName')}
                helperText={getError(errors, 'firstName')}
                fullWidth
                autoFocus
                name='firstName'
                onChange={onChange}
                onKeyPress={keyPress}
                margin="normal"
                value={data.firstName}
            />

            <TextField
                label={strings.signUp.lastName}
                error={hasError(errors, 'lastName')}
                helperText={getError(errors, 'lastName')}
                fullWidth
                autoFocus
                name='lastName'
                onChange={onChange}
                onKeyPress={keyPress}
                margin="normal"
                value={data.lastName}
            />

            <TextField
                label={strings.signUp.birthday}
                error={hasError(errors, 'birthday')}
                helperText={getError(errors, 'birthday')}
                fullWidth
                autoFocus
                name='birthday'
                type="date"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                value={splitDatePartFromString(data.birthday)}
                onChange={onChange}
                onKeyPress={keyPress}
            />
            <Box mt={2}>
                <FormControl component="div" fullWidth >
                    <FormLabel component="span">{strings.profile.gender}</FormLabel>
                    <RadioGroup aria-label="gender" name="gender" value={data.gender} onChange={onChangeButtonGroup} row>
                        <FormControlLabel value="Female" control={<Radio />} label={strings.signUp.gender.female} />
                        <FormControlLabel value="Male" control={<Radio />} label={strings.signUp.gender.male} />
                        <FormControlLabel value="Other" control={<Radio />} label={strings.signUp.gender.other} />
                    </RadioGroup>
                </FormControl>
            </Box>

            <TextField
                label={strings.profile.occupation}
                error={hasError(errors, 'occupation')}
                helperText={getError(errors, 'occupation')}
                fullWidth
                autoFocus
                name='occupation'
                onChange={onChange}
                onKeyPress={keyPress}
                margin="normal"
                value={data.occupation}
            />

            <TextField
                label={strings.profile.address}
                error={hasError(errors, 'address')}
                helperText={getError(errors, 'address')}
                fullWidth
                autoFocus
                name='address'
                onChange={onChange}
                onKeyPress={keyPress}
                margin="normal"
                value={data.address}
            />

            <TextField
                label={strings.profile.about}
                error={hasError(errors, 'about')}
                helperText={getError(errors, 'about')}
                fullWidth
                autoFocus
                name='about'
                onChange={onChange}
                onKeyPress={keyPress}
                margin="normal"
                value={data.about}
                multiline
                rows='3'
            />

            <ProfileEditAttributes 
                usersAttributes={data.usersAttributes} 
                attributesDataSource={usersAttributesDataSource}
            />

            <div className='submit-container'>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    {strings.profile.form.submit}
                </Button>
            </div>
        </form>
    );
}

export default EditProfileForm;