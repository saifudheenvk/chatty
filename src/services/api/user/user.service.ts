import axiosInstance from '@services/axios';

class UserService {
  async checkCurrentUser() {
    const response = await axiosInstance.post('/user/currentuser');
    return response;
  }

  async getAllUsers(page: number) {
    const response = await axiosInstance.get(`/user/all/${page}`);
    return response;
  }

  async getUserSuggestions() {
    const response = await axiosInstance.get('/user/profile/user/suggestions');
    return response;
  }
}

export const userService = new UserService();
