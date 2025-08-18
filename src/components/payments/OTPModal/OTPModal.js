import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import './OTPModal.css';

const OTPModal = ({ 
  isOpen,
  onClose,
  onVerify,
  title = "Verificación de Seguridad",
  message = "Se ha enviado un código de verificación a tu número registrado",
  phoneNumber = "****1234"
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setOtp(['', '', '', '', '', '']);
      setError('');
      setTimeLeft(300);
      setCanResend(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`#otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`#otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      setOtp(pastedData.split(''));
      setError('');
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Por favor ingrese el código completo de 6 dígitos');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Simular verificación del OTP
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Para el demo, aceptar códigos que terminen en '123'
      if (otpCode === '123456' || otpCode.endsWith('123')) {
        onVerify(otpCode);
      } else {
        setError('Código incorrecto. Para demo, use: 123456');
        setOtp(['', '', '', '', '', '']);
        // Focus first input
        const firstInput = document.querySelector('#otp-0');
        if (firstInput) firstInput.focus();
      }
    } catch (err) {
      setError('Error al verificar el código. Intente nuevamente.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = () => {
    setTimeLeft(300);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    // En una implementación real, aquí se enviaría un nuevo código
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content otp-modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="otp-info">
            <div className="security-icon">🔐</div>
            <p className="otp-message">{message}</p>
            <p className="phone-info">
              Enviado a: +52 {phoneNumber}
            </p>
          </div>

          <div className="otp-input-section">
            <label className="otp-label">Código de Verificación:</label>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`otp-input ${error ? 'error' : ''}`}
                  maxLength={1}
                  disabled={isVerifying}
                />
              ))}
            </div>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </div>

          <div className="otp-timer">
            {timeLeft > 0 ? (
              <span>Código válido por: {formatTime(timeLeft)}</span>
            ) : (
              <span className="expired">Código expirado</span>
            )}
          </div>

          <div className="otp-actions">
            {canResend || timeLeft === 0 ? (
              <button 
                className="resend-button"
                onClick={handleResendCode}
                disabled={isVerifying}
              >
                Reenviar código
              </button>
            ) : (
              <span className="resend-info">
                Podrás solicitar un nuevo código en {formatTime(timeLeft)}
              </span>
            )}
          </div>

         
        </div>

        <div className="modal-footer">
          <Button 
            variant="secondary" 
            onClick={onClose}
            disabled={isVerifying}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary"
            onClick={handleVerify}
            disabled={isVerifying || otp.join('').length !== 6}
            loading={isVerifying}
          >
            {isVerifying ? 'Verificando...' : 'Verificar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;