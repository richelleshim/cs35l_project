import { create } from "zustand";

function getUser() {
  let a = localStorage.getItem("user-info");
  return JSON.parse(a);
}

const useAuthStore = create((set) => ({
  user: () => getUser(),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
