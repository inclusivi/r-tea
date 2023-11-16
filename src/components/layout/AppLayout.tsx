'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Logo } from '../logo/Logo';
import VerticalNavigation from './VerticalNavigation';
import UserMenu from './UserMenu';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';
import ThemeRegistry from '../theme/ThemeRegistry';
import { lightTheme } from '../theme/default';

const pages = ['Products', 'Pricing', 'Blog'];


interface Props {
  navigation: boolean;
  children: React.ReactNode;
}

function AppLayout(props: Props) {
  const router = useRouter();

  const [sideNavOpen, setSideNavOpen] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSideNavOpen(!sideNavOpen);
  };

  const handleCloseNavMenu = () => {
    setSideNavOpen(false);
  };

  const handleAddRecord = () => {
    router.push('/user/registros/novo')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      <AppBar color='primary' position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

        <Toolbar>

          <Logo />

          {props.navigation &&
            <Box sx={{ ml: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          }

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Adicionar registro">
            <IconButton onClick={handleAddRecord} sx={{ mr: 3 }}>
              <PostAddOutlinedIcon />
            </IconButton>
          </Tooltip>

          <UserMenu />

        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1, backgroundColor: '#D5DDE3' }}>
        {props.navigation && <VerticalNavigation open={sideNavOpen} onClose={handleCloseNavMenu} />}

        <ThemeRegistry options={{ key: 'content' }} theme={lightTheme}>
          <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
            <Toolbar />
            <Container maxWidth="xl">
              {props.children}
            </Container>
          </Box>
        </ThemeRegistry>

      </Box>

    </Box>
  );
}
export default AppLayout;