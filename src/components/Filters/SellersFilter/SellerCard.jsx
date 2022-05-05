import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import s from './SellerCard.module.css'
import { useDispatch } from 'react-redux';
import { filterBySellerAndCategories, idActiveSeller} from '../../../redux/actions/a.products';

const SellerCard = ({ image, name, id }) => {


    const dispatch = useDispatch()
    const category = useSelector(state => state.activeCategory)
    const idSeller = useSelector(state => state.activeSeller)
    function handleSelect(e){
        e.preventDefault();
        if(category === ''){
            dispatch(filterBySellerAndCategories(id,""))
            dispatch(idActiveSeller(id))
            
        }
        else{
            dispatch(filterBySellerAndCategories(id,category));
            dispatch(idActiveSeller(id))
        }
        

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
            className={idSeller === id?s.containerSelected : s.container}>
                <Avatar
                    alt=''
                    src={image? image : '/broken-image.jpg'}
                    sx={{ width: 100, height: 100 }}
                    className={idSeller === id?s.avatarSelected : ''}
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