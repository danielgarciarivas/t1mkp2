import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import { authService } from '../../services/authService';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        await authService.register(formData.email, formData.password);
        setErrors({ success: 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.' });
        setIsRegister(false);
        setFormData({ email: formData.email, password: '' });
      } else {
        const result = await authService.login(formData.email, formData.password);
        if (result.access_token) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon">T1</div>
            <span className="logo-text">MARKETPLACE</span>
          </div>
          <h1 className="login-title">{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h1>
          <p className="login-subtitle">{isRegister ? 'Regístrate en T1 Marketplace' : 'Accede a tu panel de administración'}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errors.general && (
            <div className="error-message">
              {errors.general}
            </div>
          )}
          
          {errors.success && (
            <div className="success-message">
              {errors.success}
            </div>
          )}

          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            <div className="login-button-content">
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>{isRegister ? 'Registrando...' : 'Iniciando sesión...'}</span>
                </>
              ) : (
                <>
                  <span>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</span>
                  <span className="login-button-icon">→</span>
                </>
              )}
            </div>
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
            <button 
              type="button" 
              onClick={() => {
                setIsRegister(!isRegister);
                setErrors({});
                setFormData({ email: '', password: '' });
              }}
              className="link-button"
            >
              {isRegister ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </p>
          {!isRegister && <p>¿Olvidaste tu contraseña? <a href="#forgot">Recuperar</a></p>}
        </div>
      </div>
    </div>
  );
};

export default Login;