import { useState } from 'react';
import { C, FONT, TOKENS } from './tokens';

export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
  error,
  helpText,
}) {
  const [focused, setFocused] = useState(false);
  const id = name || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const isInvalid = Boolean(error);

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

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        aria-invalid={isInvalid}
        aria-describedby={isInvalid ? `${id}-error` : helpText ? `${id}-help` : undefined}
        className={isInvalid ? 'ui-field ui-field-invalid' : 'ui-field'}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: FONT.body,
          fontSize: 15,
          lineHeight: 1.6,
          padding: '12px 16px',
          border: `1.5px solid ${isInvalid ? C.error : focused ? C.borderFocus : C.borderDefault}`,
          borderRadius: TOKENS.radii.md,
          width: '100%',
          background: isInvalid ? 'rgba(196,61,61,0.04)' : C.bgPrimary,
          color: C.textPrimary,
          outline: 'none',
          resize: 'vertical',
          transition: `border-color ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out},
                       box-shadow ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out},
                       background-color ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out}`,
          boxShadow: focused
            ? isInvalid
              ? '0 0 0 3px rgba(196,61,61,0.16)'
              : '0 0 0 3px rgba(27,58,92,0.16)'
            : 'none',
          minHeight: 120,
        }}
      />

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
