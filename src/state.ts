import { create } from "zustand";
import { Block } from "./types";

type BlockStore = {
  selectedBlock: Block | null;
  setSelectedBlock: (block: Block | null) => void;
};

export const useBlockStore = create<BlockStore>((set) => ({
  selectedBlock: null,
  setSelectedBlock: (block) => set(() => ({ selectedBlock: block })),
}));

type PageIndexStore = {
  selectedPageIndex: number;
  setSelectedPageIndex: (index: number) => void;
};

export const usePageIndexStore = create<PageIndexStore>((set) => ({
  selectedPageIndex: 1,
  setSelectedPageIndex: (index) => set(() => ({ selectedPageIndex: index })),
}));
