// src/types/User.ts
export interface User {
  name: string;
  secondaryName?: string;
  email: string;
  image?: string;
  hasPaid: boolean; // Adicione esta linha
}
