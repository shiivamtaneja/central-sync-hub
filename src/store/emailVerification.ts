import { create } from 'zustand';

type EmailVerification = {
  email: string,
  // eslint-disable-next-line no-unused-vars
  set: (email: string) => void,
  reset: () => void,
}

export const emailVerificationStore = create<EmailVerification>((set) => ({
  email: '',
  set: (newEmail) => set({ email: newEmail }),
  reset: () => set({ email: '' }),
}));