import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom CSS for fade-in and slide-up animations
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.8s ease-in forwards;
    animation-play-state: paused;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .slide-up {
    transform: translateY(20px);
    opacity: 0;
    animation: slideUp 0.8s ease-out forwards;
    animation-play-state: paused;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .fabric-swatch {
    transition: transform 0.3s ease;
  }
  
  .fabric-swatch:hover {
    transform: scale(1.05);
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #F8F5E6;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #D4AF37;
    border-radius: 3px;
  }
  
  .luxury-shadow {
    box-shadow: 0 4px 20px rgba(10, 31, 68, 0.08);
  }

  /* Custom font classes */
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
  
  .font-montserrat {
    font-family: 'Montserrat', sans-serif;
  }
  
  .font-cormorant {
    font-family: 'Cormorant Garamond', serif;
  }

  /* Emperor color scheme */
  :root {
    --emperor-gold: #D4AF37;
    --emperor-navy: #0A1F44;
    --emperor-black: #111111;
    --emperor-cream: #F8F5E6;
    --emperor-ivory: #FFFFF0;
    --emperor-burgundy: #800020;
    --emperor-charcoal: #36454F;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
