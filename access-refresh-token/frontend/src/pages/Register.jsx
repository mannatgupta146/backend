import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  
    const { register, handleSubmit, onRegisterSubmit, errors, showPassword, setShowPassword, isSubmitting } = useAuth()

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 p-4 font-sans text-neutral-900">
      <div className="w-full max-w-md bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
            Create Account
          </h2>
          <p className="text-neutral-500 text-sm mt-1">Get started with your free account today</p>
        </div>

        <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
              className={`w-full px-4 py-3 bg-white border rounded text-neutral-950 placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all duration-150 ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-neutral-300 focus:border-black focus:ring-black'
              }`}
            />
            {errors.name && (
              <span className="text-red-600 text-xs mt-1 block font-medium">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full px-4 py-3 bg-white border rounded text-neutral-950 placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all duration-150 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-neutral-300 focus:border-black focus:ring-black'
              }`}
            />
            {errors.email && (
              <span className="text-red-600 text-xs mt-1 block font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                className={`w-full pl-4 pr-12 py-3 bg-white border rounded text-neutral-950 placeholder-neutral-400 focus:outline-none focus:ring-1 transition-all duration-150 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-neutral-300 focus:border-black focus:ring-black'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 focus:outline-none p-1 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-600 text-xs mt-1 block font-medium">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-neutral-950 hover:bg-neutral-850 text-white font-semibold rounded shadow transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Link back to Login */}
        <div className="mt-8 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link
            to="/"
            className="text-neutral-950 hover:text-neutral-800 font-semibold transition-colors underline underline-offset-4"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register