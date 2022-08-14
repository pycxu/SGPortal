export const combine = (s1, s2) => {
  return { ...s1, ...s2 }
}

export const cssLinearEq = (vMin, vMax, wMin, wMax) => {
  let a = 100 * ((vMax - vMin) / (wMax - wMin))
  let b = vMin - wMin * ((vMax - vMin) / (wMax - wMin))
  return `calc(${a.toFixed(2)}vw + ${b.toFixed(2)}px)`
}

export const isDevelopment = () => {
  return !import.meta.env.NODE_ENV || import.meta.env.NODE_ENV === 'development'
}
