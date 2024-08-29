"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Canceled() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de multi-files após 3 segundos
    const redirectTimer = setTimeout(() => {
      router.push("/upload-multi-files");
    }, 2000); // 3000 milissegundos = 3 segundos

    // Limpa o timer se o componente for desmontado antes do redirecionamento
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen p-4">
      <Image
        className="mb-6 rounded-2xl"
        src="/credit-card.png"
        width={200}
        height={200}
        alt="secure payment"
      />
      <p className="text-xl font-semibold">
        Payment was canceled. Please try again.
      </p>
    </div>
  );
}
