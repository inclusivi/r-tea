'use client';

import { useAuthContext } from "@/components/auth/AuthContext";
import LoadingModal from "@/components/loading/LoadingModal";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EmptyState from "@/components/shared/elements/EmptyState";
import { getProfileRepository } from "@/modules/firebase";
import { UserProfile } from "@/modules/firebase/models/UserProfile";
import { PessoaRepo } from "@/modules/firebase/repositories/PessoaRepo";
import { Divider, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function ProfilesPage() {
    const { userCtx } = useAuthContext();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    React.useEffect(() => {
        async function loadPessoa() {
            const pessoaId = searchParams.get('id');
            if (!pessoaId) return;

            const repo = await getProfileRepository(userCtx.user);
            const pessoa = await repo.getProfileForId(pessoaId);
            setProfile(pessoa);

            setLoading(false);
        }

        loadPessoa();
    }, [searchParams, userCtx]);


    if (loading) return <LoadingModal />;

    if (!profile) return <EmptyState message="Perfil não encontrado" />;

    return (
        <>
            <Typography variant="h3" color='primary'>Ver Perfil</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <ProfileHeader profile={profile} showEdit={false} />
        </>
    );
}