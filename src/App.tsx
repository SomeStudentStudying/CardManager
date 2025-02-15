import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';

// Lazy load pages
const CardCreator = React.lazy(() => import('./pages/CardCreator'));
const CardLibrary = React.lazy(() => import('./pages/CardLibrary'));
const CardEditor = React.lazy(() => import('./pages/CardEditor'));
const SetManager = React.lazy(() => import('./pages/SetManager'));
const SetCreator = React.lazy(() => import('./pages/SetCreator'));
const SetEditor = React.lazy(() => import('./pages/SetEditor'));
const PlayBooster = React.lazy(() => import('./pages/PlayBooster'));
const Jumpstart = React.lazy(() => import('./pages/Jumpstart'));
const JumpstartThemeCreator = React.lazy(() => import('./pages/JumpstartThemeCreator'));
const JumpstartThemeEditor = React.lazy(() => import('./pages/JumpstartThemeEditor'));
const Config = React.lazy(() => import('./pages/Config'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<CardCreator />} />
              <Route path="/library" element={<CardLibrary />} />
              <Route path="/edit/:cardId" element={<CardEditor />} />
              <Route path="/sets" element={<SetManager />} />
              <Route path="/sets/new" element={<SetCreator />} />
              <Route path="/sets/:setId" element={<SetEditor />} />
              <Route path="/sets/:setId/booster" element={<PlayBooster />} />
              <Route path="/sets/:setId/jumpstart" element={<Jumpstart />} />
              <Route path="/sets/:setId/jumpstart/new" element={<JumpstartThemeCreator />} />
              <Route path="/sets/:setId/jumpstart/:themeId" element={<JumpstartThemeEditor />} />
              <Route path="/config" element={<Config />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;