import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: LucideIcon;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  isLoading = false,
  icon: Icon,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-4 text-base font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-med-600 hover:bg-med-700 text-white shadow-lg shadow-med-200/50 focus:ring-med-500",
    secondary: "bg-white text-med-800 border-2 border-transparent hover:bg-med-50 shadow-md focus:ring-med-300",
    outline: "bg-transparent border-2 border-med-200 text-med-700 hover:bg-med-50 focus:ring-med-300",
    ghost: "bg-transparent text-slate-500 hover:text-med-600 hover:bg-med-50/50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="w-5 h-5 mr-3 -ml-1 text-current animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: ReactNode; className?: string; onClick?: () => void }> = ({ 
  children, 
  className = '',
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-slate-100 p-6 ${onClick ? 'cursor-pointer hover:border-med-200 transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// --- Container ---
export const Container: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`w-full max-w-md mx-auto min-h-screen flex flex-col bg-slate-50 relative ${className}`}>
    {children}
  </div>
);

// --- Header ---
export const Header: React.FC<{ title?: string; subtitle?: string; leftIcon?: ReactNode }> = ({ title, subtitle, leftIcon }) => (
  <header className="px-6 py-6 bg-white border-b border-slate-100 flex items-center sticky top-0 z-10">
    {leftIcon && <div className="mr-4">{leftIcon}</div>}
    <div>
      {title && <h1 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h1>}
      {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
  </header>
);