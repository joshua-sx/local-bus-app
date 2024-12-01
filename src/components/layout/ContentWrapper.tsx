// src/components/layout/ContentWrapper.tsx
import React, { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className = "",
}) => (
  <div className={`w-full max-w-[1000px] mx-auto px-4 ${className}`}>
    {children}
  </div>
);
