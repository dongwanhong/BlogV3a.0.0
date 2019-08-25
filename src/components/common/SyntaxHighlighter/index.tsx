import React, { SFC } from 'react'
import { Light as HljsSyntaxHighlighter } from 'react-syntax-highlighter'
import { PrismLight as PrismSyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import xonokai from 'react-syntax-highlighter/dist/esm/styles/prism/xonokai'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import monokai from 'react-syntax-highlighter/dist/esm/styles/hljs/monokai-sublime'

// Access via the supportedLanguages static field
// SyntaxHighlighter.supportedLanguages

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const styles: { [prop: string]: any } = { xonokai, monokai }

PrismSyntaxHighlighter.registerLanguage('jsx', jsx)
HljsSyntaxHighlighter.registerLanguage('javascript', js)

interface Props {
  language?: 'jsx' | 'javascript'
  style?: 'xonokai' | 'monokai'
}

const SyntaxHighlighter: SFC<Props> = props => {
  let { language = 'javascript', style = 'monokai', ...oProps } = props
  let OriSyntaxHighlighter = HljsSyntaxHighlighter
  if (language === 'jsx') {
    style = 'xonokai'
    OriSyntaxHighlighter = PrismSyntaxHighlighter
  } else if (style === 'xonokai') {
    style = 'monokai'
  }

  return <OriSyntaxHighlighter language={language} style={styles[style]} {...oProps} />
}

export default SyntaxHighlighter
