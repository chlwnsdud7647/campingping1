import { forwardRef } from 'react';

interface inputProps {
  placeholder: string;
  hasError?: boolean;
  errorMessage?: string;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, inputProps>(
  ({ placeholder, type, hasError, errorMessage, ...rest }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          className="w-full h-[40px] p-2.5 border focus:border-Green placeholder:text-LightGray rounded outline-none"
          {...rest}
        />
        {hasError && errorMessage && (
          <p className="text-Green text-description">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'input';

export default Input;
