import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';

const SellerCard = ({ image, name }) => {
    return (
        <Container sx={{
            marginTop: '10px',
            height: '100px',
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'space-around',
            cursor: 'pointer',
            flexDirection: 'column'
        }}>
            <Avatar
                alt=''
                src={image? image : '/broken-image.jpg'}
                sx={{ width: 80, height: 80 }}
             />
            <Typography variant="body2" sx={{
                    textAlign: 'center'
            }}>
                   {name}
                </Typography>
        </Container>
        
    );
};

export default SellerCard;