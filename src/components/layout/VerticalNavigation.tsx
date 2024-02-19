import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '../auth/AuthContext';
import { UserKind } from '@/modules/firebase/models/UserKind';


const drawerWidth = 240;

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function VerticalNavigation(props: Props) {
    const { userCtx } = useAuthContext();
    const router = useRouter();
    const currentPath = usePathname();
    /*código que Eduardo mexeu cria varivel pra  condicional*/
    //tipo de usuario 
    const tipodeusuario=userCtx.user.profile.userKind;
    /* fim Eduardo mexeu */

    const navigation = [
        { name: userCtx.labelPessoas, route: '/user/pessoas/lista', icon: PersonOutlineOutlinedIcon },
        { name: 'Registros', route: '/user/registros/lista', icon: AssignmentOutlinedIcon },
    ]

    const handleNavigation = (route: string) => {
        props.onClose();

        if (currentPath === route) {
            router.refresh();
        } else {
            router.push(route);
        }
    }

    /*se usauario é autista renomear aaguar menu dependend eEduarod  mexeu aqui*/
                                            //elemntodoarray[0]tipo 0       //indice do array
    function fecharmenudependentes(usuarioautista:typeof navigation[0] ,  index:number) {
    // se indece e pessoaAutista ou em pessoasemdiagnostico  é zero esconde esse menu que é o laterate
        if (index==0 && (tipodeusuario==UserKind.PessoaAutista || tipodeusuario==UserKind.PessoaSemDiagnostico)) {
            return false;
        } else {
            return true;
        }
    }
    /* fim eEduardo mexeu */

    const navContent = (
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {/*Eduardo mexeu aqui*/}
                {navigation.filter(fecharmenudependentes)
                .map((nav, index) => (
                    <ListItem key={nav.name} disablePadding>
                        <ListItemButton onClick={() => handleNavigation(nav.route)}>
                            <ListItemIcon>
                                <nav.icon />
                            </ListItemIcon>
                            <ListItemText primary={nav.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Box>
    )

    return (
        <>
            <Drawer
                variant="temporary"
                open={props.open}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                onClose={props.onClose}
            >
                <Toolbar />
                {navContent}
            </Drawer>


            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    flexShrink: 0,
                    width: drawerWidth,
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <Toolbar />
                {navContent}
            </Drawer>
        </>
    )
}
