import React from 'react';
import './Input.css';

const Input = ({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  ...props 
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className={`input-label ${required ? 'input-label--required' : ''}`}>
          {label}
        </label>
      )}
      <input
        className={`input ${error ? 'input--error' : ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;