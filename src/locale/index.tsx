import React, { PureComponent, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'
import { State as StateToProps } from './store'
import { AppState } from '../store'

interface Messages {
  [x: string]: Record<string, string>
}

interface Props {
  lang: string
}

const messages: Messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

class LocaleProvider extends PureComponent<Props, {}> {
  public render(): ReactNode {
    const { children, lang } = this.props
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        {children}
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state: AppState): StateToProps => ({
  lang: state.getIn(['local', 'lang'])
})

export default connect(
  mapStateToProps,
  null
)(LocaleProvider)
