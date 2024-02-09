import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '../auth/AuthContext';
/*EDuardo mexue aqui*/
import { fecharmenudependentes } from './Eduardo.S.C-contribuição/page.ts';
/*fim Eduardo Stivanin Calvino mexeu*/
const drawerWidth = 240;

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function VerticalNavigation(props: Props) {
    const { userCtx } = useAuthContext();
    const router = useRouter();
    const currentPath = usePathname();

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

    const navContent = (
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {navigation.map((nav, index) => (
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




//parte que eEduarod mexeu
//parte minha pra fechjar se fora autista nop teste pus conmo verdeirto essa condiição
try {//tanto faz ovtrue or false se for do tipo fatexto o boleano
  console.log(fecharmenudependentes("true", menusome))
} 
catch (error) {
 //se erro avisar oque é 
 console.error("Deu erro texto sem aspas "+error)
   
}
// fim parte que eEduardoi mexeu
}
