import React, { ReactChild } from 'react'
import Script from 'react-load-script'

interface Props {
  url?: string
  attributes?: {
    [prop: string]: string
  }
  onError?: () => void
  onLoad?: () => void
  onCreate?: () => void
}

class Comment extends React.PureComponent<Props, {}> {
  private static defaultProps = {
    attributes: {
      repo: 'dongwanhong/blog-comment',
      'issue-term': 'pathname',
      theme: 'github-light',
      crossorigin: 'anonymous',
      async: true,
      label: 'Comment',
      ele: '#comment-container'
    },
    onCreate: () => {},
    onError: () => {},
    onLoad: () => {}
  }

  public componentDidMount(): void {}

  public render(): ReactChild {
    const { onError, onLoad, url = 'https://utteranc.es/client.js', attributes } = this.props

    return (
      <div id="comment-container">
        <Script url={url} onError={onError} onLoad={onLoad} attributes={attributes} />
      </div>
    )
  }
}

export default Comment
