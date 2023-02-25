import React,{ useRef } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";

  const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "link",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "|",
    "source",
    "|",
    "preview"
  ];
  const configs = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: 320,
    direction: 'ltr',
    language: 'en',
    debugLanguage: false,
    i18n: 'en',
    tabIndex: 5,
    toolbar: true,
    enter: 'P',
    useSplitMode: false,
    colorPickerDefaultTab: 'background',
    imageDefaultWidth: 150,
    removeButtons: ['source', 'about', 'outdent', 'indent', 'video', 'print', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
    disablePlugins: ['paste', 'stat'],
    events: {},
    textIcons: false,
    uploader: {
      url: 'http://localhost:5000/imgprofile/detail-img/?action=fileUpload',
      insertImageAsBase64URI:false,
      imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
    },
    filebrowser: {
      ajax: {
          url: 'http://localhost:5000/imgprofile/detail-img/'
      },
      height: 580,
    },
    
    placeholder: '',
    showXPathInStatusbar: false,
    buttons
  };

export default function RickEditor({detail, setDetail}){
  const editors = useRef(null)
  return (
    <>
      <JoditEditor 
        tabIndex={1}
        ref={editors}
        config={configs}
        value={detail}
        onBlur={(news)=>setDetail(news)}
        onChange={(e)=>{}}
        className="shadow"
      />
    </>
  )
};