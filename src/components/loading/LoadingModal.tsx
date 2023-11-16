'use client';

import { Modal } from "@mui/material";
import { DefaultLoader } from "./DefaultLoader";

export default function LoadingModal({ visible }: { visible?: boolean }) {
    return (
        <Modal open={visible ?? true} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DefaultLoader />
        </Modal>
    );
}