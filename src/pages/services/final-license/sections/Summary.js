import React from 'react';
import {
    Divider,
    Grid,
    InputAdornment,
    FormControl,
    Typography,
    FormControlLabel,
    Link,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { FieldArray } from "react-final-form-arrays";
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Checkbox } from 'final-form-material-ui';
import finalLicenseFieldSchema from '../models/finalLicenseFieldSchema';
import TermsContent from './TermsContent';
import TermsDialog from 'src/components/TermsDialog';

const contentField = ({ input: { value, name }, label, type, inputType }) => (
    <>
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {label}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
            {inputType !== 'Select' && inputType !== 'Radio' ? value : getFieldValue({ name, value })}
        </Typography>
    </>
)
// const CustomTableCell = ( { input: { value } }) => (
//     <>
//       <TableCell component="th" scope="row">
//         {value}
//       </TableCell>
//     </>
//   )
const termsLabel = (openDialog) => (
    <>
        <Typography gutterBottom variant="h5" component="span">
            انا اقر واتعهد بالالتزام بالشروط والاحكام الواردة والمتعلقه بالطلب
            <Link href="#" sx={{ color: '#147fbd' }} onClick={() => openDialog()}> (للاطلاع على الشروط والاحكام انقر هنا)</Link>
        </Typography>

    </>
)
const getFieldValue = ({ name, value }) => {
    console.log("name", name);
    console.log("value", value)
    if (value == '')
        return '';
    const filredFinal = finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.name === name);
    console.log("filredFinal/////////////////////////////", filredFinal)
    if (filredFinal.length > 0) {
        const filteredvalue = filredFinal[0].options.filter(option => option.value == value);
        console.log("I'm Here in", name,);
        if (filteredvalue.length > 0)
            return filteredvalue[0].label.ar;
    }
    return '';
}

const Summary = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (dialogContent, dialogTitle) => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };
    return (
        <>
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                معلومات المركز
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "CenterDetails" && !fintalLicense.dependOn).map(filteredFinalLicense => (
                    <Grid
                        item
                        key={filteredFinalLicense.id}
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <Field
                            label={filteredFinalLicense.label.ar}
                            name={filteredFinalLicense.name}
                            component={contentField}
                            inputType={filteredFinalLicense.type}
                        />
                    </Grid>
                ))}
            </Grid>
            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                الطاقة الإستعابية
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "Capacity" && !fintalLicense.dependOn).map(filteredFinalLicense => (
                    <Grid
                        item
                        key={filteredFinalLicense.id}
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <Field
                            label={filteredFinalLicense.label.ar}
                            name={filteredFinalLicense.name}
                            component={contentField}
                            inputType={filteredFinalLicense.type}
                        />
                    </Grid>
                ))}
            </Grid>

            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                المتطلبات
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                <Grid
                    item
                    key={filteredFinalLicense.id}
                    lg={6}
                    md={6}
                    xs={12}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudDownloadIcon />}
                        onClick={() => downloadFileFn(request.licenseDoc, request.name, request.licenceNumber)}
                    >
                        تنزيل 
</Button>

                </Grid>

            </Grid>
            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                معلومات الكوادر
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                {/* {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "staffInfo" && !fintalLicense.dependOn).map(filteredFinalLicense => ( */}
                <Grid
                    item
                    // key={filteredFinalLicense.id}
                    lg={12}
                    md={12}
                    xs={12}
                >

                    {/* ///////////////////////////////////////////// */}

                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell> الاسم الكامل </TableCell>
                                    <TableCell> رقم الهوية/الاإقامة </TableCell>
                                    <TableCell> نوع الكادر </TableCell>
                                    <TableCell> الجنس </TableCell>
                                    <TableCell> الجنسية</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <FieldArray name="customers">

                                    {({ fields }) => fields.value.map((name, index) => (
                                        <TableRow key={name}>
                                            {console.log("fields", fields.value)}

                                            <TableCell component="th" scope="row">
                                                {name.fullName}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {name.idNumber ? name.idNumber : name.iqamaNo}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {name.staffTypes}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {name.gender}
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                {name.nationality}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </FieldArray>
                            </TableBody>
                        </Table>
                    </TableContainer>



                    {/* //////////////////////////////////////////////////// */}



                </Grid>

                {/* } */}
            </Grid>

            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                الخدمات الضحية
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "HealthServices" && !fintalLicense.dependOn).map(filteredFinalLicense => (
                    <Grid
                        item
                        key={filteredFinalLicense.id}
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <Field
                            label={filteredFinalLicense.label.ar}
                            name={filteredFinalLicense.name}
                            component={contentField}
                            inputType={filteredFinalLicense.type}
                        />
                    </Grid>
                ))}
            </Grid>
            <Divider />
            <Grid
                container
                lg={12}
                md={12}
                xs={12}
                mt={3}
            >
                <Field name="agree" mt={3}>
                    {({ meta }) => ( // eslint-disable-line no-unused-vars
                        <FormControl component="fieldset" error={meta.error} required>
                            <FormControlLabel
                                label={termsLabel(handleClickOpen)}
                                control={
                                    <Field
                                        name="agree"
                                        component={Checkbox}
                                        type="checkbox"
                                        value="true"
                                    />
                                }
                            />
                        </FormControl>
                    )}
                </Field>
            </Grid>
            <TermsDialog dialogContent={TermsContent()} dialogTitle={"التعهد"} open={open} onClose={handleClose} acceptBtnName="اوافق" />
        </>
    )
}

export default Summary;
// Summary.propTypes = {
// 	value: PropTypes.func.isRequired,
// };


