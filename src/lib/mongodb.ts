import mongoose, { Connection } from 'mongoose';

let cachedConnection: Connection | null = null;

export async function connectToUsersAuthenticatedDB() {
  if (cachedConnection) {
    console.log('Using cached db connection');
    return cachedConnection;
  }

  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'UsersAuthenticated', // Nome do banco de dados
    });

    cachedConnection = cnx.connection;

    console.log('New mongodb connection established to UsersAuthenticated');
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
