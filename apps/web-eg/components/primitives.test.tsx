import { render, screen } from '@testing-library/react'
import {
  Button,
  Card,
  Input,
  Badge,
  MetricStrip,
  FaqAccordion,
  ComparisonTable,
  BentoGrid,
  BentoItem,
} from '@mediabubble/design-system'

describe('design-system primitives', () => {
  it('renders Button with loading state', () => {
    render(<Button loading>Save</Button>)
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled()
  })

  it('renders Card shell', () => {
    render(<Card>Card body</Card>)
    expect(screen.getByText('Card body')).toBeInTheDocument()
  })

  it('renders Input with label and error', () => {
    render(<Input label="Email" error="Required" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('renders Badge variant', () => {
    render(<Badge variant="success">Live</Badge>)
    expect(screen.getByText('Live')).toBeInTheDocument()
  })

  it('renders MetricStrip items', () => {
    render(
      <MetricStrip
        items={[
          { value: '200+', label: 'Clients' },
          { value: '92%', label: 'Retention' },
        ]}
      />,
    )
    expect(screen.getByText('200+')).toBeInTheDocument()
    expect(screen.getByText('Retention')).toBeInTheDocument()
  })

  it('renders FaqAccordion questions', () => {
    render(
      <FaqAccordion
        items={[{ question: 'How long?', answer: '4–8 weeks.' }]}
      />,
    )
    expect(screen.getByText('How long?')).toBeInTheDocument()
  })

  it('renders ComparisonTable', () => {
    render(
      <ComparisonTable
        columns={['SEO', 'PPC']}
        rows={[{ label: 'Monthly reporting', values: [true, true] }]}
      />,
    )
    expect(screen.getByText('Monthly reporting')).toBeInTheDocument()
    expect(screen.getByText('SEO')).toBeInTheDocument()
  })

  it('renders BentoGrid children', () => {
    render(
      <BentoGrid>
        <BentoItem>Tile A</BentoItem>
      </BentoGrid>,
    )
    expect(screen.getByText('Tile A')).toBeInTheDocument()
  })
})
