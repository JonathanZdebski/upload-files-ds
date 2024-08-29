import mongoose, { Connection } from 'mongoose';

let cachedConnection: Connection | null = null;

export async function connectToUsersAuthenticatedDB(): Promise<Connection> {
  if (cachedConnection) {
    console.log('Using cached db connection');
    return cachedConnection;
  }

  try {
    // Conectar ao banco de dados MongoDB
    const connection = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'UsersAuthenticated', // Nome do banco de dados

    });

    // Armazenar a conexão em cache
    cachedConnection = connection.connection;

    console.log('New mongodb connection established to UsersAuthenticated');
    return cachedConnection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
