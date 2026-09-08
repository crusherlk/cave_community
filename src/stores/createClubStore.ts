import { create } from "zustand";

interface CreateClubState {
  isCreateClub: boolean;
  setIsCreateClub: (state: boolean) => void;
}

const useCreateClubStore = create<CreateClubState>((set) => ({
  isCreateClub: false,
  setIsCreateClub: (state) => set({ isCreateClub: state }),
}));

export const useCreateClubState = () =>
  useCreateClubStore((state) => state.isCreateClub);

export const useCreateClubActions = () =>
  useCreateClubStore((state) => state.setIsCreateClub);
