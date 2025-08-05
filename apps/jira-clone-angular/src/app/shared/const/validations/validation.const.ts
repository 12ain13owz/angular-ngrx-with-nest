export const PATTERN_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

export const validationMessages = {
  email: {
    required: 'Email is required',
    email: 'Email is not valid',
  },
  password: {
    required: 'Password is required',
    pattern:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  },
} as const
