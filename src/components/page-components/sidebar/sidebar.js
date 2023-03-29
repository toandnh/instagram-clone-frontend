import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { ClickAwayListener } from '@mui/base'
import { Tooltip, Popper, Modal, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Slide, createTheme, ThemeProvider } from '@mui/material'

import { default as MiniVariantDrawer } from './miniVariantDrawer'

import { default as simpleLogo } from './../../images/logo.png'
import { default as fullLogo } from './../../images/vector.png'

import useAuth from '../../hooks/useAuth'

import CreatePost from '../posts/createPost'

import Search from '../search/search'
import Notifications from './notifications'
import More from './more'

import home from '../../images/home.png'
import search from '../../images/search.png'
import explore from '../../images/shop.png'
import reels from '../../images/reels.png'
import messenger from '../../images/messenger.png'
import like from '../../images/like.png'
import add from '../../images/add.png'
import user from '../../images/user.png'
import more from '../../images/more.png'


const theme = createTheme({
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    display: 'flex',
                    alignItems: 'center',
                    left: '1rem',
                    height: '35px',
                    fontSize: '14px'
                }
            }
        }
    }
})

const Sidebar = () => {
    const { userId } = useAuth()

    const searchRef = useRef()
    const notiRef = useRef()
    const moreRef = useRef()

    const [drawerOpened, setDrawerOpened] = useState(true)
    const [createOpened, setCreateOpened] = useState(false)
    const [searchOpened, setSearchOpened] = useState(false)
    const [notiOpened, setNotiOpened] = useState(false)
    const [moreOpened, setMoreOpened] = useState(false)

    const toggleMoreClick = () => {setMoreOpened(!moreOpened)}

    const toggleDrawerSearch = () => {
        if (moreOpened)
            toggleMoreClick()

        if (notiOpened) {
            setSearchOpened(true)
            setNotiOpened(false)
        } else {
            setDrawerOpened(!drawerOpened)
            setSearchOpened(drawerOpened)
            if (searchOpened) 
                setNotiOpened(!searchOpened)
        }
    }

    const toggleDrawerNoti = () => {
        if (moreOpened)
            toggleMoreClick()

        if (searchOpened) {
            setNotiOpened(true)
            setSearchOpened(false)
        } else {
            setDrawerOpened(!drawerOpened)
            setNotiOpened(drawerOpened)
            if (notiOpened)
                setSearchOpened(!notiOpened)
        }
    }

    const handleCreateOpen = () => {setCreateOpened(true)}
    const handleCreateClose = () => {setCreateOpened(false)}

    const handleClickOutside = () => {
        if (searchOpened || notiOpened) {
            setSearchOpened(false)
            setNotiOpened(false)
            setDrawerOpened(true)
        }
        if (moreOpened)
            toggleMoreClick()
    }

    const style = {
        drawer: {
            backgroundColor: 'black',
            borderRightWidth: '1px',
            borderColor: 'rgb(23 23 23)',
            zIndex: 0
        },
        button: {
            height: '3rem',
            margin: '0 0.5rem',
            padding: '0 0.5rem',
            borderRadius: '2rem',
            ':hover': {
                backgroundColor: 'rgb(23, 23, 23)' 
            }
        },
        text: {
            color: 'white',
            opacity: drawerOpened ? 1 : 0
        },
        icon: 'h-[25px] aspect-square ml-2 mr-4'
    }
    
    return (
        <ClickAwayListener onClickAway={handleClickOutside}>
            <MiniVariantDrawer variant='permanent' open={drawerOpened} PaperProps={{ sx: style.drawer }}>
                <ThemeProvider theme={theme}>
                    <List sx={{ flexGrow: '0', padding: '2rem 1rem' }}>
                        <ListItem disablePadding>
                            <ListItemButton 
                                component={Link} to='/' 
                                onClick={handleClickOutside} 
                                disableGutters 
                                sx={{ height: '3rem', margin: drawerOpened ? '0 0.5rem' : '0' }}
                            >
                                {drawerOpened ? 
                                    <img src={fullLogo} alt='logo' className='h-[30px] aspect-[4/1]' /> : 
                                        <img src={simpleLogo} alt='logo' className={style.icon} />
                                }
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <List sx={{ display: 'flex', flexDirection: 'column', flexGrow: '6', gap: '0.5rem' }}>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to='/' onClick={handleClickOutside} sx={style.button}>
                                <Tooltip title={drawerOpened ? '' : 'Home'} placement='right' arrow>
                                    <img src={home} alt='home' className={style.icon} />
                                </Tooltip>
                                <ListItemText primary='Home' sx={style.text} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton sx={style.button} onClick={toggleDrawerSearch}>
                                <Tooltip title={drawerOpened || searchOpened ? '' : 'Search'} placement='right' arrow ref={searchRef}>
                                    <img src={search} alt='search' className={style.icon} />
                                </Tooltip>
                                <ListItemText primary='Search' sx={style.text} />
                            </ListItemButton>
                            <Popper
                                open={searchOpened}
                                anchorEl={searchRef.current}
                                placement='left-end'
                                modifiers={[
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, 26]
                                        }
                                    }
                                ]}
                                transition
                            >
                                {({ TransitionProps }) => (
                                    <Slide {...TransitionProps} in={searchOpened} timeout={300}>
                                        <div>
                                            <Search />
                                        </div>
                                    </Slide>
                                )}
                            </Popper>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton component={Link} to='/explore' sx={style.button}>
                                <Tooltip title={drawerOpened ? '' : 'Explore'} placement='right' arrow>
                                    <img src={explore} alt='explore' className={style.icon} />
                                </Tooltip>
                                <ListItemText primary='Explore' sx={style.text} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton component={Link} to='/reels' sx={style.button}>
                                <Tooltip title={drawerOpened ? '' : 'Reels'} placement='right' arrow>
                                    <img src={reels} alt='reels' className={style.icon} />
                                </Tooltip>
                                <ListItemText primary='Reels' sx={style.text} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton component={Link} to='/messages' sx={style.button}>
                                <Tooltip title={drawerOpened ? '' : 'Messages'} placement='right' arrow>
                                    <img src={messenger} alt='messages' className={style.icon} />
                                </Tooltip>
                                <ListItemText primary='Messages' sx={style.text} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton sx={style.button} onClick={toggleDrawerNoti}>
                                <Tooltip title={drawerOpened || notiOpened ? '' : 'Notifications'} placement='right' arrow ref={notiRef}>
                                    <img src={like} alt='notifications' className={style.icon} />
                                </Tooltip>
                                <ListItemText primary='Notifications' sx={style.text} />
                            </ListItemButton>
                            <Popper
                                open={notiOpened}
                                anchorEl={notiRef.current}
                                placement='left-end'
                                modifiers={[
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, 26]
                                        }
                                    }
                                ]}
                                transition
                            >
                                {({ TransitionProps }) => (
                                    <Slide {...TransitionProps} in={notiOpened} timeout={300}>
                                        <div>
                                            <Notifications />
                                        </div>
                                    </Slide>
                                )}
                            </Popper>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton sx={style.button} onClick={handleCreateOpen}>
                                <Tooltip title={drawerOpened ? '' : 'Create'} placement='right' arrow>
                                    <img src={add} alt='create' className={style.icon} />
                                </Tooltip>
                                <ListItemText primary='Create' sx={style.text} />
                            </ListItemButton>
                            <Modal
                                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                open={createOpened}
                                onClose={handleCreateClose}
                            >   
                                <div className='h-4/5 w-2/5'>
                                    <CreatePost />
                                </div>
                            </Modal>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton component={Link} to={`/profile/${userId}`} sx={style.button}>
                                <Tooltip title={drawerOpened ? '' : 'Profile'} placement='right' arrow>
                                    <img src={user} alt='profile' className={style.icon} />
                                </Tooltip>
                                <ListItemText primary='Profile' sx={style.text} />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <List sx={{ display: 'flex', flexGrow: '1', justifyContent: 'center' }}>
                        <ListItem disablePadding>
                            <ListItemButton sx={style.button} onClick={toggleMoreClick}>
                                <Tooltip title={drawerOpened ? '' : 'More'} placement='right' arrow ref={moreRef}>
                                    <img src={more} alt='more' className={style.icon} />
                                </Tooltip>
                                <ListItemText primary='More' sx={style.text} />
                            </ListItemButton>
                            <Popper
                                open={moreOpened}
                                anchorEl={moreRef.current}
                                placement='top-end'
                                modifiers={[
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [-10, 15]
                                        }
                                    }
                                ]}
                                transition
                            >
                                {({ TransitionProps }) => (
                                    <Slide {...TransitionProps} in={moreOpened} direction='right' timeout={300}>
                                        <div>
                                            <More />
                                        </div>
                                    </Slide>
                                )}
                            </Popper>
                        </ListItem>
                    </List>
                </ThemeProvider>
            </MiniVariantDrawer>
        </ClickAwayListener>
    )
}

export default Sidebar