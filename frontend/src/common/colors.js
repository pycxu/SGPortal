export const Black1 = '#202020'
export const Black2 = '#4d4d4d'
export const Black3 = '#797979'
export const Primary1 = '#00afc5'
export const disabledColor = 'rgb(204, 204, 204)'

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export const monochromatic = (color, steps) => {
  const rgb = hexToRgb(color)
  return rgbToHex(rgb.r + steps * 51, rgb.g + steps * 16, rgb.b + steps * 12)
}
