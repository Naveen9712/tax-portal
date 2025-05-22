import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import '../styles/TrickyTax.css';

interface TrickyTaxPortalProps {
  onBack?: () => void;
}

const SECTIONS = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'insights', icon: '📊', label: 'Insights & Data' },
  { id: 'hr', icon: '👥', label: 'HR & Benefits' },
  { id: 'expense', icon: '💳', label: 'Expense Cards' },
  { id: 'documents', icon: '📂', label: 'Document Vault' },
  { id: 'compliance', icon: '⚖️', label: 'Business Compliance' },
  { id: 'account', icon: '👤', label: 'Account' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

const TABS: Record<string, string[]> = {
  documents: ['📝 Bookkeeping', '💰 Taxes', '💼 Payroll', '📨 Notices', '🔧 Misc'],
  insights: ['Overview', 'Financial Performance', 'Tax Analysis', 'Industry Benchmarks', 'Growth Opportunities'],
  hr: ['Team', 'Time Off', 'Benefits', 'Payroll', 'Performance', 'Recruitment'],
  expense: ['Dashboard', 'Company Cards', 'Transactions', 'Approvals', 'Reports', 'Budgets'],
  compliance: ['Dashboard', 'Compliance Checklists', 'Calendar', 'Documents', 'Reports'],
  account: ['Profile', 'Security', 'Notifications', 'Billing', 'API Access'],
  settings: ['Company', 'Users', 'Integrations', 'Customization', 'Backup & Export'],
};

const TrickyTaxPortal: React.FC<TrickyTaxPortalProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTabs, setActiveTabs] = useState<{ [key: string]: number }>({});

  const handleNavClick = (id: string) => setActiveSection(id);
  const handleTabClick = (section: string, idx: number) => {
    setActiveTabs((prev) => ({ ...prev, [section]: idx }));
  };

  // Helper to render tabs for a section
  const renderTabs = (section: string) => {
    const tabs = TABS[section];
    if (!tabs) return null;
    const activeIdx = activeTabs[section] ?? 0;
    return (
      <div className="tabs">
        {tabs.map((tab: string, idx: number) => (
          <div
            key={tab}
            className={`tab${activeIdx === idx ? ' active' : ''}`}
            onClick={() => handleTabClick(section, idx)}
          >
            {tab}
          </div>
        ))}
      </div>
    );
  };

  // Main content for each section
  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="section active" id="home-section">
            <div className="header">
              <h1 className="page-title">Welcome to TrickyTax</h1>
              <div className="header-actions">
                <button className="action-btn">
                  <span role="img" aria-label="reports">📊</span> View Reports
                </button>
              </div>
            </div>
            <div className="dashboard-grid">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Quick Access</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <button className="action-btn" onClick={() => setActiveSection('hr')}>
                    HR & Benefits
                  </button>
                  <button className="action-btn" onClick={() => setActiveSection('expense')}>
                    Expense Cards
                  </button>
                  <button className="action-btn" onClick={() => setActiveSection('documents')}>
                    Document Vault
                  </button>
                  <button className="action-btn" onClick={() => setActiveSection('compliance')}>
                    Business Compliance
                  </button>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Recent Activity</div>
                  <div className="card-action">View All</div>
                </div>
                <div>
                  <div style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontWeight: 500 }}>New expense report submitted</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>May 12, 2025 - 2:45 PM</div>
                  </div>
                  <div style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontWeight: 500 }}>Tax compliance checklist updated</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>May 11, 2025 - 10:30 AM</div>
                  </div>
                  <div style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontWeight: 500 }}>New employee onboarding completed</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>May 10, 2025 - 4:15 PM</div>
                  </div>
                  <div style={{ padding: '10px 0' }}>
                    <div style={{ fontWeight: 500 }}>Sales tax return filed</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>May 10, 2025 - 11:20 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="section active" id="documents-section">
            <div className="header">
              <h1 className="page-title">Document Vault</h1>
              <button className="action-btn">
                <span>⬆️</span> Upload Document
              </button>
            </div>
            {renderTabs(activeSection)}
            <div className="search-filter">
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input type="text" className="search-input" placeholder="Search documents..." />
              </div>
              <div className="year-filter">
                <select className="year-select">
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>FILENAME</th>
                    <th>DATE</th>
                    <th>SIZE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><a href="#" className="file-link">balance sheet.pdf</a></td>
                    <td>Oct. 28, 2019, 11:20 p.m.</td>
                    <td>0.5 MB</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td><a href="#" className="file-link">bank statement.pdf</a></td>
                    <td>Oct. 28, 2019, 11:20 p.m.</td>
                    <td>0.5 MB</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td><a href="#" className="file-link">cashflow statement.pdf</a></td>
                    <td>Oct. 28, 2019, 11:20 p.m.</td>
                    <td>0.5 MB</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td><a href="#" className="file-link">income statement.pdf</a></td>
                    <td>Oct. 28, 2019, 11:21 p.m.</td>
                    <td>0.5 MB</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td><a href="#" className="file-link">inventory.pdf</a></td>
                    <td>Oct. 28, 2019, 11:21 p.m.</td>
                    <td>0.5 MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'insights':
        return (
          <div className="section active" id="insights-section">
            <div className="header">
              <h1 className="page-title">Business Insights & Data</h1>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <select className="form-input" style={{ width: 'auto' }}>
                  <option>Last 12 Months</option>
                  <option>Year to Date</option>
                  <option>Last Quarter</option>
                  <option>Last Month</option>
                  <option>Custom Range</option>
                </select>
                <button className="action-btn">Download Report</button>
              </div>
            </div>
            {renderTabs(activeSection)}
            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="card">
                <div className="card-title" style={{ marginBottom: 10 }}>Revenue Growth (YoY)</div>
                <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 5 }}>18.4%</div>
                <div style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 4 }}>▲</span> 5.2% from previous period
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ marginBottom: 10 }}>Profit Margin</div>
                <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 5 }}>24.8%</div>
                <div style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 4 }}>▲</span> 2.3% from previous period
                </div>
              </div>
              <div className="card">
                <div className="card-title" style={{ marginBottom: 10 }}>Cash Runway</div>
                <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 5 }}>8.5 mo</div>
                <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 4 }}>▼</span> 1.2 mo from previous period
                </div>
              </div>
            </div>
          </div>
        );

      case 'hr':
        return (
          <div className="section active" id="hr-section">
            <div className="header">
              <h1 className="page-title">HR & Benefits</h1>
              <div className="header-actions">
                <button className="action-btn secondary-btn">
                  <span>📊</span> HR Reports
                </button>
                <button className="action-btn">
                  <span>+</span> Add Employee
                </button>
              </div>
            </div>
            {renderTabs(activeSection)}
            <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div>
                <div style={{ marginBottom: 20 }}>
                  <input type="text" className="search-input" placeholder="Search employees..." />
                </div>
                <div className="employee-card">
                  <div className="employee-photo">👨‍💼</div>
                  <div className="employee-info">
                    <div className="employee-name">John Davis</div>
                    <div className="employee-position">Chief Financial Officer</div>
                    <div className="employee-metrics">
                      <div className="metric">
                        <span className="metric-icon">📧</span>
                        <span>john.davis@company.com</span>
                      </div>
                      <div className="metric">
                        <span className="metric-icon">📱</span>
                        <span>(555) 123-4567</span>
                      </div>
                      <div className="metric">
                        <span className="metric-icon">🗓️</span>
                        <span>Hired: Mar 2020</span>
                      </div>
                    </div>
                  </div>
                  <div className="employee-actions">
                    <div className="employee-action">📝</div>
                    <div className="employee-action">📧</div>
                  </div>
                </div>
                <div className="employee-card">
                  <div className="employee-photo">👩‍💼</div>
                  <div className="employee-info">
                    <div className="employee-name">Sarah Johnson</div>
                    <div className="employee-position">Marketing Director</div>
                    <div className="employee-metrics">
                      <div className="metric">
                        <span className="metric-icon">📧</span>
                        <span>sarah.johnson@company.com</span>
                      </div>
                      <div className="metric">
                        <span className="metric-icon">📱</span>
                        <span>(555) 987-6543</span>
                      </div>
                      <div className="metric">
                        <span className="metric-icon">🗓️</span>
                        <span>Hired: Jun 2021</span>
                      </div>
                    </div>
                  </div>
                  <div className="employee-actions">
                    <div className="employee-action">📝</div>
                    <div className="employee-action">📧</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Team Statistics</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                      <div>Total Employees:</div>
                      <div style={{ fontWeight: 600 }}>18</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                      <div>Departments:</div>
                      <div style={{ fontWeight: 600 }}>5</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                      <div>Average Tenure:</div>
                      <div style={{ fontWeight: 600 }}>2.8 years</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                      <div>Open Positions:</div>
                      <div style={{ fontWeight: 600 }}>3</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>Retention Rate:</div>
                      <div style={{ fontWeight: 600, color: '#10b981' }}>94%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'expense':
        return (
          <div className="section active" id="expense-section">
            <div className="header">
              <h1 className="page-title">Expense Cards</h1>
              <div className="header-actions">
                <button className="action-btn secondary-btn">
                  <span>📊</span> Expense Reports
                </button>
                <button className="action-btn">
                  <span>+</span> New Expense
                </button>
              </div>
            </div>
            {renderTabs(activeSection)}
            <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div>
                <div className="card-container">
                  <div className="credit-card">
                    <div className="card-top">
                      <div className="card-chip"></div>
                      <div className="card-logo">TRICKYCARD</div>
                    </div>
                    <div className="card-number">**** **** **** 5678</div>
                    <div className="card-details">
                      <div>
                        <div className="card-holder">CARD HOLDER</div>
                        <div className="card-holder-name">JOHN DAVIS</div>
                      </div>
                      <div>
                        <div className="card-expires">EXPIRES</div>
                        <div className="card-expires-value">05/28</div>
                      </div>
                    </div>
                  </div>
                  <div className="transaction-header">
                    <div className="transaction-title">Recent Transactions</div>
                    <div className="transaction-filter">
                      <div className="filter-pill active">All</div>
                      <div className="filter-pill">Pending</div>
                      <div className="filter-pill">Completed</div>
                    </div>
                  </div>
                  <div className="transaction-list">
                    <div className="transaction-item">
                      <div className="transaction-info">
                        <div className="transaction-icon">🍔</div>
                        <div className="transaction-details">
                          <div className="transaction-merchant">Downtown Bistro</div>
                          <div className="transaction-date">May 12, 2025</div>
                        </div>
                      </div>
                      <div className="transaction-amount">
                        <div className="transaction-total">$84.75</div>
                        <div className="transaction-status" style={{ color: '#10b981' }}>Completed</div>
                      </div>
                    </div>
                    <div className="transaction-item">
                      <div className="transaction-info">
                        <div className="transaction-icon">✈️</div>
                        <div className="transaction-details">
                          <div className="transaction-merchant">Sky Airlines</div>
                          <div className="transaction-date">May 10, 2025</div>
                        </div>
                      </div>
                      <div className="transaction-amount">
                        <div className="transaction-total">$435.20</div>
                        <div className="transaction-status" style={{ color: '#10b981' }}>Completed</div>
                      </div>
                    </div>
                    <div className="transaction-item">
                      <div className="transaction-info">
                        <div className="transaction-icon">🏨</div>
                        <div className="transaction-details">
                          <div className="transaction-merchant">Grand Hotel</div>
                          <div className="transaction-date">May 10, 2025</div>
                        </div>
                      </div>
                      <div className="transaction-amount">
                        <div className="transaction-total">$320.50</div>
                        <div className="transaction-status" style={{ color: '#f59e0b' }}>Pending</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Expense Summary</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                      <div>This Month:</div>
                      <div style={{ fontWeight: 600 }}>$2,845.75</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                      <div>Previous Month:</div>
                      <div style={{ fontWeight: 600 }}>$3,120.50</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                      <div>Monthly Budget:</div>
                      <div style={{ fontWeight: 600 }}>$5,000.00</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>Budget Remaining:</div>
                      <div style={{ fontWeight: 600, color: '#10b981' }}>$2,154.25</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="section active" id="compliance-section">
            <div className="header">
              <h1 className="page-title">Business Compliance</h1>
              <div className="header-actions">
                <button className="action-btn secondary-btn">
                  <span>🔔</span> Notification Settings
                </button>
                <button className="action-btn">
                  <span>+</span> Add Compliance Task
                </button>
              </div>
            </div>
            {renderTabs(activeSection)}
            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="card">
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 10 }}>Overall Compliance</div>
                <div style={{ fontSize: 28, fontWeight: 'bold', color: '#f59e0b', marginBottom: 5 }}>82%</div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Last updated: Today, 9:15 AM</div>
              </div>
              <div className="card">
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 10 }}>Critical Tasks</div>
                <div style={{ fontSize: 28, fontWeight: 'bold', color: '#ef4444', marginBottom: 5 }}>3 <span style={{ fontSize: 14 }}>overdue</span></div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Need immediate attention</div>
              </div>
              <div className="card">
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 10 }}>Upcoming Deadlines</div>
                <div style={{ fontSize: 28, fontWeight: 'bold', color: '#64748b', marginBottom: 5 }}>12 <span style={{ fontSize: 14 }}>within 30 days</span></div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Plan ahead to stay compliant</div>
              </div>
              <div className="card">
                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 10 }}>Completed This Month</div>
                <div style={{ fontSize: 28, fontWeight: 'bold', color: '#10b981', marginBottom: 5 }}>24 <span style={{ fontSize: 14 }}>tasks</span></div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Great progress!</div>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="section active" id="account-section">
            <div className="header">
              <h1 className="page-title">Account</h1>
              <div className="header-actions">
                <button className="action-btn">
                  <span>💾</span> Save Changes
                </button>
              </div>
            </div>
            {renderTabs(activeSection)}
            <div className="settings-grid">
              <div className="profile-card">
                <div className="profile-image">👤</div>
                <div className="profile-name">John Davis</div>
                <div className="profile-email">john.davis@company.com</div>
                <div className="profile-stats">
                  <div className="stat">
                    <div className="stat-value">86</div>
                    <div className="stat-label">Documents</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">24</div>
                    <div className="stat-label">Expenses</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">12</div>
                    <div className="stat-label">Tasks</div>
                  </div>
                </div>
              </div>
              <div className="settings-form">
                <div className="form-title">Personal Information</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-input" defaultValue="John" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-input" defaultValue="Davis" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" defaultValue="john.davis@company.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-input" defaultValue="(555) 123-4567" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="section active" id="settings-section">
            <div className="header">
              <h1 className="page-title">Settings</h1>
            </div>
            {renderTabs(activeSection)}
            <div className="settings-grid">
              <div className="settings-form">
                <div className="form-title">Company Information</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input type="text" className="form-input" defaultValue="Acme Corporation" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Tax ID / EIN</label>
                    <input type="text" className="form-input" defaultValue="XX-XXXXXXX" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Industry</label>
                    <select className="form-input">
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option selected>Professional Services</option>
                      <option>Manufacturing</option>
                      <option>Retail</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="settings-form">
                <div className="form-title">Business Address</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Street Address</label>
                    <input type="text" className="form-input" defaultValue="123 Business Avenue" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input type="text" className="form-input" defaultValue="The Colony" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State/Province</label>
                    <input type="text" className="form-input" defaultValue="Texas" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f7f9fc' }}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-area">
          <div className="window-controls">
            <div className="control red"></div>
            <div className="control yellow"></div>
            <div className="control green"></div>
          </div>
          <div className="logo">TrickyTax</div>
          {onBack && (
            <button 
              onClick={onBack}
              className="mt-2 p-2 hover:bg-gray-100 rounded-full flex items-center text-sm text-gray-600"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Dashboard
            </button>
          )}
        </div>
        <div className="nav-items">
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              className={`nav-item${activeSection === section.id ? ' active' : ''}`}
              data-section={section.id}
              onClick={() => handleNavClick(section.id)}
            >
              <div className="nav-icon">{section.icon}</div>
              <div className="nav-text">{section.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div className="main-content">{renderSection()}</div>
    </div>
  );
};

export default TrickyTaxPortal;