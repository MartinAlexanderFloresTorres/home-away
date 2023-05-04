import { create } from 'zustand';
import { SafeUser } from '@/app/types';

interface ProfileModalStore {
  isOpen: boolean;
  currentUser: SafeUser | null;
  onOpen: (currentUser: SafeUser | null) => void;
  onClose: () => void;
}

const useProfileModal = create<ProfileModalStore>((set) => ({
  isOpen: false,
  currentUser: null,
  onOpen: (currentUser) => set({ isOpen: true, currentUser }),
  onClose: () => set({ isOpen: false })
}));

export default useProfileModal;
