import React, { forwardRef } from "react";
import './Input.scss';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelText?: string;
  className?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  (
    {
      name,
      labelText,
      value,
      type = "text",
      id,
      placeholder,
      className = "",
      handleChange,
      onClick,
      onFocus,
      onBlur,
      style,
      ...rest
    },
    ref
  ) => (
    <div className="form-row">
      {labelText && (
        <label htmlFor={name} className="form-label">
          {labelText}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`form-input ${className}`}
        style={style}
        autoComplete="off"
        {...rest}
      />
    </div>
  )
);

export default Input;
