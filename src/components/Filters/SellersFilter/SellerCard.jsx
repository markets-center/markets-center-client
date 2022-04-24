import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';
import s from './SellerCard.module.css'
import { useDispatch } from 'react-redux';
import { filterBySellerAndCategories, idActiveSeller} from '../../../redux/actions/a.products';

const SellerCard = ({ image, name, id }) => {


    const dispatch = useDispatch()

    function handleSelect(e){
        e.preventDefault();
        console.log(id)
        dispatch(filterBySellerAndCategories(id,""))
        dispatch(idActiveSeller(id))
        

    }

    return (
        <div onClick={handleSelect}>
            <Container sx={{
                marginTop: '10px',
                height: '100px',
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'space-around',
                cursor: 'pointer',
                flexDirection: 'column'
            }}
            className={s.container}>
                <Avatar
                    alt=''
                    src={image? image : '/broken-image.jpg'}
                    sx={{ width: 80, height: 80 }}
                />
                <Typography variant="body2" sx={{
                        textAlign: 'center',
                }}>
                    {name}
                    </Typography>
            </Container>
        </div>
    );
};

export default SellerCard;