import React, { ForwardedRef } from "react";

const ICON_STROKE_COLOR_RGB = "rgb(168 162 158)";

interface IFormInput {
  placeholder: string;
  type: string;
  name: string;
  errors?: any;
}

const FormInput = React.forwardRef(function FormInput(
  { placeholder, type, name, errors, ...rest }: IFormInput,
  ref: ForwardedRef<HTMLInputElement>
) {
  function getIcon(placeholder: string) {
    switch (placeholder) {
      case "username":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={ICON_STROKE_COLOR_RGB}
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        );
      case "password":
      case "confirmed password":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={ICON_STROKE_COLOR_RGB}
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        );
      case "email":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={ICON_STROKE_COLOR_RGB}
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        );
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          className="formInputStyle w-[85%] pl-10 outline-none"
          placeholder={placeholder}
          {...rest}
        />
        <div className="w-7 absolute translate-x-2">{getIcon(placeholder)}</div>
      </div>
      {errors && (
        <div className="translate-y-[-5px] text-accent-main mt-1">
          {errors[name]?.message}
        </div>
      )}
    </div>
  );
});

export default FormInput;
