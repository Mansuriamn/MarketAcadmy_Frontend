import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Bold, Italic, Underline, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  Type, Indent, Outdent, Eraser
} from 'lucide-react';

export default function Editor({ content = '', setContent }) {
  const editorRef = useRef(null);
  const saveTimer = useRef(null);

  const [stats, setStats] = useState({ words: 0, chars: 0 });
  const [formats, setFormats] = useState({});
  const [isSaved, setIsSaved] = useState(true);

  /* ------------------ UTILS ------------------ */

  const focusEditor = () => editorRef.current?.focus();

  const exec = (command, value = null) => {
    focusEditor();
    document.execCommand(command, false, value);
    updateState();
  };

  const updateState = useCallback(() => {
    updateCounts();
    updateFormats();
    triggerSave();
  }, []);

  /* ------------------ COUNTS ------------------ */

  const updateCounts = () => {
    const text = editorRef.current?.innerText || '';
    const words = text.trim().split(/\s+/).filter(Boolean);

    setStats({
      words: words.length,
      chars: text.length
    });
  };

  /* ------------------ FORMATS ------------------ */

  const updateFormats = () => {
    setFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      ul: document.queryCommandState('insertUnorderedList'),
      ol: document.queryCommandState('insertOrderedList'),
      left: document.queryCommandState('justifyLeft'),
      center: document.queryCommandState('justifyCenter'),
      right: document.queryCommandState('justifyRight'),
    });
  };

  /* ------------------ CLEAN HTML ------------------ */

  const cleanHTML = (html) => {
    return html
      .replace(/<font size="7">/g, '<span style="font-size:32px">')
      .replace(/<font size="5">/g, '<span style="font-size:20px">')
      .replace(/<font size="3">/g, '<span style="font-size:16px">')
      .replace(/<font size="1">/g, '<span style="font-size:12px">')
      .replace(/<\/font>/g, '</span>');
  };

  /* ------------------ SAVE ------------------ */

  const triggerSave = () => {
    setIsSaved(false);

    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setIsSaved(true);
    }, 1000);
  };

  /* ------------------ INPUT ------------------ */

  const handleInput = () => {
    const html = cleanHTML(editorRef.current.innerHTML);
    if (setContent) setContent(html);
    updateState();
  };

  /* ------------------ INIT ------------------ */

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
      updateCounts();
    }
  }, []);

  /* ------------------ FEATURES ------------------ */

  const setFontSize = (size) => exec('fontSize', size);
  const setColor = (color) => exec('foreColor', color);

  const btn = (active) =>
    `p-2 rounded-md ${
      active ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-600'
    }`;

  /* ------------------ UI ------------------ */

  return (
    <div className="border border-white rounded-xl overflow-hidden bg-white shadow-md">

      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white bg-white">

        {/* STYLE */}
        <select
          onChange={(e) => exec('formatBlock', e.target.value)}
          className="text-xs border border-white rounded px-2 py-1 bg-white"
        >
          <option value="p">Paragraph</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
        </select>

        {/* FONT SIZE */}
        <select
          onChange={(e) => setFontSize(e.target.value)}
          className="text-xs border border-white rounded px-2 py-1 bg-white"
        >
          <option value="">Size</option>
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Huge</option>
        </select>

        {/* COLOR */}
        {/* <input
          type="color"
          onChange={(e) => setColor(e.target.value)}
          className="border border-white rounded"
        /> */}

        {/* INLINE */}
        <button onMouseDown={(e) => { e.preventDefault(); exec('bold'); }} className={btn(formats.bold)}>
          <Bold size={16} />
        </button>

        <button onMouseDown={(e) => { e.preventDefault(); exec('italic'); }} className={btn(formats.italic)}>
          <Italic size={16} />
        </button>

        <button onMouseDown={(e) => { e.preventDefault(); exec('underline'); }} className={btn(formats.underline)}>
          <Underline size={16} />
        </button>

        {/* LIST */}
        <button onMouseDown={(e) => { e.preventDefault(); exec('insertUnorderedList'); }} className={btn(formats.ul)}>
          <List size={16} />
        </button>

        <button onMouseDown={(e) => { e.preventDefault(); exec('insertOrderedList'); }} className={btn(formats.ol)}>
          <ListOrdered size={16} />
        </button>

        {/* INDENT */}
        <button onMouseDown={(e) => { e.preventDefault(); exec('indent'); }}>
          <Indent size={16} />
        </button>

        <button onMouseDown={(e) => { e.preventDefault(); exec('outdent'); }}>
          <Outdent size={16} />
        </button>

        {/* ALIGN */}
        <button onMouseDown={(e) => { e.preventDefault(); exec('justifyLeft'); }} className={btn(formats.left)}>
          <AlignLeft size={16} />
        </button>

        <button onMouseDown={(e) => { e.preventDefault(); exec('justifyCenter'); }} className={btn(formats.center)}>
          <AlignCenter size={16} />
        </button>

        <button onMouseDown={(e) => { e.preventDefault(); exec('justifyRight'); }} className={btn(formats.right)}>
          <AlignRight size={16} />
        </button>

        {/* CLEAR */}
        <button onMouseDown={(e) => { e.preventDefault(); exec('removeFormat'); }}>
          <Eraser size={16} />
        </button>

        <div className="ml-auto text-xs text-gray-400">Editor</div>
      </div>

      {/* EDITOR */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyUp={updateFormats}
        onMouseUp={updateFormats}
        data-placeholder="Start writing something amazing..."
        className="p-5 min-h-[350px] outline-none text-gray-800"
      />

      {/* FOOTER */}
      <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-400 border-t border-white bg-white">
        <div>
          {stats.words} words · {stats.chars} chars
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isSaved ? 'bg-green-400' : 'bg-yellow-400'}`} />
          {isSaved ? 'Saved' : 'Saving...'}
        </div>
      </div>

      {/* PLACEHOLDER */}
      <style>
        {`
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
          }
        `}
      </style>
    </div>
  );
}