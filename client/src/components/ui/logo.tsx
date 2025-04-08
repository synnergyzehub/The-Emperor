import React from "react";

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
        <h1 className={`${textColor} font-cormorant font-medium text-2xl md:text-3xl`}>THE EMPEROR</h1>
      ) : (
        <div className={`${textColor} font-cormorant font-medium text-xl`}>E</div>
      )}
    </div>
  );
};

export default Logo;
