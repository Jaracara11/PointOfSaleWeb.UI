import { create } from 'zustand';
import { getUserAuth, setUserAuth } from '../services/user.service';
import { loginUser } from '../repository/userRepository';
import { UserStore } from '../interfaces/user/UserStore';

export const useUserStore = create<UserStore>((set) => ({
  user: getUserAuth(),
  signIn: async (userData) => {
    const userInfo = await loginUser(userData);
    set({ user: userInfo });
    userInfo && setUserAuth(userInfo);
  }
}));
