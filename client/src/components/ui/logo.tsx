import React from "react";
import logoSvg from "../../assets/logo.svg";

interface LogoProps {
  variant?: "full" | "icon";
  color?: "gold" | "white";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = "full", 
  color = "gold",
  className = "" 
}) => {
  const textColor = color === "gold" ? "text-[#D4AF37]" : "text-white";
  
  return (
    <div className={`${className}`}>
      {variant === "full" ? (
        <div className="flex items-center">
          <img src={logoSvg} alt="The Emperor" className="h-12 md:h-14" />
        </div>
      ) : (
        <div className={`${textColor} font-cormorant font-medium text-xl`}>E</div>
      )}
    </div>
  );
};

export default Logo;
