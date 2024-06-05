import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const QuillEditor = ({ id, name, value, onChange }) => {
    const handleChange = (content) => {
        onChange(content);
    };

    const editorStyle = {
        height: '250px', // Fixed height
        marginBottom: '1rem',
    };

    const quillStyle = {
        height: '100%', // Ensure the editor takes full height of the container
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div style={editorStyle}>
            <ReactQuill
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                style={quillStyle}
                modules={{
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ size: [] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' },
                            { 'indent': '-1' }, { 'indent': '+1' }],
                        ['link', 'image', 'video'],
                        ['clean'],
                    ],
                    clipboard: {
                        matchVisual: false,
                    },
                }}
                formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video',
                ]}
            />
        </div>
    );
};

export default QuillEditor;
