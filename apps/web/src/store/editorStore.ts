import { create } from 'zustand';
import { JSONContent } from '@tiptap/react';

interface EditorState {
  content: JSONContent | null;
  htmlContent: string;
  title: string;
  tags: string[];
  isDirty: boolean;
  lastSyncedAt: number | null;
  
  // Video Sync State
  videoUrl: string | null;
  isPlaying: boolean;
  progress: number;
  duration: number;

  setContent: (content: JSONContent, html: string) => void;
  setTitle: (title: string) => void;
  setTags: (tags: string[]) => void;
  setVideoUrl: (url: string) => void;
  setPlaybackState: (state: Partial<{ isPlaying: boolean; progress: number; duration: number }>) => void;
  autosave: () => Promise<void>;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  content: null,
  htmlContent: '',
  title: '',
  tags: [],
  isDirty: false,
  lastSyncedAt: null,
  
  videoUrl: null,
  isPlaying: false,
  progress: 0,
  duration: 0,

  setVideoUrl: (url) => set({ videoUrl: url, isDirty: true }),
  setPlaybackState: (state) => set({ ...state }),
  
  setContent: (content: JSONContent, htmlContent: string) => {
    set({ content, htmlContent, isDirty: true, lastSyncedAt: Date.now() });
    
    // Minimal mock for debounced autosave
    if ((window as any)._saveTimeout) {
      clearTimeout((window as any)._saveTimeout);
    }
    (window as any)._saveTimeout = setTimeout(() => {
      get().autosave();
    }, 1500);
  },
  setTitle: (title: string) => set({ title, isDirty: true }),
  setTags: (tags: string[]) => set({ tags, isDirty: true }),
  autosave: async () => {
    // Implement POST to /posts/:id
    console.log('Autosaving...', get().title, get().content);
    set({ isDirty: false });
  },
}));
