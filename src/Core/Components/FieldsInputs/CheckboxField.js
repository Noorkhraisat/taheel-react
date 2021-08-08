import { Field } from 'react-final-form';
import {
    FormControl,
    FormControlLabel,
    Typography,
} from '@material-ui/core';
import { Checkbox } from 'final-form-material-ui';
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core';

export default function CheckboxField(props) {
    let gridSize = !!props.gridSize ? props.gridSize : 12;

    return (
        <Grid
            item
            md={6}
            xs={gridSize}
            className="custom-label-field"
        >
            <Typography>
                {props.tLabel}
            </Typography>
            {!!props.options ? (props.options.map((option, idx) => (
                <Grid
                    item
                    md={6}
                    xs={gridSize}
                    key={idx}
                    className="custom-label-field"
                >
                    <Field key={idx} name={props.name.concat('[' + option.value + ']')} mt={3}>
                        {({ meta }) => ( // eslint-disable-line no-unused-vars
                            <FormControl key={idx} component="fieldset" error={meta.error} required>
                                <FormControlLabel
                                    key={idx}
                                    label={option.label.ar}
                                    control={
                                        <Field
                                            key={idx}
                                            name={props.name.concat('[' + option.value + ']')}
                                            component={Checkbox}
                                            type="checkbox"
                                        />
                                    }
                                />
                            </FormControl>
                        )}
                    </Field>
                </Grid>
            ))) : (
                <Field name={props.name} mt={3}>
                    {({ meta }) => ( // eslint-disable-line no-unused-vars
                        <FormControlLabel
                            label={props.tLabel}
                            control={
                                <Field
                                    name={props.name}
                                    component={Checkbox}
                                    type="checkbox"
                                />
                            }

                        />
                    )}
                </Field>
            )}
        </Grid>
    )
}
CheckboxField.propTypes = {
    tLabel: PropTypes.string,
    gridSize: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    multiline: PropTypes.bool,
    values: PropTypes.object,
    options: PropTypes.array,
    onClick: PropTypes.func,
}