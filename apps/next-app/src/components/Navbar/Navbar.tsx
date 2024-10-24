"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";

const pages = [
    { name: 'Mascotas', path: '/adoption' },
    { name: 'Contacto', path: '/contacto' },
    { name: 'Nosotros', path: '/aboutus' }
];

export default function Navbar() {
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (path?: string) => {
        setAnchorElNav(null);
        if (path) {
            router.push(path); // Navegar a la ruta proporcionada
        }
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClose = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#135b5e", width: "100vw" }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link href="/" title={"Home Page"}>
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={80}
                                height={80}
                            />
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleMenuClose}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={()=>handleCloseNavMenu(page.path)}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link href="/" title={"Home Page"}>
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={60}
                                height={60}
                            />
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end" }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={()=>handleCloseNavMenu(page.path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                role='link'
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={()=>handleCloseUserMenu()}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <ThemeSwitcher />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}