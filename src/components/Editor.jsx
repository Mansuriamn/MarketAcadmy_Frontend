import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react';

export default function Editor({ content, setContent }) {
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [activeFormats, setActiveFormats] = useState({});
  const [isSaved, setIsSaved] = useState(true);
  const saveTimerRef = useRef(null);

  // Update counts from editor content
  const updateCounts = useCallback(() => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || '';
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setCharCount(text.length);
  }, []);

  // Detect active formatting at cursor
  const updateActiveFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
    });
  }, []);

  // Sync initial content once on mount
  useEffect(() => {
    if (editorRef.current && content !== undefined) {
      // Only set innerHTML on mount to avoid cursor jumping
      editorRef.current.innerHTML = content || '';
      updateCounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply formatting command
  const formatText = (command) => {
    editorRef.current?.focus();
    document.execCommand(command, false, null);
    if (setContent) setContent(editorRef.current.innerHTML);
    updateActiveFormats();
    triggerSaveIndicator();
  };

  // Apply block-level heading
  const applyHeading = (tag) => {
    editorRef.current?.focus();
    document.execCommand('formatBlock', false, tag);
    if (setContent) setContent(editorRef.current.innerHTML);
    triggerSaveIndicator();
  };

  // Add hyperlink
  const addLink = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      alert('Please select some text first to add a link.');
      return;
    }
    const url = prompt('Enter URL (include https://):');
    if (url && url.trim()) {
      editorRef.current?.focus();
      document.execCommand('createLink', false, url.trim());
      if (setContent) setContent(editorRef.current.innerHTML);
      triggerSaveIndicator();
    }
  };

  // Simulate autosave indicator
  const triggerSaveIndicator = () => {
    setIsSaved(false);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => setIsSaved(true), 1200);
  };

  // Handle input events
  const handleInput = () => {
    if (setContent) setContent(editorRef.current.innerHTML);
    updateCounts();
    updateActiveFormats();
    triggerSaveIndicator();
  };

  // Handle keyup and mouseup to update format states
  const handleSelectionChange = () => {
    updateActiveFormats();
  };

  // Toolbar button base + active styles
  const btnClass = (format) =>
    `p-2 rounded-md transition-all duration-150 ${
      activeFormats[format]
        ? 'bg-slate-800 text-white shadow-inner'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans">

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-slate-50 border-b border-slate-200">

        {/* Text style dropdown */}
        <div className="relative group mr-1">
          <button className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition">
            <Type className="w-3.5 h-3.5" />
            <span>Style</span>
            <svg className="w-3 h-3 ml-0.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className="absolute left-0 top-full mt-1 z-10 hidden group-hover:flex group-focus-within:flex flex-col bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden min-w-[140px]">
            {[
              { label: 'Paragraph', tag: 'p', cls: 'text-sm' },
              { label: 'Heading 1', tag: 'h1', cls: 'text-lg font-bold' },
              { label: 'Heading 2', tag: 'h2', cls: 'text-base font-semibold' },
              { label: 'Heading 3', tag: 'h3', cls: 'text-sm font-semibold' },
            ].map(({ label, tag, cls }) => (
              <button
                key={tag}
                onMouseDown={(e) => { e.preventDefault(); applyHeading(tag); }}
                className={`px-3 py-2 text-left hover:bg-slate-50 text-slate-700 ${cls} transition`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        {/* Inline formats */}
        <button title="Bold (Ctrl+B)" onMouseDown={(e) => { e.preventDefault(); formatText('bold'); }} className={btnClass('bold')}>
          <Bold className="w-4 h-4" />
        </button>
        <button title="Italic (Ctrl+I)" onMouseDown={(e) => { e.preventDefault(); formatText('italic'); }} className={btnClass('italic')}>
          <Italic className="w-4 h-4" />
        </button>
        <button title="Underline (Ctrl+U)" onMouseDown={(e) => { e.preventDefault(); formatText('underline'); }} className={btnClass('underline')}>
          <Underline className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        {/* Lists */}
        <button title="Bullet List" onMouseDown={(e) => { e.preventDefault(); formatText('insertUnorderedList'); }} className={btnClass('insertUnorderedList')}>
          <List className="w-4 h-4" />
        </button>
        <button title="Numbered List" onMouseDown={(e) => { e.preventDefault(); formatText('insertOrderedList'); }} className={btnClass('insertOrderedList')}>
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        {/* Alignment */}
        <button title="Align Left" onMouseDown={(e) => { e.preventDefault(); formatText('justifyLeft'); }} className={btnClass('justifyLeft')}>
          <AlignLeft className="w-4 h-4" />
        </button>
        <button title="Align Center" onMouseDown={(e) => { e.preventDefault(); formatText('justifyCenter'); }} className={btnClass('justifyCenter')}>
          <AlignCenter className="w-4 h-4" />
        </button>
        <button title="Align Right" onMouseDown={(e) => { e.preventDefault(); formatText('justifyRight'); }} className={btnClass('justifyRight')}>
          <AlignRight className="w-4 h-4" />
        </button>

        {/* <div className="w-px h-5 bg-slate-200 mx-1" /> */}

        {/* Link */}
        {/* <button title="Insert Link" onMouseDown={(e) => { e.preventDefault(); addLink(); }} className="p-2 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-150">
          <LinkIcon className="w-4 h-4" />
        </button> */}

        <div className="flex-1" />
        <span className="text-[10px] font-semibold tracking-widest text-slate-300 uppercase select-none">Rich‑Text</span>
      </div>

      {/* ── Editable Area ── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="w-full p-6 min-h-[400px] focus:outline-none text-slate-800 leading-relaxed text-[15px]"
        onInput={handleInput}
        onKeyUp={handleSelectionChange}
        onMouseUp={handleSelectionChange}
      />

      {/* ── Footer ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3 text-xs text-slate-400 select-none">
          <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
          <span className="text-slate-200">·</span>
          <span>{charCount} {charCount === 1 ? 'char' : 'chars'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isSaved ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">
            {isSaved ? 'Saved' : 'Saving…'}
          </span>
        </div>
      </div>
    </div>
  );
}