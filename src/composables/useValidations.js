export const required = (val) => {
  return !!val || 'This field is required'
}

export const email = (value) => {
  const regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regx.test(value) || 'Invalid Email'
}
export const password = (val) => {
  const hasUpperCase = /[A-Z]/.test(val)
  const hasNumber = /\d/.test(val)
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(val)

  if (hasUpperCase && hasNumber && hasSpecialChar && val.length >= 8 && val.length <= 32) {
    return true
  } else {
    return 'Must contain at least one uppercase letter, one number, one special character, and be 8 to 32 characters long'
  }
}

export const confirmPassword = (val, pass) => {
  return val == pass || 'Passwords are not same'
}

