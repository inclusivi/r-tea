import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const Logo = () => {
    return (
        // Horizontal box
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src='/android-chrome-512x512.png' alt='Logo' width={34} height={34} />
            <Box sx={{ width: '0.8rem' }} />
            <Typography variant='h3' color='white' component='span'>R-TEA</Typography>
        </Box>
    );
}