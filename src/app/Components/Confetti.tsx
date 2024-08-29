// src/components/Confetti.tsx
import React from "react";
import confetti from "canvas-confetti";

const Confetti: React.FC = () => {
  React.useEffect(() => {
    // Função para disparar o confete
    const shootConfetti = () => {
      confetti({
        particleCount: 200,
        spread: 150,
        origin: { y: 0.6 },
      });
    };

    // Dispara o confete quando o componente é montado
    shootConfetti();
  }, []);

  return null; // Este componente não precisa renderizar nada
};

export default Confetti;
