import React, { SFC } from 'react'
import { Link } from 'react-router-dom'
import { injectIntl, WrappedComponentProps } from 'react-intl'

const NotFound: SFC<WrappedComponentProps> = props => (
  <div className="page-404">
    <div className="page-left" />
    <div className="page-right">
      <div className="text">
        <p>{props.intl.formatMessage({ id: 'notFound.text1' })}</p>
        <p>
          {props.intl.formatMessage({ id: 'notFound.text2' })}{' '}
          <Link to="/">{props.intl.formatMessage({ id: 'notFound.text3' })}</Link>{' '}
          {props.intl.formatMessage({ id: 'notFound.text4' })}
        </p>
      </div>
    </div>
  </div>
)

export default injectIntl(NotFound)
