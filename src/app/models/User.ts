import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  secondaryName: { type: String }, 
  email: { type: String, required: true, unique: true },
  image: String,
  hasPaid: { type: Boolean, default: false }, // Campo para verificar pagamento
  lastLogin: { type: Date, default: null }, // Campo para a data do último login
  birthDate: { type: Date, default: null }, // Campo para data de nascimento
  phoneNumber: { type: String, default: null }, // Campo para número de telefone
  gender: { type: String, enum: ['male', 'female', 'other'], default: null } // Campo para gênero
}, { timestamps: true });

console.log('Mongoose models:', mongoose.models);

const User = mongoose.models?.User || mongoose.model('User', userSchema);

console.log('User model:', User);

export default User;
