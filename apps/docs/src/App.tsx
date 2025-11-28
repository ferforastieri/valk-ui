import { Routes, Route } from 'react-router-dom'
import { TranslationProvider } from './contexts/TranslationContext'
import { CommandPaletteProvider } from './components/CommandPalette'
import { ToastProvider } from '@/components'
import Layout from './components/Layout'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Components from './pages/Components'
import ComponentDetail from './pages/ComponentDetail'
import Changelog from './pages/Changelog'
import Colors from './pages/Colors'

function App() {
  return (
    <TranslationProvider>
      <CommandPaletteProvider>
        <ToastProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/components" element={<Components />} />
              <Route path="/components/:componentName" element={<ComponentDetail />} />
              <Route path="/colors" element={<Colors />} />
              <Route path="/changelog" element={<Changelog />} />
            </Routes>
          </Layout>
        </ToastProvider>
      </CommandPaletteProvider>
    </TranslationProvider>
  )
}

export default App

