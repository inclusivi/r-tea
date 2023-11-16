'use client';

import { useAuthContext } from "@/components/auth/AuthContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Divider, Typography } from "@mui/material";

export default function UserProfilePage() {
    const { userCtx } = useAuthContext();

    return (
        <>
            <Typography variant="h3" color='primary'>Meu Perfil</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <ProfileHeader profile={userCtx.user.profile} showEdit={true} />
        </>
    );
}