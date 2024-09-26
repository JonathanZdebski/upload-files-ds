import { create } from "zustand";

export const useUserStore = create((set) => ({
  name: "",
  email: "",
  image: "", // Adicionar o campo de imagem
  setName: (newName) => set({ name: newName }),
  setEmail: (newEmail) => set({ email: newEmail }),
  setImage: (newImage) => set({ image: newImage }), // Função para atualizar a imagem
}));
