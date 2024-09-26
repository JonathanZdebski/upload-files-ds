import { connectToUsersAuthenticatedDB } from "@/lib/mongodb"; // Importação nomeada
import User from "@/app/models/User"; // Ajuste o caminho conforme necessário

// Função para buscar usuário por ID
export async function GET(request: Request, { params }: any) {
  await connectToUsersAuthenticatedDB();

  const { id } = params; // Certifique-se de que 'id' está definido aqui

  console.log("Buscando usuário com ID:", id); // Log do ID que está sendo buscado

  try {
    const user = await User.findById(id);
    if (!user) {
      console.error(`Usuário com ID ${id} não encontrado.`);
      return new Response("Usuário não encontrado", { status: 404 });
    }

    // Selecionar apenas os campos necessários
    const userData = {
      name: user.name,
      email: user.email,
      image: user.image,
      hasPaid: user.hasPaid,
      location: user.location,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt, // Adicionando createdAt
      updatedAt: user.updatedAt, // Adicionando updatedAt
    };

    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return new Response("Erro ao buscar usuário", { status: 500 });
  }
}

// Função para atualizar usuário
export async function PUT(request: Request, { params }: any) {
  await connectToUsersAuthenticatedDB();

  const { id } = params; // Certifique-se de que 'id' está definido aqui
  const { name, email, image, location } = await request.json(); // Incluindo o campo da localização

  console.log("Atualizando usuário com ID:", id); // Log do ID que está sendo atualizado

  try {
    // Atualizando o usuário com os novos dados, incluindo o campo da imagem e localização
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, image, location }, // Atualizando os campos nome, email, imagem e localização
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.error(`Usuário com ID ${id} não encontrado.`);
      return new Response("Usuário não encontrado", { status: 404 });
    }

    // Retornar apenas os dados atualizados
    const userData = {
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      hasPaid: updatedUser.hasPaid,
      location: updatedUser.location,
      lastLogin: updatedUser.lastLogin,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return new Response("Erro ao atualizar usuário", { status: 500 });
  }
}
