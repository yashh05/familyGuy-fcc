import React from "react";

export const Container = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      {...rest}
      className={`px-5 w-full max-w-screen-md m-auto ${className}`}
    >
      {children}
    </div>
  );
};
