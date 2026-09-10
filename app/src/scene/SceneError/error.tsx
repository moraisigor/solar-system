import { Component, type ReactNode } from 'react'

type State = {
  error: boolean
}

type Props = {
  children: ReactNode
}

export class Error extends Component<Props, State> {
  state: State = { error: false }

  static getDerivedStateFromError = () => {
    return { error: true }
  }

  render = () => {
    if (this.state.error) {
      return null
    }

    return this.props.children
  }
}
