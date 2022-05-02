import { Input, Button, TextField, Container } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import css from '../../components/Credentials/SignUp.module.css'
import { useAuth } from '../../context/AuthContext';
import logo from '../../images/Markets Center.svg'
import { postNewUser } from '../../redux/actions/a.users';
import { AddAPhoto } from "@mui/icons-material/";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import image from '../../images/signup.svg'

export default function BuyerForm2() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = createTheme();
    const { currentUser } = useAuth();
    const [disableForm, setDisableForm] = useState(true);
    const [fileInputState, setFileInputState] = useState('');
    const [selectedDate, handleDateChange] = useState(new Date());
    const [data, setData] = useState({ name: '', phone: "", IdDocument: "", address: "" });

    function handleImageChange(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setFileInputState(reader.result);
        };
    }


    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
        let flagDisable = true
        data.name !== '' && currentUser?.displayName !== '' ? flagDisable = true : flagDisable = false
        data.phone === '' ? flagDisable = true : flagDisable = false
        data.IdDocument === '' ? flagDisable = true : flagDisable = false
        data.address === '' ? flagDisable = true : flagDisable = false
        setDisableForm(() => flagDisable)
    }

    function validateForm(user) {
    }

    function handleSubmit(e) {
        e.preventDefault()
        let uploadImg;
        let img
        if (currentUser.photoURL) {
            uploadImg = false
            img = currentUser.photoURL
        } else {
            if (fileInputState) {
                uploadImg = true
                img = fileInputState
            }
        }
        let userData = {
            isAdmin: false,
            isSeller: false,
            uploadImg,
            name: currentUser?.displayName || data.name,
            userId: currentUser.uid,
            phone: data.phone,
            email: currentUser.email,
            IdDocument: data.IdDocument,
            address: data.address,
            delivery: false,
            image: img,
            dateOfBirth: selectedDate
        };
        validateForm(userData)
        dispatch(postNewUser(userData, currentUser));
        navigate('/');
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <div className={css.content_all}>
                    <div className={css.content_form}>
                        <img src={logo} alt="Logo MC" className={css.loguito} />
                        <h1 className={css.tittle}>Bienvenido{currentUser?.displayName && `, ${currentUser?.displayName}`}!</h1>
                        <h2 className={css.subtitle}>Por favor, completa los siguientes datos</h2>
                        <form onSubmit={handleSubmit} autoComplete="on">

                            {
                                !currentUser?.displayName &&
                                (<>
                                    <label className={css.label}>Nombre</label>
                                    <Input
                                        autoComplete='name'
                                        margin='normal'
                                        className={css.input}
                                        type="text"
                                        required
                                        id="name"
                                        label="Name"
                                        name="name"
                                        autoFocus
                                        onChange={handleChange}
                                    />
                                </>)
                            }
                            <label className={css.label}>Número de teléfono</label>
                            <Input
                                className={css.input}
                                autoComplete='tel'
                                type="number"
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Número de teléfono"
                                name="phone"
                                onChange={handleChange}
                                autoFocus
                            />
                            <label className={css.label}>DNI</label>
                            <Input
                                className={css.input}
                                autoComplete='number'
                                type="number"
                                margin="normal"
                                required
                                fullWidth
                                id="IdDocument"
                                label="DNI"
                                name="IdDocument"
                                onChange={handleChange}
                                autoFocus
                            />
                            <label className={css.label}>Dirección</label>
                            <Input
                                className={css.input}
                                autoComplete='off'
                                margin="normal"
                                required
                                fullWidth
                                id="address"
                                label="Dirección"
                                onChange={handleChange}
                                name="address"
                                autoFocus
                                style={{ marginBottom: '30px' }}
                            />
                            {!currentUser?.photoURL && (
                                <>
                                    <label style={{ marginBottom: '30px' }} htmlFor="contained-button-file">
                                        <Input
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={handleImageChange}
                                        />
                                        <Button
                                            variant="contained"
                                            component="span"
                                            style={{ width: "190px", marginRight: "10px", marginBottom: '30px' }}
                                            startIcon={<AddAPhoto />}
                                        >
                                            Foto de Perfil
                                        </Button>
                                    </label>
                                </>
                            )}
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Fecha de Nacimiento"
                                    inputFormat="dd/MM/yyyy"
                                    value={selectedDate}
                                    renderInput={(props) => (
                                        <TextField {...props} />
                                    )}
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={(date) => handleDateChange(date)}
                                />
                            </LocalizationProvider>
                            <Button
                                className={css.btn}
                                disabled={disableForm}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: 'white' }}
                            >
                                Guardar Datos
                            </Button>
                        </form>
                    </div>
                    <div className={css.content_image}>
                        <img className={css.image} src={image} alt='' />
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    )
}
