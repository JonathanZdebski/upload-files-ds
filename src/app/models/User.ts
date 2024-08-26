import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: String,
  permissions: [String],
  
}, { timestamps: true });

// Log para depuração
console.log('Mongoose models:', mongoose.models);

const User = mongoose.models?.User || mongoose.model('User', userSchema);

console.log('User model:', User);

export default User;
