import { create } from 'zustand'

export type ModalId = string

type ModalState = {
  openModals: ModalId[]
  openModal: (modalId: ModalId) => void
  closeModal: (modalId: ModalId) => void
  closeAllModals: () => void
  getTopModal: () => ModalId | undefined
}

export const useModalStore = create<ModalState>((set, get) => ({
  openModals: [],
  openModal: (modalId) =>
    set((state) => ({ openModals: [...state.openModals, modalId] })),
  closeModal: (modalId) =>
    set((state) => ({
      openModals: state.openModals.filter((id) => id !== modalId),
    })),
  closeAllModals: () => set({ openModals: [] }),
  getTopModal: () => {
    const { openModals } = get()
    return openModals.length > 0 ? openModals[openModals.length - 1] : undefined
  },
}))
