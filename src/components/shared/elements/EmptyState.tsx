
import Image from 'next/image';

import emptyState from '@/assets/images/empty-state.png';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface EmptyStateProps {
    message?: string;
    action?: string;
    link?: string;
}

export default function EmptyState(props: EmptyStateProps) {
    const router = useRouter();
    
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Typography variant="h4" color="primary" sx={{mt: 2, mb: 2}}>{props.message ?? 'Nenhum registro encontrado'}</Typography>
            {props.action && props.link && <Button variant="contained" sx={{mb: 3}} onClick={() => router.push(props.link!)}>{props.action}</Button>}
            <Image src={emptyState} alt="Empty State" width={450} height={450} />
        </Box>
    );
}