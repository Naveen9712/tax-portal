import React, { useState } from 'react';
import DashboardSelectionPage from './pages/DashboardSelectionPage';
import TrickyTaxPortal from './pages/TrickyTaxPortal';
import TaxAppMockup from './pages/TaxAppMockup';
import './styles/App.css';

type AppView = 'dashboard' | 'business' | 'personal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');

  const handleBusinessDashboardAccess = () => {
    setCurrentView('business');
  };

  const handlePersonalAppAccess = () => {
    setCurrentView('personal');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  switch (currentView) {
    case 'business':
      return <TrickyTaxPortal onBack={handleBackToDashboard} />;
    case 'personal':
      return <TaxAppMockup />;
    default:
      return (
        <DashboardSelectionPage 
          onBusinessDashboardAccess={handleBusinessDashboardAccess}
          onPersonalAppAccess={handlePersonalAppAccess}
        />
      );
  }
};

export default App;