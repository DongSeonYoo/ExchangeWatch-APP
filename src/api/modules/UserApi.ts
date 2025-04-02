import { api } from "../custom-Instance";
import { UserProfileResponse } from "../types/user/dto/UserDto";

export const UserApi = {
  getUserInformation: async () => {
    return await api.get<UserProfileResponse>("/users/profile");
  },

  getUserProfile: async (userIdx: number) => {
    try {
      const response = await api.get<UserProfileResponse>(`/users/${userIdx}`);
      return response;
    } catch (error) {
      console.error("Error fetching user info", error);
      throw error;
    }
  },

  updateUserInfo: async (userIdx: number, data: any) => {
    try {
      const response = await api.put(`/users/${userIdx}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating user info", error);
      throw error;
    }
  },
};
