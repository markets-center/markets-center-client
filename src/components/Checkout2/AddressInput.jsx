import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';


export default function AddressInput({ name, label, required, value }) {
    const { control } = useFormContext() 
  return (
    <Grid item xs={12} sm={6}>
        <Controller  
        control={control}
        name={name} 
        defaultValue={value}
        render = {({ field })=> (
            <TextField
                {...field}
                fullWidth
                label={label}
                required={required}
            />
        )}
    />
    </Grid>

  )
}
