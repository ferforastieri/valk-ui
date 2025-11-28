import { Routes, Route } from 'react-router-dom'
import { TranslationProvider } from './contexts/TranslationContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Components from './pages/Components'
import Changelog from './pages/Changelog'

function App() {
  return (
    <TranslationProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/components" element={<Components />} />
          <Route path="/changelog" element={<Changelog />} />
        </Routes>
      </Layout>
    </TranslationProvider>
  )
}

export default App

