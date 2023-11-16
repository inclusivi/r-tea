'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserHomePage() {
    const router = useRouter();


    useEffect(() => {
        router.replace("/user/registros/lista");
    }, [router])


    return (<></>);
}