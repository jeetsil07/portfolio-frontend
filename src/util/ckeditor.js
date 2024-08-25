import ClassicEditorBase from '@ckeditor/ckeditor5-build-classic';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
    ...ClassicEditorBase.builtinPlugins,
    CodeBlock
];

ClassicEditor.defaultConfig = {
    ...ClassicEditorBase.defaultConfig,
    toolbar: {
        items: [
            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'codeBlock', 'undo', 'redo'
        ]
    },
    language: 'en',
};

export default ClassicEditor;
