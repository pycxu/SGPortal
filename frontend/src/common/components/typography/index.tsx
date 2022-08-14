import { css } from '@emotion/css'
import * as Colors from '../../colors'
import * as Fonts from '../../fonts'
import * as Utils from '../../utils'
import React from 'react'

const fontStyle = (
  font,
  weight,
  color,
  lineHeight,
  pSpacing,
  fontSize,
  marginBottom,
  marginTop,
) => {
  return {
    fontFamily: font,
    color: color,
    fontWeight: weight,
    lineHeight: lineHeight.min,
    marginTop: marginTop.min,
    marginBottom: marginBottom.min,
    fontSize: fontSize.min,
    '@media (min-width: 320px)': {
      lineHeight: lineHeight.w320,
      marginTop: marginTop.w320,
      marginBottom: marginBottom.w320,
      fontSize: fontSize.w320,
    },
    '@media (min-width: 480px)': {
      lineHeight: lineHeight.w480,
      marginTop: marginTop.w480,
      marginBottom: marginBottom.w480,
      fontSize: fontSize.w480,
    },
    '@media (min-width: 768px)': {
      lineHeight: lineHeight.w768,
      marginTop: marginTop.w768,
      marginBottom: marginBottom.w768,
      fontSize: fontSize.w768,
    },
    '@media (min-width: 1024px)': {
      lineHeight: lineHeight.w1024,
      marginTop: marginTop.w1024,
      marginBottom: marginBottom.w1024,
      fontSize: fontSize.w1024,
    },
  }
}

