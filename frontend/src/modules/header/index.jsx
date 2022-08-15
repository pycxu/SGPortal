import React, { useContext, useState } from 'react'
import { useMediaQuery, Drawer } from '@mui/material'
import { isNil } from 'lodash'
import AuthContext from '../../common/contexts/AuthContext'
import { Link } from 'react-router-dom'
import * as style from './style.module.scss'
import * as Clickable from '../../common/components/clickable'

export default function Header() {
  const isWide = useMediaQuery('(min-width:800px)')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logoutUser } = useContext(AuthContext)
  const isLoggedIn = !isNil(user)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [value, setValue] = useState(0)
  let titles = [
    { label: 'Sign Up', action: '/signup-consumer/' },
    { label: 'Login', action: '/login/' },
  ]

  let sideMenuTitles = [
    { label: 'Home', action: '/' },
    ...titles,
    { label: 'Dashboard', action: '/Dashboard/' },
  ]

  if (isLoggedIn) {
    titles = []
    sideMenuTitles = [{ label: 'Home', action: '/' }, ...titles, { label: 'Log out', action: '/' }]
  }

  const handleChange = (event, newValue) => {
    // //console.log("newValue:", newValue);
    setValue(newValue)
    setMobileOpen(!mobileOpen)
  }

  const indexForTitle = (title) => {
    return titles.findIndex((x) => x === title)
  }

  let selectedTitle = titles.find(
    (x) => x.action === (typeof window !== 'undefined' ? window.location.pathname : null),
  )
  if (!selectedTitle && value !== false) {
    setValue(false)
  } else if (selectedTitle && value !== indexForTitle(selectedTitle)) {
    setValue(indexForTitle(selectedTitle))
  }

  return (
    <div>
      <div className={style.root}>
        <div className={style.logoContainer}>
          {isLoggedIn ? (
            <Link to='/dashboard'>
              <img src='/images/logo.png' className={style.img} alt='' />
            </Link>
          ) : (
            <Link to='/'>
              <img src='/images/Logo_SOG_Colour.png' className={style.img} alt='' />
            </Link>
          )}
        </div>
        {isWide && (
          <div className={style.buttonsContainer}>
            {titles.map((item) => {
              return (
                <Clickable.Tab
                  to={item.action}
                  key={item.label}
                  selected={false} // indexForTitle(item) === value
                  label={item.label}
                  onClick={() => {
                    setValue(indexForTitle(item))
                  }}
                />
              )
            })}
            {isLoggedIn ? (
              <div className={style.getStartedContainer}>
                <Clickable.Text
                  variant='text'
                  comp={2}
                  style={{ height: '50px', width: '100%' }}
                  onClick={() => logoutUser()}
                >
                  Log Out
                </Clickable.Text>
              </div>
            ) : (
              <div className={style.getStartedContainer}>
                <Clickable.Text
                  variant='text'
                  comp={2}
                  component={Link}
                  to={'/dashboard/'}
                  style={{ height: '50px', width: '100%' }}
                  // onClick={}
                >
                  Dashboard
                </Clickable.Text>
              </div>
            )}
          </div>
        )}
        {!isWide && (
          <div>
            <Clickable.Image
              className={style.xIcon}
              width='22px'
              height='10px'
              imgUrl='/images/hamburger_menu.png'
              onClick={() => {
                handleDrawerToggle()
              }}
            />
            <Drawer
              variant='temporary'
              anchor={'right'}
              open={mobileOpen}
              sx={{
                '& .MuiDrawer-paper': { width: '100%', backgroundColor: '#00afc5' },
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              onClose={() => {
                handleDrawerToggle()
              }}
            >
              <div>
                <Clickable.Image
                  className={style.xIcon}
                  width={20}
                  height={20}
                  imgUrl='/images/icon_close.png'
                  onClick={() => {
                    handleDrawerToggle()
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: '40px',
                  marginBottom: '60px',
                }}
              ></div>
              {sideMenuTitles.map((item) => {
                return (
                  <Clickable.Text
                    disableRipple
                    comp={4}
                    key={item.label}
                    className={style.tab}
                    component={Link}
                    to={item.action}
                    onClick={() => handleChange()}
                  >
                    {item.label}
                  </Clickable.Text>
                )
              })}
            </Drawer>
          </div>
        )}
      </div>
    </div>
  )
}
