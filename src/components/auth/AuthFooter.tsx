'use client';

// material-ui
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles'


// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export const AuthFooter = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="xl">
            <Stack
                direction={matchDownSM ? 'column' : 'row'}
                justifyContent={matchDownSM ? 'center' : 'space-between'}
                spacing={2}
                textAlign={matchDownSM ? 'center' : 'inherit'}
            >
                <Typography variant="subtitle2" color="secondary" component="span">
                    &copy; 2023 Instituto Incluir. Todos os direitos reservados.
                </Typography>

                <Stack direction={matchDownSM ? 'column' : 'row'} spacing={matchDownSM ? 1 : 3} textAlign={matchDownSM ? 'center' : 'inherit'}>
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href="#"
                        target="_blank"
                        underline="hover"
                    >
                        Termos de Uso
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href="#"
                        target="_blank"
                        underline="hover"
                    >
                        Política de Privacidade
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="secondary"
                        component={Link}
                        href="#"
                        target="_blank"
                        underline="hover"
                    >
                        Ajuda
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};
