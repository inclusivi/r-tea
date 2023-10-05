'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/auth/AuthContext";
import LoadingPage from "@/components/loading/LoadingPage";

export default function UserHomePage() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/auth/login")
    }, [user, router])

    return (user ? <h1>Página logada</h1> : <LoadingPage />);
}


