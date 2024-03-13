import { create } from "zustand";

function getUser() {
  try {
    let a = localStorage.getItem("user-info");
    return a ? JSON.parse(a) : null;
  } catch (error) {
    console.error("Error parsing user info:", error);
    return null;
  }
}

const useAuthStore = create((set) => ({
  user: () => getUser(),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
