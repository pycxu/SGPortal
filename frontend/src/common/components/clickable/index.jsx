import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import * as Colors from '../../colors'
import * as Fonts from '../../fonts'
import * as Utils from '../../utils'
import P from '../typography'
import './style.scss'

export const Back = (props) => {
  const color = props.disabled ? '#cccccc' : '#202020'

  const styles = { root: { borderRadius: '5px', height: '30px' } }

  return (
    <div className='clickable-center-container' style={{ width: '66px' }}>
      <Clickable styles={styles} {...props}>
        <KeyboardArrowLeft style={{ height: '22px', color: color }} />
        <P style={{ marginBottom: '3px', color: color, paddingRight: '5px' }}> BACK </P>
      </Clickable>
    </div>
  )
}

export const Next = (props) => {
  const color = props.disabled ? '#cccccc' : '#202020'
  const styles = {
    root: { borderRadius: '5px', height: '30px' },
  }

  return (
    <div className='clickable-center-container' style={{ width: '64px' }}>
      <Clickable styles={styles} {...props}>
        <P style={{ marginBottom: '3px', color: color, paddingLeft: '5px' }}> NEXT </P>
        <KeyboardArrowRight style={{ height: '22px', color: color, marginLeft: '-2px' }} />
      </Clickable>
    </div>
  )
}

export const Text = (props) => {
  const {
    noBorder,
    comp,
    round,
    secondary,
    backgroundColor,
    color,
    selectedColor,
    disabledBackgroundColor,
    ...other
  } = props
  const primaryColor = backgroundColor || '#00afc5'
  const textColor = secondary ? primaryColor : color || '#ffffff'

  let hoverColor =
    selectedColor || (props.style && props.style.backgroundColor)
      ? null
      : Colors.monochromatic(primaryColor, secondary ? -1 : 1)
  let labelStyle = {}
  let rootStyle = {}
  switch (props.comp) {
    case 1:
      // home page
      labelStyle = {
        '@media (min-width: 768px)': { fontSize: 'calc(0.231vw + 15.22px)' },
        '@media (min-width: 1200px)': { fontSize: '18px' },
        fontSize: '17px',
      }
      break

    case 2:
      // navigation bar
      labelStyle = { fontFamily: Fonts.fontMedium, fontSize: '17px' }
      break

    case 3:
      // survey
      labelStyle = { fontSize: '15px' }
      break
    case 4:
      // size menu
      labelStyle = { fontSize: '24px', fontFamily: Fonts.fontBook }
      hoverColor = '#202020'
      break
    case 5:
      // home page banks
      hoverColor = '#ffffff'
      break
    case 6:
      // offers-view
      labelStyle = { fontSize: '16px' }
      break
    default:
      break
  }
  const styles = {
    root: Utils.combine(
      props.disabled
        ? {
            backgroundColor: disabledBackgroundColor
              ? disabledBackgroundColor
              : Colors.disabledColor,
          }
        : {
            minWidth: 0,
            borderRadius: round ? '50%' : 0,
            backgroundColor: !secondary ? primaryColor : '#ffffff',
            border:
              secondary && props.comp !== 6 ? (!noBorder ? `1.5px solid ${primaryColor}` : 0) : 0,
            '&:hover': { backgroundColor: hoverColor },
          },
      rootStyle,
    ),
    label: Utils.combine(
      { color: props.disabled ? (disabledBackgroundColor ? '#797979' : {}) : textColor },
      labelStyle,
    ),
  }

  if (props.style && props.style.backgroundColor)
    styles.root.backgroundColor = props.style.backgroundColor
  if (props.style && props.style.color) styles.label.color = props.style.color

  return <Clickable styles={styles} {...other} />
}

export const Image = (props) => {
  const { className, style, classes, width, height, imgUrl, imgFixed, to, ...other } = props

  return (
    <a className={className} style={Utils.combine(style, { cursor: 'pointer' })} {...other}>
      <div className='clickable-img-container'>
        <LazyLoadImage
          alt=''
          src={imgUrl}
          className='clickable-img'
          width={width}
          height={height}
        />
      </div>
    </a>
  )
}

export const Tab = (props) => {
  const { style, onClick, selected, label, to } = props

  return (
    <Link to={to} style={{ color: 'inherit', textDecoration: 'inherit' }}>
      <div
        role='button'
        tabIndex={0}
        onKeyDown={onClick}
        className={'clickable-tab-container' + (selected ? '' : ' clickable-tab-container-hover')}
        style={Utils.combine(style, {
          marginRight: '40px',
          borderBottom: selected ? '6px solid #202020' : '',
          borderTop: selected ? '6px solid #FFF' : '',
        })}
        onClick={onClick}
      >
        {label}
      </div>
    </Link>
  )
}

export const View = (props) => {
  const { children, selected, noFlex, ...other } = props
  const highlightColor = 'rgb(245, 245, 245)'
  const selectedColor = '#cceff3'
  const textColor = '#4d4d4d'
  const styles = {
    root: {
      backgroundColor: selected ? selectedColor : 'transparent',
      '& div': { color: selected ? textColor : '' },
      padding: 0,
      margin: 0,
      '@media not all and (pointer: coarse)': {
        '&:hover': { backgroundColor: highlightColor, '& div': { color: textColor } },
      },
    },
    label: {},
  }

  return (
    <Clickable disableRipple styles={styles} {...other}>
      <div
        style={{
          color: 'inherit',
          width: '100%',
          alignItems: 'center',
          display: !noFlex && 'flex',
          height: '100%',
        }}
      >
        {children}
      </div>
    </Clickable>
  )
}

const Clickable = (props) => {
  const { className, style, styles, rootStyle, ...other } = props

  const cssObj = {
    root: Utils.combine(
      {
        borderRadius: 0,
        height: '100%',
        width: '100%',
        boxShadow: 'none',
        '&:active, &:focus': { boxShadow: 'none' },
        minHeight: '0px',
        minWidth: '0px',
        padding: '0px',
        lineHeight: '1',
      },
      styles.root,
    ),
    // rippleRoot: { color: "rgb(0, 0, 0)" },
    // // https://stackoverflow.com/questions/53828820/ripple-effect-opacity-in-react-material-ui
    // rippleVisible: { opacity: 0.4, transform: "scale(1)", animation: `$ripple-effect 550ms cubic-bezier(0.4, 0, 0.2, 1)` },
    // "@keyframes ripple-effect": {
    //   "0%": { transform: "scale(0)", opacity: 0.1 },
    //   "100%": { transform: "scale(1)", opacity: 0.4 },
    // },
    text: Utils.combine(
      {
        textTransform: 'none',
        fontFamily: Fonts.fontBold,
        fontWeight: 'normal',
        marginBottom: '0px',
        letterSpacing: '0px',
      },
      styles.label,
    ),
  }
  if (rootStyle) cssObj.root = Utils.combine(cssObj.root, rootStyle)

  return (
    <div className={className} style={style}>
      <Button
        sx={{ '&.MuiButton-root': cssObj.root, '&.MuiButton-text': cssObj.text }}
        {...other}
      />
    </div>
  )
}

export default Clickable
