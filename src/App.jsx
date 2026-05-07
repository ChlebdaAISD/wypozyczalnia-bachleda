import { useEffect } from 'react'
import { Router, Switch, Route, useLocation } from 'wouter'
import { Nav } from './components/Nav.jsx'
import { Footer } from './components/Footer.jsx'
import { Home } from './pages/Home.jsx'
import { Trail } from './pages/Trail.jsx'
import { useReveal } from './lib/useReveal.js'

function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location])
  return null
}

export default function App() {
  useReveal()

  return (
    <Router>
      <ScrollToTop />
      <Nav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/trasy/:slug" component={Trail} />
        <Route component={Home} />
      </Switch>
      <Footer />
    </Router>
  )
}
