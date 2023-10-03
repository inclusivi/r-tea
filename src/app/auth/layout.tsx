import { AuthBackground } from "@/components/auth/AuthBackground";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { Logo } from "@/components/logo/Logo";
import { Box, Grid } from "@mui/material";

const AuthLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <AuthBackground />
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{
                    minHeight: '100vh'
                }}
            >
                <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
                    <Logo />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                    >
                        <Grid item>
                            <AuthCard>{children}</AuthCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AuthLayout;