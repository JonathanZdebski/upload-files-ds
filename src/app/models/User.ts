import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  secondaryName: { type: String }, 
  email: { type: String, required: true, unique: true },
  image: String,
  hasPaid: { type: Boolean, default: false }, // Campo para verificar pagamento
  location: { type: String, default: null }, // Novo campo para localização
  lastLogin: { type: Date, default: null } // Novo campo para a data do último login
}, { timestamps: true });

console.log('Mongoose models:', mongoose.models);

const User = mongoose.models?.User || mongoose.model('User', userSchema);

console.log('User model:', User);

export default User;
