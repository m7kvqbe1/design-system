import React from 'react'
import uuid from 'uuid'

interface RadioProps {
  className?: string
  id?: string
  label: string
  disabled?: boolean
  name: string
  value?: string
  onChange?: (event: React.SyntheticEvent) => void
  onBlur?: (event: React.SyntheticEvent) => void
}

const Radio: React.FC<RadioProps> = ({
  className = '',
  id = uuid(),
  label,
  disabled = false,
  value,
  name,
  onChange,
  onBlur,
  ...rest
}) => {
  return (
    <div className={`rn-radio ${className}`} data-testid="container">
      <div className="rn-radio__outer-wrapper">
        <label className="rn-radio__label" htmlFor={id} data-testid="label">
          <input
            id={id}
            className="rn-radio__radio"
            type="radio"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            {...rest}
            data-testid="radio"
          />
          <span className="rn-radio__checkmark" />
          {label}
        </label>
      </div>
    </div>
  )
}

Radio.displayName = 'Radio'

export default Radio