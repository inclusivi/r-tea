'use client';

import React from "react";
import { Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import ExitIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthContext } from "../auth/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/modules/firebase/services/auth";

const drawerWidth = 240;

export default function UserMenu() {
    const { userCtx } = useAuthContext();
    const router = useRouter();
    const pathName = usePathname();

    const [userMenuOpen, setUserMenuOpen] = React.useState(false);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setUserMenuOpen(!userMenuOpen);
    };

    const closeUserMenu = () => {
        setUserMenuOpen(false);
    };

    const handleNav = (route: string) => {
        setUserMenuOpen(false);
        if (pathName == route) {
            router.refresh();
        } else {
            router.push(route);
        }
    }

    const handleLogout = async () => {
        setUserMenuOpen(false);
        await logout();
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Minhas configurações">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={userCtx.user.fullName} src={userCtx.user.photoURL} sx={{ bgcolor: 'white' }} />
                </IconButton>
            </Tooltip>

            <Drawer
                variant="temporary"
                open={userMenuOpen}
                anchor="right"
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                onClose={closeUserMenu}>

                <Toolbar />

                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, mt: 1 }}>
                        <Avatar alt={userCtx.user.fullName} src={userCtx.user.photoURL} sx={{ width: 120, height: 120, mb: 2 }} />
                        <Typography variant='h5' component='span' sx={{ textAlign: 'center' }}>
                            {userCtx.user.fullName}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box>
                        <List>
                            <ListItemButton onClick={() => handleNav('/user/perfil')}>
                                <ListItemIcon><PersonIcon /></ListItemIcon>
                                <ListItemText primary='Perfil' />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleNav(userCtx.allowCreatePessoa ? '/user/invites' : '/user/convites')}>
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <ListItemText primary='Convites' />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleNav('/user/config')}>
                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                <ListItemText primary='Configuração' />
                            </ListItemButton>
                        </List>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Divider />
                    <List>
                        <ListItemButton>
                            <ListItemIcon>
                                <ExitIcon />
                            </ListItemIcon>
                            <ListItemText primary='Sair' onClick={handleLogout} />
                        </ListItemButton>
                    </List>

                </Box>

            </Drawer>

        </Box>
    )
}