export const P = (props) => {
  const { children, selected, text, comp, textFont, fontColor, ...other } = props

  let font = Fonts.fontBook
  let weight = 400
  let color = Colors.Black3
  let lineHeight = { min: '1.5', w320: '', w480: '', w768: '1.6', w1024: '' }
  let fontSize = {
    min: '15px',
    w320: Utils.cssLinearEq(15, 17, 320, 480),
    w480: '17px',
    w768: '',
    w1024: '',
  }
  let marginBottom = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
  let marginTop = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }

  switch (comp) {
    case 'large':
      lineHeight = { min: '1.3', w320: '', w480: '', w768: '1.4', w1024: '' }
      fontSize = {
        min: '16px',
        w320: Utils.cssLinearEq(16, 18, 320, 480),
        w480: '18px',
        w768: Utils.cssLinearEq(18, 20, 768, 1024),
        w1024: '20px',
      }
      break
    case 'small':
      fontSize = {
        min: '15px',
        w320: Utils.cssLinearEq(15, 16, 320, 480),
        w480: '16px',
        w768: '16px',
        w1024: '16px',
      }
      break
    case 'x-small':
      fontSize = { min: '14px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'survey-help-question':
      font = Fonts.fontBold
      weight = 700
      color = Colors.Black1
      break
    case 'faq-closed':
      marginBottom = { min: '15px', w320: '', w480: '', w768: '20px', w1024: '' }
      break
    case 'faq-opened':
      font = Fonts.fontBold
      color = Colors.Black1
      weight = 700
      marginBottom = { min: '15px', w320: '', w480: '', w768: '20px', w1024: '' }
      break
    case 'card-name':
      lineHeight = { min: '1.1', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'card-usage-heading':
      color = Colors.Black1
      lineHeight = { min: '1.1', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'card-usage-label':
      lineHeight = { min: '1.1', w320: '', w480: '', w768: '', w1024: '' }
      fontSize = {
        min: '11px',
        w320: Utils.cssLinearEq(11, 14, 320, 480),
        w480: '14px',
        w768: '',
        w1024: '',
      }
      break
    case 'card-usage-info':
      color = Colors.Black1
      lineHeight = { min: '1.1', w320: '', w480: '', w768: '', w1024: '' }
      fontSize = {
        min: '11px',
        w320: Utils.cssLinearEq(11, 14, 320, 480),
        w480: '14px',
        w768: '',
        w1024: '',
      }
      break
    case 'bottom-margin':
      marginBottom = { min: '13px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'list1':
      color = Colors.Black1
      font = Fonts.fontMedium
      lineHeight = { min: '0.5', w320: '', w480: '0.6', w768: '0.75', w1024: '' }
      fontSize = {
        min: '14px',
        w320: Utils.cssLinearEq(14, 14, 320, 480),
        w480: '14px',
        w768: '',
        w1024: '',
      }
      break
    case 'offer-detail':
      lineHeight = { min: '1.25' }
      break
    case 'offer-detail2':
      lineHeight = { min: '1.25' }
      fontSize = { min: '14px', w320: '', w480: '14px', w768: '', w1024: '' }
      break
    case 'large-blue':
      color = Colors.Primary1
      weight = 700
      lineHeight = { min: '1.3', w320: '', w480: '', w768: '1.4', w1024: '' }
      fontSize = {
        min: '16px',
        w320: Utils.cssLinearEq(16, 18, 320, 480),
        w480: '18px',
        w768: Utils.cssLinearEq(18, 20, 768, 1024),
        w1024: '20px',
      }
      break
    case 'large-black':
      color = Colors.Black1
      weight = 700
      lineHeight = { min: '1.3', w320: '', w480: '', w768: '1.4', w1024: '' }
      fontSize = {
        min: '16px',
        w320: Utils.cssLinearEq(16, 18, 320, 480),
        w480: '18px',
        w768: Utils.cssLinearEq(18, 20, 768, 1024),
        w1024: '20px',
      }
      break
    case 'card-name-bold':
      lineHeight = { min: '1.1', w320: '', w480: '', w768: '', w1024: '' }
      font = Fonts.fontBold
      color = Colors.Black1
      break
    case 'content-p':
      lineHeight = { min: '1.4', w320: '', w480: '', w768: '1.4', w1024: '' }
      fontSize = { min: '16px', w320: '', w480: '', w768: '18px', w1024: '' }
      break
    case 'content-p-tablet':
      lineHeight = { min: '1.4', w320: '', w480: '', w768: '', w1024: '1.4' }
      fontSize = { min: '16px', w320: '', w480: '', w768: '', w1024: '18px' }
      break
    case 'product-detail':
      fontSize = { min: '16px', w320: '', w480: '', w768: '', w1024: '' }
      lineHeight = { min: '1.25' }
      break
    case 'product-detail-bold':
      fontSize = { min: '16px', w320: '', w480: '', w768: '', w1024: '' }
      lineHeight = { min: '1.25' }
      color = Colors.Black1
      font = Fonts.fontBold
      weight = 700
      break
    case 'bank-list':
      lineHeight = { min: '1.2', w320: '', w480: '', w768: '1.2', w1024: '' }
      fontSize = { min: '16px', w320: '', w480: '', w768: '16px', w1024: '' }
      break
    case 'flat-18':
      lineHeight = { min: '1.4', w320: '', w480: '', w768: '', w1024: '' }
      fontSize = { min: '18px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'small-bold':
      font = Fonts.fontBold
      color = Colors.Black1
      weight = 700
      fontSize = { min: '16px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'medium-bold':
      font = Fonts.fontBold
      color = Colors.Black1
      weight = 700
      fontSize = { min: '18px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'medium-black':
      color = Colors.Black1
      fontSize = { min: '18px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'medium-bold-blue':
      font = Fonts.fontBold
      color = Colors.Primary1
      fontSize = { min: '18px', w320: '', w480: '', w768: '', w1024: '' }
      weight = 700
      break
    default:
      break
  }

  if (textFont) font = textFont

  return (
    <Typography
      comp='p'
      styles={fontStyle(
        font,
        weight,
        fontColor ? fontColor : color,
        lineHeight,
        '0.8em',
        fontSize,
        marginBottom,
        marginTop,
      )}
      {...other}
    >
      {text}
      {children}
    </Typography>
  )
}

export const H6 = (props) => {
  const { children, selected, text, comp, fontColor, myMarginTop, ...other } = props

  let font = Fonts.fontBold
  let weight = 700
  let color = Colors.Black1
  let lineHeight = { min: '1.05', w320: '', w480: '', w768: '', w1024: '' }
  let fontSize = { min: '22px', w320: '', w480: '', w768: '', w1024: '' }
  let marginBottom = { min: '13px', w320: '', w480: '', w768: '', w1024: '' }
  let marginTop = {
    min: myMarginTop ? myMarginTop : '29px',
    w320: '',
    w480: '',
    w768: '',
    w1024: '',
  }

  switch (comp) {
    case 'title-name':
      break
    case 'title-job':
      color = Colors.Black2
      fontSize = { min: '16px', w320: '', w480: '', w768: '', w1024: '' }
      marginBottom = { min: '29px', w320: '', w480: '', w768: '', w1024: '' }
      marginTop = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'list-item':
      font = Fonts.fontBook
      weight = 400
      color = Colors.Black3
      fontSize = {
        min: '16px',
        w320: Utils.cssLinearEq(16, 18, 320, 480),
        w480: '18px',
        w768: '',
        w1024: '',
      }
      marginBottom = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      marginTop = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'list-heading':
      font = Fonts.fontBold
      weight = 700
      color = Colors.Black2
      fontSize = {
        min: '16px',
        w320: Utils.cssLinearEq(16, 18, 320, 480),
        w480: '18px',
        w768: '',
        w1024: '',
      }
      marginBottom = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      marginTop = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'list-sub-heading':
      font = Fonts.fontMedium
      weight = 500
      color = Colors.Black1
      fontSize = {
        min: '16px',
        w320: Utils.cssLinearEq(16, 18, 320, 480),
        w480: '18px',
        w768: '',
        w1024: '',
      }
      marginBottom = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      marginTop = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'list-sub-heading2':
      font = Fonts.fontBold
      weight = 500
      color = Colors.Black1
      fontSize = {
        min: '16px',
        w320: Utils.cssLinearEq(16, 18, 320, 480),
        w480: '18px',
        w768: '',
        w1024: '',
      }
      marginBottom = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      marginTop = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'list-sub-heading3':
      font = Fonts.fontBold
      weight = 500
      color = Colors.Black1
      fontSize = {
        min: '14px',
        w320: Utils.cssLinearEq(14, 16, 320, 480),
        w480: '16px',
        w768: '',
        w1024: '',
      }
      marginBottom = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      marginTop = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      break
    default:
      break
  }

  return (
    <Typography
      comp='h6'
      styles={fontStyle(
        font,
        weight,
        fontColor ? fontColor : color,
        lineHeight,
        '0',
        fontSize,
        marginBottom,
        marginTop,
      )}
      {...other}
    >
      {text}
      {children}
    </Typography>
  )
}

export const H4 = (props) => {
  const { children, selected, text, comp, ...other } = props

  let font = Fonts.fontBold
  let weight = 700
  let color = Colors.Black2
  let lineHeight = { min: '1.05', w320: '', w480: '', w768: '', w1024: '' }
  let fontSize = {
    min: '17px',
    w320: Utils.cssLinearEq(17, 18, 320, 480),
    w480: '18px',
    w768: Utils.cssLinearEq(18, 22, 768, 1024),
    w1024: '22px',
  }
  let marginBottom = { min: '16px', w320: '', w480: '', w768: '', w1024: '' }
  let marginTop = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }

  switch (comp) {
    case 'instructions':
      color = Colors.Primary1
      fontSize = { min: '18px', w320: '', w480: '', w768: '', w1024: '' }
      break
    default:
      break
  }

  return (
    <Typography
      comp='h4'
      styles={fontStyle(font, weight, color, lineHeight, '', fontSize, marginBottom, marginTop)}
      {...other}
    >
      {text}
      {children}
    </Typography>
  )
}

export const H3 = (props) => {
  const { children, selected, text, comp, ...other } = props

  let font = Fonts.fontBold
  let weight = 700
  let color = Colors.Black1
  let lineHeight = { min: '1.05', w320: '', w480: '', w768: '', w1024: '' }
  let fontSize = {
    min: '23px',
    w320: Utils.cssLinearEq(23, 31, 320, 480),
    w480: '31px',
    w768: '',
    w1024: '',
  }
  let marginBottom = {
    min: '21px',
    w320: '',
    w480: '',
    w768: Utils.cssLinearEq(21, 31, 768, 1024),
    w1024: '31px',
  }
  let marginTop = {
    min: '55px',
    w320: Utils.cssLinearEq(55, 75, 320, 768),
    w480: '',
    w768: '75px',
    w1024: '',
  }

  switch (comp) {
    case 'survey':
      marginBottom = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      marginTop = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      fontSize = { min: '22px', w320: '', w480: '31px', w768: '', w1024: '' }
      break
    case 'benefit':
      color = Colors.Primary1
      marginBottom = { min: '5px', w320: '', w480: '', w768: '', w1024: '' }
      marginTop = { min: '5px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'provider-content':
      font = Fonts.fontBook
      color = Colors.Black3
      weight = 400
      marginBottom = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      marginTop = { min: '0px', w320: '', w480: '', w768: '', w1024: '' }
      break
    case 'article':
      marginTop = { min: '40px', w320: '', w480: '', w768: '', w1024: '' }
    default:
      break
  }

  return (
    <Typography
      comp='h3'
      styles={fontStyle(font, weight, color, lineHeight, '', fontSize, marginBottom, marginTop)}
      {...other}
    >
      {text}
      {children}
    </Typography>
  )
}

export const H2 = (props) => {
  const { children, selected, text, comp, ...other } = props

  let font = Fonts.fontBold
  let weight = 700
  let color = Colors.Black1
  let lineHeight = { min: '1.0', w320: '', w480: '', w768: '', w1024: '' }
  let fontSize = {
    min: '26px',
    w320: Utils.cssLinearEq(26, 31, 320, 480),
    w480: '31px',
    w768: Utils.cssLinearEq(31, 40, 768, 1024),
    w1024: '40px',
  }
  let marginBottom = {
    min: '21px',
    w320: '',
    w480: '',
    w768: Utils.cssLinearEq(21, 31, 768, 1024),
    w1024: '31px',
  }
  let marginTop = { min: '0px', w320: '', w480: '', w768: '20px', w1024: '' }

  switch (comp) {
    case 'light':
      font = Fonts.fontLight
      weight = 300
      marginBottom = {
        min: '60px',
        w320: Utils.cssLinearEq(60, 75, 320, 768),
        w480: '',
        w768: '75px',
        w1024: '',
      }
      marginTop = { min: '47px', w320: '', w480: '', w768: '', w1024: '' }
      lineHeight = { min: '1.1', w320: '', w480: '', w768: '', w1024: '' }
      break
    default:
      break
  }

  return (
    <Typography
      comp='h2'
      styles={fontStyle(font, weight, color, lineHeight, '', fontSize, marginBottom, marginTop)}
      {...other}
    >
      {text}
      {children}
    </Typography>
  )
}

export const H1 = (props) => {
  const { children, selected, text, ...other } = props
  const styles = {
    fontFamily: Fonts.fontBold,
    color: Colors.Black1,
    fontWeight: 700,
    letterSpacing: '0px',
    lineHeight: '1.0',
    marginTop: '0px',
    marginBottom: '21px',
    fontSize: '32px',
    '@media (min-width: 320px)': { fontSize: Utils.cssLinearEq(32, 42, 320, 480) },
    '@media (min-width: 375px)': {},
    '@media (min-width: 414px)': {},
    '@media (min-width: 480px)': { fontSize: '42px' },
    '@media (min-width: 768px)': {
      fontSize: Utils.cssLinearEq(42, 55, 768, 1024),
      marginBottom: Utils.cssLinearEq(21, 31, 768, 1024),
    },
    '@media (min-width: 1024px)': { fontSize: '55px', marginBottom: '31px' },
  }

  return (
    <Typography comp='h1' styles={styles} {...other}>
      {text}
      {children}
    </Typography>
  )
}

export const RegisterEmailDisclaimer = (props) => (
  <Typography
    styles={{ color: Colors.Black3, fontFamily: Fonts.fontBook, fontSize: '12px' }}
    {...props}
  />
)

const Typography = (props) => {
  const { className, style, styles, comp, ...other } = props
  const cssObj = {
    root: Utils.combine({ margin: 0, letterSpacing: '0px', whiteSpace: 'pre-line' }, styles),
  }
  const Component = comp // React component should start with a capital letter
  return (
    <div className={className} style={style}>
      {<Component className={css([cssObj.root])} {...other} /> || <span {...other} />}
    </div>
  )
}

export default Typography
