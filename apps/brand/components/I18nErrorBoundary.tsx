'use client'

import { Component, type ReactNode } from 'react'
import en from '@/lib/i18n/en.json'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class I18nErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('i18n initialization failed:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'system-ui' }}>
          <h1>{en['Translation loading issue']}</h1>
          <p>{en['We could not load translations. Refresh the page and try again.']}</p>
          <button type="button" onClick={() => window.location.reload()}>
            {en['Refresh page']}
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
