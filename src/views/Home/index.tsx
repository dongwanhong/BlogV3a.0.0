import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TopBar, Footer } from '../../components'
import { actionCreators } from './store'

const navList = [
  {
    id: 1,
    url: 'https://github.com/Anani1994',
    text: 'Github'
  },
  {
    id: 2,
    url: '/',
    text: '项目演示'
  },
  {
    id: 3,
    url: '/',
    text: '博文'
  },
  {
    id: 4,
    url: 'https://anani1994.github.io/notebook/',
    text: '笔记'
  },
  {
    id: 5,
    url: '/',
    text: '设置'
  }
]

class Home extends Component<{ initNavList: Function }> {
  public componentDidMount(): void {
    const { initNavList } = this.props
    initNavList()
  }

  public render(): React.ReactNode {
    return (
      <div className="home">
        <TopBar navList={navList} />
        <div className="text">
          If you can't explain it simply,
          <br />
          you don't understand it well enough.
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state: { getIn: Function }): {} => ({
  navList: state.getIn(['home', 'navList'])
})

const mapDispatchToProps = (dispath: Function): {} => ({
  initNavList(): void {
    dispath(actionCreators.getInitNavList(navList))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
