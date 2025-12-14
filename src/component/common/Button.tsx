//COMPONENT INPUT PROPS
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    type?: 'button' | 'submit';
    disabled?: boolean;
    icon?: React.ReactNode;
}
const FieldInput = ({ children, onClick, variant='primary', type='button', disabled, icon}:ButtonProps) => {
    const baseClass = 'px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 justify-center';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-blue-300 disabled:text-blue-300'
    };
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClass} ${variants[variant]}`}
        >
            {icon}
            {children}
        </button>
    );
}

export default FieldInput;
