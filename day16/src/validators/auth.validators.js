import {body, validationResult} from 'express-validator';

const validate = (req, res, next) => {
  ;(req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    return res.status(400).json({
      errors: errors.array(),
    })
  }
}

export const registerValidator = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("username").notEmpty().isString().withMessage("Username is required"),
  body("password").custom((value)=> {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(value)) {
      throw new Error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character")
    }
  }),
  validate,
]
