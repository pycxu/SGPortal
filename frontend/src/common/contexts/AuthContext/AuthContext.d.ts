type AuthProviderProps = {
  children: React.ReactNode
}

type authTokensType = {
    access: string
    refresh: string
}

type signupConsumerProps = {
  username: string
  email: string
  password: string
}

type forgetPasswordProps = {
  email: string
}

type loginUserProps = {
  email: string
  password: string
}

type resetPasswordProps = {
  uidb64: string
  token: string
  password: string
}

type verifyEmailProps = {
  uidb64: string
  token: string
}