'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
            background: '#F8F9FC',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0D1B2A' }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: '1rem', color: '#6B7280', marginBottom: '1.5rem', maxWidth: '28rem' }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              background: '#072A6B',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9375rem',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
