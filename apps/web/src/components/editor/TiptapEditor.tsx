'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEditorStore } from '../../store/editorStore';
import { useEffect } from 'react';

export const TiptapEditor = () => {
  const setContent = useEditorStore((state) => state.setContent);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
    ],
    content: '<p>Start drafting your post...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none min-h-[500px]',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON(), editor.getHTML());
    },
  });

  // Initialize store content
  useEffect(() => {
    if (editor) {
      setContent(editor.getJSON(), editor.getHTML());
    }
  }, [editor, setContent]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <EditorContent editor={editor} />
    </div>
  );
};
