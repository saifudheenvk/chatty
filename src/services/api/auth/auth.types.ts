export interface ISignUp {
  username: string;
  email: string;
  password: string;
  avatarColor: string;
  avatarImage: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IResetPassword {
  password: string;
  confirmPassword: string;
}
