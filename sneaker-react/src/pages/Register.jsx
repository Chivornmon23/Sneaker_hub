import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // reuse same auth styles

function Register() {
  const navigate = useNavigate();

  // ── Form state ───────────────────────────────────────
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ── Handle input changes ─────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  // ── Validate form ────────────────────────────────────
  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  }

  // ── Handle submit ────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call (replace with Laravel later)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Redirect to login after 1.5s
      setTimeout(() => navigate('/login'), 1500);
    }, 1000);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <Link to="/" className="auth-card__logo">SneakerHub</Link>

        {/* Heading */}
        <h1 className="auth-card__title">Create an account</h1>
        <p className="auth-card__sub">
          Join SneakerHub for early access and member deals.
        </p>

        {/* Success message */}
        {success && (
          <div className="auth-success">
            ✓ Account created! Redirecting to login...
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Mon Chivorn"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && (
              <span className="form-error">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && (
              <span className="form-error">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && (
              <span className="form-error">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <span className="form-error">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-btn"
            disabled={loading || success}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Footer link */}
        <div className="auth-card__footer">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;