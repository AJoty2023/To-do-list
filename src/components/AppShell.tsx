import { Component, type ReactNode, type ErrorInfo } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  message: string
}

interface ErrorBoundaryProps {
  readonly children: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('App error:', error, info)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-2xl border border-red-100 dark:border-red-900 px-6 py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Something went wrong
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-5 leading-relaxed">
              {this.state.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => globalThis.location.reload()}
              className="w-full py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-all"
            >
              Reload app
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

interface AppShellProps {
  readonly children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}