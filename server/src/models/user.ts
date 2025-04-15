import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

enum UserRole {
  Admin = 'admin',
  User = 'user',
}

interface IUser extends Document {
  _id: mongoose.ObjectId,
  email: string;
  username: string;
  password: string;
  role: UserRole;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  otp?: string;
  otpExpiry?: number;
  emailVerified: boolean;
  resetToken?: string;
  resetTokenExpires?: number;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(UserRole), 
    default: UserRole.User,       
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Number,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  resetToken: { 
    type: String,
  },
  resetTokenExpires: {
    type: Number,
  },
}, {
  timestamps: true,
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// set up a pipeline
// set up a not local db
// encrypt the jwt
// inside -> standart application security testing 


userSchema.methods.isResetTokenExpired = function (): boolean {
  if (this.resetTokenExpires && Date.now() > this.resetTokenExpires) {
    return true;
  }
  return false;
};

userSchema.methods.isOtpExpired = function (): boolean {
  if (this.otpExpiry && Date.now() > this.otpExpiry) {
    return true;
  }
  return false;
};

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser, UserRole };