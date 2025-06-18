import React from 'react';
import DashboardCard from '../components/DashboardCard';
import type { DashboardVariant } from '../components/DashboardCard';
import '../styles/App.css';

interface Dashboard {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  variant: DashboardVariant;
  alert: string;
}

interface DashboardSelectionPageProps {
  onBusinessDashboardAccess?: () => void;
  onPersonalAppAccess?: () => void;
}

const dashboards: Dashboard[] = [
  {
    icon: '🔧',
    title: 'Business Dashboard',
    description: 'Comprehensive business management portal with advanced analytics',
    features: [
      'HR & Employee Management',
      'Financial Insights & Analytics',
      'Expense Card Management',
      'Business Compliance Tools',
    ],
    variant: 'admin',
    alert: 'Accessing Admin Dashboard - Manage system settings and users',
  },
  {
    icon: '📱',
    title: 'Personal Mobile App',
    description: 'AI-powered personal tax assistant with intelligent recommendations',
    features: [
      'AI Tax Assistant Chat',
      'Smart Document Management',
      'Life Event Tax Planning',
      'Personalized Tax Insights',
    ],
    variant: 'attorney',
    alert: 'Accessing Personal Tax AI - Your personal tax assistant',
  },
];

const DashboardSelectionPage: React.FC<DashboardSelectionPageProps> = ({ 
  onBusinessDashboardAccess, 
  onPersonalAppAccess 
}) => {
  const handleCardAccess = (dashboard: Dashboard) => {
    switch (dashboard.title) {
      case 'Business Dashboard':
        onBusinessDashboardAccess?.();
        break;
      case 'Personal Mobile App':
        onPersonalAppAccess?.();
        break;
      default:
        alert(dashboard.alert);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl font-medium text-gray-900 mb-4">
            Tax Portal
          </h1>
          <p className="text-lg md:text-md text-gray-600 max-w-1xl mx-auto">
            Choose a dashboard to access specialized tools and features tailored for your needs
          </p>
        </header>
       
        <div className="dashboard-grid mx-auto">
          {dashboards.map((dashboard) => (
            <DashboardCard
              key={dashboard.title}
              icon={dashboard.icon}
              title={dashboard.title}
              description={dashboard.description}
              features={dashboard.features}
              variant={dashboard.variant}
              onAccess={() => handleCardAccess(dashboard)}
            />
          ))}
        </div>
        
        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>© 2025 Tax Portal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardSelectionPage; 