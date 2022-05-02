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
        dispatch(filterBySellerAndCategories(id,""))
        dispatch(idActiveSeller(id))
        

    }

    return (
        <div onClick={handleSelect}>
            <Container sx={{
                marginTop: '10px',
                height: 'auto',
                paddingTop: '5px',
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'space-around',
                cursor: 'pointer',
                flexDirection: 'column',
            }}
            className={s.container}>
                <Avatar
                    alt=''
                    src={image? image : '/broken-image.jpg'}
                    sx={{ width: 100, height: 100 }}
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