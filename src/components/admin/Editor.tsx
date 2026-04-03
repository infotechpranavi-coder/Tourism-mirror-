"use client";

import React, { useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

type ReactQuillComponent = typeof import('react-quill-new').default;

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'indent',
  'link',
  'image',
  'color',
  'background',
  'video',
];

export default function Editor({ value, onChange, placeholder }: EditorProps) {
  const [ReactQuill, setReactQuill] = useState<ReactQuillComponent | null>(null);

  useEffect(() => {
    let isMounted = true;

    import('react-quill-new').then((module) => {
      if (isMounted) {
        setReactQuill(() => module.default);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!ReactQuill) {
    return <div className="h-[300px] w-full bg-gray-50 animate-pulse rounded-lg border border-gray-200" />;
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm focus-within:ring-2 ring-primary/20 transition-all">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Write your story here...'}
        className="text-gray-800"
      />
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #f3f4f6;
          padding: 12px;
          background: #f9fafb;
        }
        .ql-container.ql-snow {
          border: none;
          min-height: 400px;
          font-family: inherit;
        }
        .ql-editor {
          font-size: 1.1rem;
          line-height: 1.6;
          padding: 24px;
        }
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}
