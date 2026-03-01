import { useState } from 'react';
import { C, FONT, TOKENS } from './tokens';

// Handles: text / email / tel / number inputs + select (via options prop).
// For textarea, use <Textarea /> component.
export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required,
  options, // array of { value, label } -> renders <select>
  error,
  helpText,
}) {
  const [focused, setFocused] = useState(false);
  const id = name || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const isInvalid = Boolean(error);

  const inputStyle = {
    fontFamily: FONT.body,
    fontSize: 15,
    lineHeight: 1.5,
    padding: '12px 16px',
    border: `1.5px solid ${isInvalid ? C.error : focused ? C.borderFocus : C.borderDefault}`,
    borderRadius: TOKENS.radii.md,
    width: '100%',
    background: isInvalid ? 'rgba(196,61,61,0.04)' : C.bgPrimary,
    color: C.textPrimary,
    outline: 'none',
    transition: `border-color ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out},
                 box-shadow ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out},
                 background-color ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out}`,
    boxShadow: focused
      ? isInvalid
        ? '0 0 0 3px rgba(196,61,61,0.16)'
        : '0 0 0 3px rgba(27,58,92,0.16)'
      : 'none',
    minHeight: 48,
  };

  const ariaProps = {
    'aria-invalid': isInvalid,
    'aria-describedby': isInvalid ? `${id}-error` : helpText ? `${id}-help` : undefined,
  };

  return (
    <div style={{ marginBottom: 24 }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 8,
            color: C.textPrimary,
            lineHeight: 1.4,
          }}
        >
          {label}
          {required && <span style={{ color: C.error }}> *</span>}
        </label>
      )}

      {options ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          {...ariaProps}
          className={isInvalid ? 'ui-field ui-field-invalid' : 'ui-field'}
          style={{ ...inputStyle, appearance: 'auto', paddingRight: 40 }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <option value="">{placeholder || 'Odaberi…'}</option>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          {...ariaProps}
          className={isInvalid ? 'ui-field ui-field-invalid' : 'ui-field'}
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}

      {helpText && !isInvalid && (
        <p id={`${id}-help`} className="ui-field-message" style={{ color: C.textTertiary }}>
          {helpText}
        </p>
      )}

      {isInvalid && (
        <p
          id={`${id}-error`}
          role="alert"
          className="ui-field-message"
          style={{ color: C.error, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500 }}
        >
          âš  {error}
        </p>
      )}
    </div>
  );
}
