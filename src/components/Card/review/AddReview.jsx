import {TextField} from "@material-ui/core";
import {Box, Button, Rating, Snackbar} from "@mui/material";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useAuth} from "../../../context/AuthContext";
import {createProductReview} from "../../../redux/actions/a.products";
import {Navigate} from "react-router-dom";
import {SnackbarAlert} from "../../Alert/success";
import {delAlert} from "../../../redux/actions/a.alert";

function validate(input) {
    let errors = {};
    if (input.comment === '') errors.comment = 'Comment is required';
    return errors;
}

export default function AddReview({id, children}) {
    const {oneUser,currentUser} = useAuth();

    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const alert = useSelector((state) => state.alert);

    const [input, setInput] = useState({
        user: oneUser._id,
        rating: 0,
        comment: ""
    })
    const [error, setError] = useState({comment: ""})
    useEffect(() => {
        Object.keys(error).length > 0 ? setDisabled(true) : setDisabled(false)

    }, [error])
    if(!currentUser){
        return <Navigate to='/Login' replace />;
    }

    function handleChange(e) {
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        dispatch(createProductReview(id, input));
        setInput({
            rating: 0,
            comment: ""
        });
    }
    function handleClose(){
        dispatch(delAlert())
    }

    return (
        <Box display="flex"
             justifyContent="center"
             flexDirection={'column'}
             alignItems="center"
             component={'form'}>
            <h2>Agregar reseña</h2>
            <TextField label="Comentario" variant="filled" multiline rows={3} error={!!error.comment}
                       name="comment" value={input.comment} onChange={handleChange}/>
            <h5>Rating</h5>
            <Rating
                precision={0.5}
                size="large"
                name="rating"
                value={input.rating}
                onChange={handleChange}
            />
            <Button variant="contained" style={{width: "25%", marginTop: "10px"}} onClick={(e) => handleSubmit(e)}
                    disabled={disabled} component="span">Agregar</Button>

            <Snackbar open={!!alert} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}>
                <SnackbarAlert onClose={handleClose} color='primary' variant='filled' severity='success'>
                    {alert}
                </SnackbarAlert>
            </Snackbar>
        </Box>
    )
}
