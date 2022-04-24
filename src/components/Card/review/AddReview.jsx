import { TextField } from "@material-ui/core";
import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactStars from 'react-rating-stars-component';
import { useDispatch } from "react-redux";
import { useAuth } from "../../../context/AuthContext";
import { createProductReview } from "../../../redux/actions/a.products";


function validate(input) {
    let errors = {};
    if (input.comment === '') errors.comment = 'Comment is required';

    return errors;
}

export default function AddReview({ id }) {
    const { currentUser } = useAuth()
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [star, setStar] = useState(0);
    const [input, setInput] = useState({
        product: id,
        user: currentUser.uid,
        rating: star,
        comment: ""
    })
    const [error, setError] = useState({ comment: "" })
    useEffect(() => {
        Object.keys(error).length > 0 ? setDisabled(true) : setDisabled(false)
    }, [error])
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
    function handleStar(e) {
        setStar(e);
    }
    function handleSubmit(e) {
        dispatch(createProductReview(input.product, input));
        alert('Reseña creada correctamente')
        setInput("");
    }

    return (
        <Box display="flex"
            justifyContent="center"
            flexDirection={'column'}
            alignItems="center"
            component={'form'}>
            <h2>Agregar reseña</h2>
            <TextField label="Comentario" variant="filled" multiline rows={3} error={error.comment ? true : false} name="comment" value={input.comment} onChange={handleChange} />
            <h5>Rating</h5>
            <ReactStars
                edit={true}
                count={5}
                value={star}
                size={24}
                activeColor="#ffd700"
                emptyIcon={<i className='fa fa-star' />}
                halfIcon={<i className='fa fa-star-half-alt' />}
                filledIcon={<i className='fa fa-star' />}
                onChange={handleStar}
            />
            <Button variant="contained" style={{ width: "25%", marginTop: "10px" }} onClick={(e) => handleSubmit(e)} disabled={disabled} component="span" >Agregar</Button>
        </Box>
    )
}
