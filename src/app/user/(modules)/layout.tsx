'use client';

import { useAuthContext } from "@/components/auth/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import React from "react";

const UserLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { user } = useAuthContext()

    return user?.profile.userKind && (
        <AppLayout navigation={true}>
            {children}
        </AppLayout>
    )
};

export default UserLayout;