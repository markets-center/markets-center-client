import { TextField } from "@material-ui/core";
import { Box, Button, Rating, } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, } from "react-redux";
import { useAuth } from "../../../context/AuthContext";
import { createProductReview } from "../../../redux/actions/a.products";
import { Navigate } from "react-router-dom";
import { } from "../../Alert/success";
import { delAlert, setAlert } from "../../../redux/actions/a.alert";
import { userHistory } from "../../../redux/actions/a.users";


function validate(input) {
    let errors = {};
    if (input.comment === '') errors.comment = 'Comment is required';
    return errors;
}

export default function AddReview({ id, setOpen, reviews }) {
    const { oneUser, currentUser } = useAuth();
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    // const alert = useSelector((state) => state.alert);

    const [input, setInput] = useState({
        user: oneUser._id,
        rating: 0,
        comment: ""
    })
    const [error, setError] = useState({ comment: "" })
    useEffect(() => {
        Object.keys(error).length > 0 ? setDisabled(true) : setDisabled(false)

    }, [error])
    if (!currentUser) {
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
    function handleClose() {
        dispatch(delAlert());
        setOpen(false);

    }

    async function handleSubmit(e) {
        if (reviews.find(u => u.user === oneUser._id)) {
            handleClose();
            return dispatch(setAlert('Ya has realizado una reseña'))
        }
        await dispatch(createProductReview(id, input, currentUser));
        handleClose();
        setInput({
            rating: 0,
            comment: ""
        });
        dispatch(setAlert('Reseña creada correctamente'))
        dispatch(userHistory(oneUser._id, currentUser));
    }

    return (
        <Box display="flex"
            justifyContent="center"
            flexDirection={'column'}
            alignItems="center"
            component={'form'}>
            <h2>Agregar reseña</h2>
            <TextField label="Comentario" variant="filled" multiline rows={3} error={!!error.comment}
                name="comment" value={input.comment} onChange={handleChange} />
            <h5>Rating</h5>
            <Rating
                precision={0.5}
                size="large"
                name="rating"
                value={input.rating}
                onChange={handleChange}
            />
            <Button variant="contained" style={{ width: "25%", marginTop: "10px" }} onClose={handleClose} onClick={(e) => handleSubmit(e)}
                disabled={disabled} component="span">Agregar</Button>
        </Box>
    )
}
