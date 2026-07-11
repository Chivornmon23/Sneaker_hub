import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  // ── Form state ──────────────────────────────────────
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  // ── Handle input changes ─────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear the error for this field as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  // ── Validate form ────────────────────────────────────
  function validate() {
    const newErrors = {};

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

    return newErrors;
  }

  // ── Handle submit ────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();

    // Run validation
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call (we'll replace this with Laravel later)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Redirect to home after 1.5s
      setTimeout(() => navigate('/'), 1500);
    }, 1000);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <Link to="/" className="auth-card__logo">SneakerHub</Link>

        {/* Heading */}
        <h1 className="auth-card__title">Welcome back</h1>
        <p className="auth-card__sub">Login to your account to continue.</p>

        {/* Success message */}
        {success && (
          <div className="auth-success">
            ✓ Login successful! Redirecting...
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>

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
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="form-error">{errors.password}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-btn"
            disabled={loading || success}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Footer link */}
        <div className="auth-card__footer">
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;