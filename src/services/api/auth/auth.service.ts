import axiosInstance from "../../axios";
import { ILogin, IResetPassword, ISignUp } from "./auth.types";


class AuthService {
  async signUp(body: ISignUp) {
    const response = await axiosInstance.post('/auth/signup', body);
    return response;
  }

  async signIn(body: ILogin) {
    const response = await axiosInstance.post('/auth/signin', body);
    return response;
  }

  async forgotPassword(email: string) {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response;
  }

  async resetPassword(body: IResetPassword, token: string) {
    const response = await axiosInstance.post(`/auth/reset-password/${token}`, body);
    return response;
  }

  async signOut() {
    const response = await axiosInstance.get('/auth/signout');
    return response;
  }
}


export const authService = new AuthService();
