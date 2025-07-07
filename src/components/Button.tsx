
import { BUTTON_VARIANTS, DEFAULT_BUTTON_VARIANT } from "@constants/button/button";
import { cn } from "@utils/cn"


type ButtonVariant = keyof typeof BUTTON_VARIANTS

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant; 
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = DEFAULT_BUTTON_VARIANT, 
  className
}) => { 
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-4 py-2 font-semibold w-[55px] h-[36px]',
        BUTTON_VARIANTS[variant],
        {' cursor-not-allowed' : disabled},
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
