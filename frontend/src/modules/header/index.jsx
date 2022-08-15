import React, { useState } from 'react'
import { useMediaQuery, Drawer } from '@mui/material'
import { Link } from 'react-router-dom'
import * as style from './style.module.scss'
import * as Clickable from '../../common/components/clickable'

export default function Header(props) {
  const isWide = useMediaQuery('(min-width:800px)')
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [value, setValue] = React.useState(0)
  const titles = [
    { label: 'Sign Up', action: '/signup-consumer/' },
    { label: 'Login', action: '/login/' },
  ]

  const sideMenuTitles = [
    { label: 'Home', action: '/' },
    ...titles,
    { label: 'Dashboard', action: '/Dashboard/' },
  ]

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
          <Link to='/'>
            <img src='/images/Logo_SOG_Colour.png' className={style.img} alt='' />
          </Link>
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
