import { forwardRef, useCallback } from 'react';
import type {
  InputHTMLAttributes,
  FocusEvent,
  ChangeEvent,
  KeyboardEvent,
} from 'react';

import { styled } from 'styles/stitches';

const StyledInput = styled('input', {
  width: '100%',
  color: '$grey700',
  backgroundColor: '$grey100',
  boxShadow: 'inset 0 0 0 1px $colors$grey300',
  borderRadius: '$2',
  border: 'none',
  outline: 'none',
  padding: '$3 $4',
  transition: 'box-shadow 0.2s ease',

  hover: {
    boxShadow: 'inset 0 0 0 1px $colors$grey400',
  },

  focus: {
    boxShadow: 'inset 0 0 0 1px $colors$grey500',
  },
});

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ onBlur, onChange, onKeyUp, type, disabled, readOnly, ...rest }, ref) => {
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e);
    },
    [onBlur],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
    },
    [onChange],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyUp && onKeyUp(e);
    },
    [onKeyUp],
  );
  return (
    <StyledInput
      ref={ref}
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      {...rest}
    />
  );
});
