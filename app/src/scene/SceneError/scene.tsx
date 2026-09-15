import { Component, type ErrorInfo, type ReactNode } from 'react'

type State = {
  error: boolean
}

type Props = {
  children: ReactNode
}

export class Scene extends Component<Props, State> {
  state: State = { error: false }

  static getDerivedStateFromError = () => {
    return { error: true }
  }

  componentDidCatch = (e: Error, _: ErrorInfo) => {
    console.error(e)
  }

  render = () => {
    if (this.state.error) {
      return null
    }

    return this.props.children
  }
}
