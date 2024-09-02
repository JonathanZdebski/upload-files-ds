import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      {/* Exemplo de carregamento para um item */}
      <Skeleton width={60} height={20} />
      <Skeleton width={100} height={20} />
      <Skeleton width={40} height={40} borderRadius="50%" />
    </div>
  );
};

export default LoadingSpinner;
