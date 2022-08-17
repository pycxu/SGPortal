import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserProfile } from '../../../hooks/useUserProfile'
import useAxios from '../../../hooks/useAxios'
import AuthContext from '../../../common/contexts/AuthContext'

import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

type SideBarProps = {
  children: React.ReactElement
}

export default function Content({ children }: SideBarProps) {
  const { user, logoutUser } = useContext(AuthContext)

  if (user) {
    const axiosBearer = useAxios()
    const isWide = useMediaQuery('(min-width:800px)')

    const navigate = useNavigate()
    const onSuccess = (data) => {
      console.log('success', data)
    }
    const onError = (error) => {
      console.log('error2', error)
      logoutUser()
    }
    const { isLoading, data } = useUserProfile(axiosBearer, user?.user_id, onSuccess, onError)

    if (isLoading) return <p>Loading...</p>

    const drawerWidth = '15vw'
    const menuItems = []

    if (data.user_type === 2) {
      menuItems.push({
        text: 'Offer QA',
        action: '/portal/offer-qa/',
      })
    }
    return (
      <Box sx={{ display: 'flex', mt: '60px' }}>
        <Drawer
          variant='permanent'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            ['& .MuiDrawer-paper']: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Box sx={{ overflow: 'hidden' }}>
            <Divider sx={{ mt: '80px' }} />
            <List>
              <ListItem key='Profile' disablePadding>
                <ListItemButton onClick={() => navigate('/portal', { replace: true })}>
                  <ListItemIcon>{<PersonIcon />}</ListItemIcon>
                  {isWide ? <ListItemText primary='Profile' /> : null}
                </ListItemButton>
              </ListItem>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton onClick={() => navigate(item.action, { replace: true })}>
                    <ListItemIcon>{<AccountBalanceIcon />}</ListItemIcon>
                    {isWide ? <ListItemText primary={item.text} /> : null}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
      </Box>
    )
  } else {
    logoutUser()
  }
}
