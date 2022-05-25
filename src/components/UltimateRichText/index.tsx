import '@wangeditor/editor/dist/css/style.css'

import React, {useEffect, useState} from "react";
import {Editor, Toolbar} from "@wangeditor/editor-for-react";
import type {IDomEditor, IEditorConfig} from "@wangeditor/editor";
import defaultToolbarConfig from "./config/toolbar";
import defaultEditorConfig from "./config/editor";


export type UltimateRichTextProps = {
  value?: string,
  onChange?: (value: string) => void,
  editorConfig?: Partial<IEditorConfig>
}

const UltimateRichText: React.FC<UltimateRichTextProps> = (props) => {

  const {editorConfig, value, onChange} = props

  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState(value)

  const localEditorConfig = Object.assign(defaultEditorConfig, editorConfig)

  const onEditorChange = (__editor: IDomEditor) => {
    const __context = __editor.getHtml()
    setHtml(__context)
    onChange?.(__context)
  }

  /**
   * @desc 销毁 editor
   */
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div style={{border: '1px solid #ccc', zIndex: 100}}>
      <Toolbar
        editor={editor}
        defaultConfig={defaultToolbarConfig}
        mode="default"
        style={{borderBottom: '1px solid #ccc'}}
      />
      <Editor
        defaultConfig={localEditorConfig}
        value={html}
        onCreated={setEditor}
        onChange={onEditorChange}
        mode="default"
        style={{height: '300px', 'overflowY': 'hidden'}}
      />
    </div>
  )
}


export default UltimateRichText

