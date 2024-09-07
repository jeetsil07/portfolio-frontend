import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS for the editor

export default function NewEditor() {
  const [value, setValue] = useState('');

  const handleChange = (content: string) => {
    setValue(content);
  };

  const logContent = () => {
  };

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={handleChange}
        theme="snow"
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'size': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }, { 'direction': 'rtl' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link', 'image', 'video'],
            ['clean'],
          ]
        }}
      />
      <button onClick={logContent}>Log editor content</button>
    </div>
  );
}
