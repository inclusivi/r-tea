'use client';

import { useAuthContext } from "@/components/auth/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import React from "react";

const UserLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <AppLayout navigation={false}>
            {children}
        </AppLayout>
    )
};

export default UserLayout;