import React, { useState, useRef, useEffect } from 'react';
import { Home, MessageCircle, FileText, Gift, User, Plus, ChevronRight, Search, DollarSign, AlertCircle, Calendar, Bell, Camera, Upload, Eye, EyeOff, ArrowLeft } from 'lucide-react';

// User Profile Interface
interface UserProfile {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    state: string;
    filingStatus: string;
    dependents: number;
  };
  income: {
    primarySalary: number;
    employer: string;
    additionalIncome: string[];
    selfEmployed: boolean;
    businessType: string;
  };
  expenses: {
    housing: number;
    transportation: number;
    healthcare: number;
    education: number;
    insurance: number;
    utilities: number;
    personalLoans: number;
    other: number;
  };
  financial: {
    hasRetirement401k: boolean;
    hasIRA: boolean;
    hasHSA: boolean;
    investmentAccounts: boolean;
    ownsCrypto: boolean;
    ownsHome: boolean;
    hasStudentLoans: boolean;
    charitableDonations: number;
  };
  lifeEvents: string[];
  taxGoals: string[];
  riskTolerance: string;
  currentTaxWithholding: number;
}

// Gemini AI API function
const callGeminiAI = async (prompt: string, imageData?: string) => {
  try {
    const apiKey = 'AIzaSyAaAVH1P5vHbjHWRFZm3rOWYTUU1FngycE';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    let parts: any[] = [{ text: prompt }];
    
    if (imageData) {
      parts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: imageData.split(',')[1]
        }
      });
    }

    const requestBody = {
      contents: [{ parts: parts }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini AI:', error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};

// Login Screen Component
const LoginScreen: React.FC<{ onLogin: () => void; onSignup: () => void }> = ({ onLogin, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-600 to-blue-800 max-w-md mx-auto">
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tax AI</h1>
          <p className="text-blue-100">Your intelligent tax planning assistant</p>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none pr-12"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1 focus:outline-none focus:ring-2 focus:ring-blue-400 w-auto h-auto"
              style={{ lineHeight: 0 }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-white text-blue-600 p-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Sign In
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-blue-100 mb-2">
            Don't have an account?
          </p>
          <button
            onClick={onSignup}
            className="w-full bg-white text-blue-600 p-4 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-sm"
            style={{ letterSpacing: 0.5 }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

// Signup Screen Component
const SignupScreen: React.FC<{ onNext: (email: string, password: string) => void; onBack: () => void }> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (formData.email && formData.password) {
      onNext(formData.email, formData.password);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-600 to-blue-800 max-w-md mx-auto">
      <div className="p-4">
        <div onClick={onBack} className="text-white">
          <ArrowLeft size={24} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-blue-100">Join thousands who've optimized their taxes</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none pr-12"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 w-auto h-auto"
              style={{ lineHeight: 0 }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <input
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-white text-blue-600 p-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// Tax Profile Questionnaire Component
const TaxProfileQuestionnaire: React.FC<{ 
  email: string; 
  password: string; 
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}> = ({ email, password, onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: email,
      age: 25,
      state: '',
      filingStatus: 'single',
      dependents: 0
    },
    income: {
      primarySalary: 0,
      employer: '',
      additionalIncome: [],
      selfEmployed: false,
      businessType: ''
    },
    expenses: {
      housing: 0,
      transportation: 0,
      healthcare: 0,
      education: 0,
      insurance: 0,
      utilities: 0,
      personalLoans: 0,
      other: 0
    },
    financial: {
      hasRetirement401k: false,
      hasIRA: false,
      hasHSA: false,
      investmentAccounts: false,
      ownsCrypto: false,
      ownsHome: false,
      hasStudentLoans: false,
      charitableDonations: 0
    },
    lifeEvents: [],
    taxGoals: [],
    riskTolerance: 'moderate',
    currentTaxWithholding: 0
  });

  const updateProfile = (section: keyof UserProfile, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const toggleArrayItem = (section: keyof UserProfile, field: string, item: string) => {
    setProfile(prev => {
      const currentArray = (prev[section] as any)[field] as string[];
      const updatedArray = currentArray.includes(item)
        ? currentArray.filter(i => i !== item)
        : [...currentArray, item];
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updatedArray
        }
      };
    });
  };

  const handleNext = () => {
    if (step < 7) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  const incomeOptions = ['Freelance work', 'Investment dividends', 'Rental income', 'Part-time job', 'Crypto trading', 'Stock options', 'Teaching/tutoring', 'Content creation', 'Business ownership', 'Royalties'];

  const lifeEventOptions = ['New job opportunity', 'Planning for graduate school', 'Moving to a new apartment', 'Buying a car', 'Starting retirement savings', 'Planning a home purchase', 'Starting a side business', 'Health insurance change', 'Getting married', 'Having a child', 'Divorce', 'Death in family', 'Job loss', 'Retirement'];

  const taxGoalOptions = ['Minimize current year taxes', 'Maximize retirement savings', 'Save for home purchase', 'Build emergency fund', 'Pay off student loans', 'Start a business', 'Plan for children\'s education', 'Optimize investment taxes', 'Estate planning', 'Charitable giving'];

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={profile.personalInfo.firstName}
                onChange={(e) => updateProfile('personalInfo', 'firstName', e.target.value)}
                className="p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={profile.personalInfo.lastName}
                onChange={(e) => updateProfile('personalInfo', 'lastName', e.target.value)}
                className="p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <input
              type="number"
              placeholder="Age"
              value={profile.personalInfo.age}
              onChange={(e) => updateProfile('personalInfo', 'age', parseInt(e.target.value) || 0)}
              className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <select
              value={profile.personalInfo.state}
              onChange={(e) => updateProfile('personalInfo', 'state', e.target.value)}
              className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <select
              value={profile.personalInfo.filingStatus}
              onChange={(e) => updateProfile('personalInfo', 'filingStatus', e.target.value)}
              className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="single">Single</option>
              <option value="married_filing_jointly">Married Filing Jointly</option>
              <option value="married_filing_separately">Married Filing Separately</option>
              <option value="head_of_household">Head of Household</option>
            </select>
            <input
              type="number"
              placeholder="Number of Dependents"
              value={profile.personalInfo.dependents}
              onChange={(e) => updateProfile('personalInfo', 'dependents', parseInt(e.target.value) || 0)}
              className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Income Information</h2>
            <input
              type="number"
              placeholder="Annual Salary ($)"
              value={profile.income.primarySalary}
              onChange={(e) => updateProfile('income', 'primarySalary', parseInt(e.target.value) || 0)}
              className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Employer Name"
              value={profile.income.employer}
              onChange={(e) => updateProfile('income', 'employer', e.target.value)}
              className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Additional Income Sources (select all that apply):</label>
              <div className="grid grid-cols-2 gap-2">
                {incomeOptions.map(option => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={profile.income.additionalIncome.includes(option)}
                      onChange={() => toggleArrayItem('income', 'additionalIncome', option)}
                      className="rounded"
                    />
                    <span className="text-xs">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={profile.income.selfEmployed}
                  onChange={(e) => updateProfile('income', 'selfEmployed', e.target.checked)}
                  className="rounded"
                />
                <span>Self-employed or own a business</span>
              </label>
              {profile.income.selfEmployed && (
                <input
                  type="text"
                  placeholder="Business Type"
                  value={profile.income.businessType}
                  onChange={(e) => updateProfile('income', 'businessType', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
                />
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Expenses</h2>
            {[
              ['Housing (rent/mortgage)', 'housing'],
              ['Transportation (car payment, gas)', 'transportation'],
              ['Healthcare/Insurance', 'healthcare'],
              ['Education (loans, tuition)', 'education'],
              ['Other Insurance', 'insurance'],
              ['Utilities', 'utilities'],
              ['Personal Loans', 'personalLoans'],
              ['Other Expenses', 'other']
            ].map(([label, field]) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="number"
                  placeholder="Monthly amount ($)"
                  value={(profile.expenses as any)[field]}
                  onChange={(e) => updateProfile('expenses', field, parseInt(e.target.value) || 0)}
                  className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Financial Accounts</h2>
            <div className="space-y-3">
              {[
                ['401(k) or employer retirement plan', 'hasRetirement401k'],
                ['IRA (Traditional or Roth)', 'hasIRA'],
                ['Health Savings Account (HSA)', 'hasHSA'],
                ['Investment/brokerage accounts', 'investmentAccounts'],
                ['Cryptocurrency holdings', 'ownsCrypto'],
                ['Own your home', 'ownsHome'],
                ['Student loans', 'hasStudentLoans']
              ].map(([label, field]) => (
                <label key={field} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={(profile.financial as any)[field]}
                    onChange={(e) => updateProfile('financial', field, e.target.checked)}
                    className="rounded"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Charitable Donations ($)</label>
              <input
                type="number"
                placeholder="Amount donated annually"
                value={profile.financial.charitableDonations}
                onChange={(e) => updateProfile('financial', 'charitableDonations', parseInt(e.target.value) || 0)}
                className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Life Events</h2>
            <p className="text-sm text-gray-600">Select any life events you're planning or considering:</p>
            <div className="grid grid-cols-1 gap-2">
              {lifeEventOptions.map(event => (
                <label key={event} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={profile.lifeEvents.includes(event)}
                    onChange={() => toggleArrayItem('lifeEvents', 'lifeEvents', event)}
                    className="rounded"
                  />
                  <span className="text-sm">{event}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tax Goals</h2>
            <p className="text-sm text-gray-600">What are your main tax and financial goals?</p>
            <div className="grid grid-cols-1 gap-2">
              {taxGoalOptions.map(goal => (
                <label key={goal} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={profile.taxGoals.includes(goal)}
                    onChange={() => toggleArrayItem('taxGoals', 'taxGoals', goal)}
                    className="rounded"
                  />
                  <span className="text-sm">{goal}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Final Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Monthly Tax Withholding ($)</label>
              <input
                type="number"
                placeholder="Amount withheld for taxes monthly"
                value={profile.currentTaxWithholding}
                onChange={(e) => updateProfile('currentTaxWithholding', '', parseInt(e.target.value) || 0)}
                className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance for Tax Strategies</label>
              <select
                value={profile.riskTolerance}
                onChange={(e) => updateProfile('riskTolerance', '', e.target.value)}
                className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="conservative">Conservative - Prefer safe, guaranteed strategies</option>
                <option value="moderate">Moderate - Balanced approach to risk and reward</option>
                <option value="aggressive">Aggressive - Willing to take higher risks for potential savings</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-dm mx-auto">
      <div className="bg-white p-4 shadow-sm border-b">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h1 className="font-bold">Tax Profile Setup</h1>
            <p className="text-xs text-gray-500">Step {step} of 7</p>
          </div>
          <div className="w-6"></div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {renderStep()}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex space-x-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            {step === 7 ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Tax Planning Journey Component
const TaxPlanningJourney: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => {
  const [activeStage, setActiveStage] = useState('Entry Level');
  const [isLoading, setIsLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string>('');

  useEffect(() => {
    generateAIRecommendations();
  }, [activeStage, userProfile]);

  const generateAIRecommendations = async () => {
    setIsLoading(true);
    const prompt = `Based on this user's profile:
    - Name: ${userProfile.personalInfo.firstName} ${userProfile.personalInfo.lastName}
    - Age: ${userProfile.personalInfo.age}
    - Income: $${userProfile.income.primarySalary}
    - Filing Status: ${userProfile.personalInfo.filingStatus}
    - State: ${userProfile.personalInfo.state}
    - Life Stage: ${activeStage}
    - Has 401k: ${userProfile.financial.hasRetirement401k}
    - Has IRA: ${userProfile.financial.hasIRA}
    - Has HSA: ${userProfile.financial.hasHSA}
    - Owns Home: ${userProfile.financial.ownsHome}
    - Student Loans: ${userProfile.financial.hasStudentLoans}
    - Tax Goals: ${userProfile.taxGoals.join(', ')}
    
    Generate 4-6 specific, actionable tax planning recommendations for the ${activeStage} stage. Focus on strategies that match their financial situation and goals. Format as bullet points.`;

    const recommendations = await callGeminiAI(prompt);
    setAiRecommendations(recommendations);
    setIsLoading(false);
  };

  const taxJourneyStages = [
    { id: 'entry', label: 'Entry Level', active: true },
    { id: 'career', label: 'Career Growth', active: false },
    { id: 'family', label: 'Family Stage', active: false },
    { id: 'homeowner', label: 'Homeowner', active: false },
    { id: 'maxearning', label: 'Peak Earning', active: false },
    { id: 'preretire', label: 'Pre-Retirement', active: false },
    { id: 'retirement', label: 'Retirement', active: false }
  ];

  const planningCategories = [
    { name: '401(k) Setup', icon: '💼', description: 'Employer retirement plan optimization', enabled: userProfile.financial.hasRetirement401k },
    { name: 'Roth IRA', icon: '🎯', description: 'Tax-free retirement savings', enabled: userProfile.financial.hasIRA },
    { name: 'HSA Planning', icon: '🏥', description: 'Health Savings Account strategy', enabled: userProfile.financial.hasHSA },
    { name: 'Tax Withholding', icon: '📊', description: 'Optimize paycheck deductions', enabled: true },
    { name: 'Emergency Fund', icon: '🛡️', description: 'Build tax-efficient savings', enabled: true },
    { name: 'Home Planning', icon: '🏠', description: 'Homeownership tax benefits', enabled: userProfile.financial.ownsHome }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-800">Your Tax Planning Journey</h1>
          <div className="relative">
            <Bell size={20} className="text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 border-b border-gray-200">
        <div className="flex justify-center">
          <div className="flex space-x-2 overflow-x-auto">
            {taxJourneyStages.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center">
                <button
                  onClick={() => setActiveStage(stage.label)}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-xs font-medium text-center leading-tight ${
                    stage.label === activeStage
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}
                >
                  {stage.label.split(' ')[0]}
                </button>
                {index < taxJourneyStages.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-300 my-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-3 border-b border-gray-200">
        <div className="mb-3 flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full p-3 mr-3"></div>
          <h2 className="text-lg font-bold text-blue-500">{activeStage} Planning</h2>
        </div>
      </div>

      <div className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-3">
          {planningCategories.map((category, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow ${
                !category.enabled ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${category.enabled ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <div>
                  <div className="font-medium text-gray-800 flex items-center space-x-2 text-sm">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                    {!category.enabled && <span className="text-xs text-gray-400">(Not configured)</span>}
                  </div>
                  <div className="text-xs text-gray-500">{category.description}</div>
                </div>
              </div>
              <ChevronRight size={16} className={category.enabled ? 'text-blue-500' : 'text-gray-300'} />
            </div>
          ))}
        </div>

        <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2 text-sm">🤖 AI Recommendations for {activeStage}</h3>
          <div className="text-xs text-blue-700">
            {isLoading ? (
              <div className="text-center py-4">
                <div className="text-blue-600">Generating personalized recommendations...</div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{aiRecommendations}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  image?: string;
}

interface HomeScreenProps {
  setActiveScreen: (screen: string) => void;
  userProfile: UserProfile;
}

interface ChatScreenProps {
  chatMessages: ChatMessage[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  userProfile: UserProfile;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <div 
    className={`flex flex-col items-center cursor-pointer p-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} 
    onClick={onClick}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ setActiveScreen, userProfile }) => {
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generatePersonalizedInsights();
  }, [userProfile]);

  const generatePersonalizedInsights = async () => {
    setIsLoading(true);
    const prompt = `Based on this user's tax profile:
    - Name: ${userProfile.personalInfo.firstName}
    - Age: ${userProfile.personalInfo.age}
    - Income: $${userProfile.income.primarySalary}
    - State: ${userProfile.personalInfo.state}
    - Filing Status: ${userProfile.personalInfo.filingStatus}
    - Has Student Loans: ${userProfile.financial.hasStudentLoans}
    - Additional Income: ${userProfile.income.additionalIncome.join(', ')}
    - Tax Goals: ${userProfile.taxGoals.join(', ')}
    - Housing Cost: $${userProfile.expenses.housing}/month
    - Has 401k: ${userProfile.financial.hasRetirement401k}
    - Has IRA: ${userProfile.financial.hasIRA}
    - Has HSA: ${userProfile.financial.hasHSA}
    
    Generate exactly 3 personalized tax insights or action items. Each should be specific to their situation and actionable. Format each insight as: "Title|Description" separated by pipe character.`;

    const response = await callGeminiAI(prompt);
    const parsedInsights = response.split('\n').filter(line => line.includes('|')).slice(0, 3);
    setInsights(parsedInsights);
    setIsLoading(false);
  };

  const estimatedRefund = Math.max(0, (userProfile.currentTaxWithholding * 12) - (userProfile.income.primarySalary * 0.22));

  return (
    <div className="p-4 mx-auto max-w-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {userProfile.personalInfo.firstName}</h1>
          <p className="text-sm text-gray-500">{userProfile.personalInfo.state} • {userProfile.personalInfo.filingStatus}</p>
        </div>
        <div className="bg-blue-600 text-white p-2 rounded-full">
          <User size={20} />
        </div>
      </div>

      <div className="bg-blue-600 rounded-lg p-4 text-white mb-6">
        <h2 className="text-lg font-semibold mb-2">Tax Overview</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Monthly Withholding</p>
            <p className="text-2xl font-bold">${userProfile.currentTaxWithholding.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Estimated Refund</p>
            <p className="text-lg font-bold">${estimatedRefund.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">🤖 AI Tax Insights</h2>
        
        {isLoading ? (
          <div className="text-center py-4 text-gray-500">
            Analyzing your tax situation...
          </div>
        ) : (
          <div className="space-y-3">
            {insights.map((insight, index) => {
              const [title, description] = insight.split('|');
              const colors = ['blue', 'green', 'yellow'];
              const color = colors[index];
              
              return (
                <div key={index} className={`flex items-center space-x-3 p-3 bg-${color}-50 rounded-lg hover:bg-${color}-100 transition-colors cursor-pointer`}>
                  <AlertCircle size={20} className={`text-${color}-600 flex-shrink-0`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-gray-500">{description}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setActiveScreen('chat')}
            className="bg-blue-600 text-white p-3 rounded-lg text-sm font-medium"
          >
            Ask Tax AI
          </button>
          <button 
            onClick={() => setActiveScreen('plan')}
            className="bg-green-600 text-white p-3 rounded-lg text-sm font-medium"
          >
            View Plan
          </button>
          <button 
            onClick={() => setActiveScreen('documents')}
            className="bg-purple-600 text-white p-3 rounded-lg text-sm font-medium"
          >
            Upload Docs
          </button>
          <button 
            onClick={() => setActiveScreen('events')}
            className="bg-orange-600 text-white p-3 rounded-lg text-sm font-medium"
          >
            Life Events
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Your Profile Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Annual Income</span>
            <span className="font-medium">${userProfile.income.primarySalary.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Monthly Expenses</span>
            <span className="font-medium">${Object.values(userProfile.expenses).reduce((a, b) => a + b, 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Retirement Accounts</span>
            <span className="font-medium">
              {[userProfile.financial.hasRetirement401k && '401k', userProfile.financial.hasIRA && 'IRA', userProfile.financial.hasHSA && 'HSA']
                .filter(Boolean).join(', ') || 'None'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatScreen: React.FC<ChatScreenProps> = ({ chatMessages, newMessage, setNewMessage, setChatMessages, userProfile }) => {
  const [showLifeEvents, setShowLifeEvents] = useState(false);
  const [showIncomeOptions, setShowIncomeOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const lifeEvents = [
    "New job opportunity",
    "Planning for graduate school",
    "Moving to a new apartment",
    "Buying a car",
    "Starting retirement savings",
    "Planning a home purchase",
    "Starting a side business",
    "Health insurance change"
  ];
  
  const incomeOptions = [
    "Freelance work",
    "Investment dividends",
    "Rental income",
    "Part-time job",
    "Crypto trading",
    "Stock options",
    "Teaching/tutoring",
    "Content creation"
  ];

  const callGeminiAIWithContext = async (message: string, imageData?: string, conversationHistory: ChatMessage[] = []) => {
    try {
      const apiKey = 'AIzaSyAaAVH1P5vHbjHWRFZm3rOWYTUU1FngycE';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const userContext = `You are a helpful tax assistant for ${userProfile.personalInfo.firstName} ${userProfile.personalInfo.lastName}, a ${userProfile.personalInfo.age}-year-old ${userProfile.personalInfo.filingStatus} person living in ${userProfile.personalInfo.state} with an annual salary of $${userProfile.income.primarySalary}. Additional income sources: ${userProfile.income.additionalIncome.join(', ') || 'None'}. Monthly expenses total $${Object.values(userProfile.expenses).reduce((a, b) => a + b, 0)}. Has: ${[userProfile.financial.hasRetirement401k && '401k', userProfile.financial.hasIRA && 'IRA', userProfile.financial.hasHSA && 'HSA', userProfile.financial.ownsHome && 'Owns home', userProfile.financial.hasStudentLoans && 'Student loans'].filter(Boolean).join(', ')}. Tax goals: ${userProfile.taxGoals.join(', ')}. Current tax withholding: $${userProfile.currentTaxWithholding}/month.`;
      
      const contents: any[] = [];
      
      contents.push({
        role: "user",
        parts: [{ text: userContext }]
      });
      contents.push({
        role: "model", 
        parts: [{ text: `I understand. I'm ready to provide personalized tax advice for ${userProfile.personalInfo.firstName} based on their specific financial situation.` }]
      });
      
      const recentHistory = conversationHistory.slice(-20);
      recentHistory.forEach(msg => {
        if (msg.sender === 'user') {
          let parts: any[] = [{ text: msg.text }];
          if (msg.image) {
            parts.push({
              inline_data: {
                mime_type: "image/jpeg",
                data: msg.image.split(',')[1]
              }
            });
          }
          contents.push({
            role: "user",
            parts: parts
          });
        } else {
          contents.push({
            role: "model",
            parts: [{ text: msg.text }]
          });
        }
      });
      
      let currentParts: any[] = [{ text: message }];
      if (imageData) {
        currentParts.push({
          inline_data: {
            mime_type: "image/jpeg",
            data: imageData.split(',')[1]
          }
        });
      }
      
      contents.push({
        role: "user",
        parts: currentParts
      });

      const requestBody = {
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini AI:', error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsLoading(true);
    const newId = chatMessages.length + 1;
    const updatedMessages = [
      ...chatMessages,
      { id: newId, text: newMessage, sender: 'user' as const }
    ];
    setChatMessages(updatedMessages);
    
    const userMessage = newMessage;
    setNewMessage('');
    
    try {
      const response = await callGeminiAIWithContext(userMessage, undefined, chatMessages);
      
      setChatMessages((prev: ChatMessage[]) => [
        ...prev,
        { 
          id: prev.length + 1, 
          text: response, 
          sender: 'bot' 
        }
      ]);
    } catch (error) {
      setChatMessages((prev: ChatMessage[]) => [
        ...prev,
        { 
          id: prev.length + 1, 
          text: "I'm sorry, I encountered an error. Please try again.", 
          sender: 'bot' 
        }
      ]);
    }
    
    setIsLoading(false);
  };

  const handleLifeEventSelect = async (event: string) => {
    const updatedMessages = [
      ...chatMessages,
      { id: chatMessages.length + 1, text: `I'm considering: ${event}`, sender: 'user' as const }
    ];
    setChatMessages(updatedMessages);
    
    setShowLifeEvents(false);
    setIsLoading(true);
    
    try {
      const message = `I'm considering this life event: ${event}. Please provide specific, personalized tax advice for this situation, including potential deductions, credits, and strategies.`;
      
      const response = await callGeminiAIWithContext(message, undefined, chatMessages);
      
      setChatMessages((prev: ChatMessage[]) => [
        ...prev,
        { id: prev.length + 1, text: response, sender: 'bot' }
      ]);
    } catch (error) {
      setChatMessages((prev: ChatMessage[]) => [
        ...prev,
        { id: prev.length + 1, text: "I'm sorry, I encountered an error. Please try again.", sender: 'bot' }
      ]);
    }
    
    setIsLoading(false);
  };

  const handleIncomeOptionSelect = async (option: string) => {
    const updatedMessages = [
      ...chatMessages,
      { id: chatMessages.length + 1, text: `I'm planning to earn income through: ${option}`, sender: 'user' as const }
    ];
    setChatMessages(updatedMessages);
    
    setShowIncomeOptions(false);
    setIsLoading(true);
    
    try {
      const message = `I'm planning to earn additional income through: ${option}. Please provide specific, personalized tax advice for this additional income source, including tax implications, estimated tax rates, deductions, and quarterly payment requirements.`;
      
      const response = await callGeminiAIWithContext(message, undefined, chatMessages);
      
      setChatMessages((prev: ChatMessage[]) => [
        ...prev,
        { id: prev.length + 1, text: response, sender: 'bot' }
      ]);
    } catch (error) {
      setChatMessages((prev: ChatMessage[]) => [
        ...prev,
        { id: prev.length + 1, text: "I'm sorry, I encountered an error. Please try again.", sender: 'bot' }
      ]);
    }
    
    setIsLoading(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      
      setIsLoading(true);
      const updatedMessages = [
        ...chatMessages,
        { 
          id: chatMessages.length + 1, 
          text: "I've uploaded a receipt/document for analysis", 
          sender: 'user' as const,
          image: imageData
        }
      ];
      setChatMessages(updatedMessages);
      
      try {
        const message = `I've uploaded a receipt or document image. Please analyze this image and extract relevant tax information such as business expenses, medical expenses, charitable donations, or other tax-deductible items. Provide specific advice on how this expense can be used for tax purposes, what documentation to keep, and any relevant tax forms or schedules. Also mention the amount, date, vendor, and category of expense if visible.`;
        
        const response = await callGeminiAIWithContext(message, imageData, chatMessages);
        
        setChatMessages((prev: ChatMessage[]) => [
          ...prev,
          { 
            id: prev.length + 1, 
            text: response, 
            sender: 'bot' 
          }
        ]);
      } catch (error) {
        setChatMessages((prev: ChatMessage[]) => [
          ...prev,
          { 
            id: prev.length + 1, 
            text: "I'm sorry, I couldn't analyze the image. Please try again.", 
            sender: 'bot' 
          }
        ]);
      }
      
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto">
      <div className="bg-white p-4 shadow">
        <h1 className="text-lg font-bold">Tax AI Assistant</h1>
        <p className="text-xs text-gray-500">Personalized for {userProfile.personalInfo.firstName}</p>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md mx-auto">
          {chatMessages.map(msg => (
            <div 
              key={msg.id} 
              className={`rounded-lg p-3 mb-3 max-w-xs ${
                msg.sender === 'user' 
                  ? 'ml-auto bg-blue-600 text-white' 
                  : 'mr-auto bg-gray-200 text-gray-800'
              }`}
            >
              {msg.image && (
                <img 
                  src={msg.image} 
                  alt="Uploaded receipt" 
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <div className="whitespace-pre-wrap text-sm">{msg.text}</div>
            </div>
          ))}
          {isLoading && (
            <div className="mr-auto bg-gray-200 text-gray-800 rounded-lg p-3 mb-3 max-w-xs">
              <div className="text-sm">Analyzing with your profile...</div>
            </div>
          )}
        </div>
      </div>
      
      {showLifeEvents && (
        <div className="bg-white p-4 border-t border-gray-200 max-w-md mx-auto w-full">
          <h3 className="font-medium text-sm mb-3">Select Life Event:</h3>
          <div className="grid grid-cols-1 gap-2">
            {lifeEvents.map((event, index) => (
              <button 
                key={index}
                onClick={() => handleLifeEventSelect(event)}
                className="bg-gray-100 text-gray-700 p-3 rounded-lg text-sm text-left hover:bg-gray-200 transition-colors"
              >
                {event}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowLifeEvents(false)}
            className="mt-3 w-full text-blue-600 text-sm hover:text-blue-800"
          >
            Cancel
          </button>
        </div>
      )}
      
      {showIncomeOptions && (
        <div className="bg-white p-4 border-t border-gray-200 max-w-md mx-auto w-full">
          <h3 className="font-medium text-sm mb-3">Select Potential Income Source:</h3>
          <div className="grid grid-cols-1 gap-2">
            {incomeOptions.map((option, index) => (
              <button 
                key={index}
                onClick={() => handleIncomeOptionSelect(option)}
                className="bg-gray-100 text-gray-700 p-3 rounded-lg text-sm text-left hover:bg-gray-200 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowIncomeOptions(false)}
            className="mt-3 w-full text-blue-600 text-sm hover:text-blue-800"
          >
            Cancel
          </button>
        </div>
      )}
      
      {!showLifeEvents && !showIncomeOptions && (
        <div className="bg-white p-4 border-t border-gray-200 max-w-md mx-auto w-full">
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Message your tax assistant..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-blue-600 w-10 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <MessageCircle size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              onClick={() => setShowIncomeOptions(true)}
              disabled={isLoading}
            >
              New income
            </button>
            <button 
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              onClick={() => setShowLifeEvents(true)}
              disabled={isLoading}
            >
              Life event
            </button>
            <button 
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors flex items-center"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <Upload size={14} className="mr-1" />
              Upload receipt
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

const DocumentsScreen: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateDocumentSuggestions();
  }, [userProfile]);

  const generateDocumentSuggestions = async () => {
    setIsLoading(true);
    const prompt = `Based on this user's profile:
    - Has Student Loans: ${userProfile.financial.hasStudentLoans}
    - Additional Income: ${userProfile.income.additionalIncome.join(', ')}
    - Owns Home: ${userProfile.financial.ownsHome}
    - Has 401k: ${userProfile.financial.hasRetirement401k}
    - Self Employed: ${userProfile.income.selfEmployed}
    - Charitable Donations: $${userProfile.financial.charitableDonations}
    
    Generate a list of 5-8 tax documents they should collect. Format as "Document Name|Description|Priority" where priority is High/Medium/Low.`;

    const response = await callGeminiAI(prompt);
    const parsedDocs = response.split('\n')
      .filter(line => line.includes('|'))
      .slice(0, 8)
      .map((line, index) => {
        const [name, description, priority] = line.split('|');
        return {
          id: index + 1,
          name: name?.trim() || 'Document',
          description: description?.trim() || 'Important tax document',
          priority: priority?.trim() || 'Medium',
          date: new Date().toLocaleDateString(),
          collected: Math.random() > 0.7
        };
      });

    setDocuments(parsedDocs);
    setIsLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Tax Documents</h1>
        <button className="bg-blue-600 text-white p-2 w-10 rounded-full hover:bg-blue-700 transition-colors">
          <Plus size={20} />
        </button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search documents..."
            className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:bg-white focus:border focus:border-blue-400"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-500 mb-3">🤖 AI RECOMMENDED FOR YOU</h2>
        {isLoading ? (
          <div className="text-center py-4 text-gray-500">
            Analyzing your profile for document recommendations...
          </div>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg shadow p-4 flex items-center hover:shadow-md transition-shadow cursor-pointer">
                <div className={`p-3 rounded mr-4 ${
                  doc.priority === 'High' ? 'bg-red-100' : 
                  doc.priority === 'Medium' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <FileText size={20} className={
                    doc.priority === 'High' ? 'text-red-600' : 
                    doc.priority === 'Medium' ? 'text-yellow-600' : 'text-blue-600'
                  } />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-sm">{doc.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      doc.priority === 'High' ? 'bg-red-100 text-red-700' : 
                      doc.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {doc.priority}
                    </span>
                    {doc.collected && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        ✓ Collected
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{doc.description}</p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LifeEventsScreen: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => {
  const [aiEvents, setAiEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateLifeEventInsights();
  }, [userProfile]);

  const generateLifeEventInsights = async () => {
    setIsLoading(true);
    const prompt = `Based on this user's profile:
    - Age: ${userProfile.personalInfo.age}
    - Income: $${userProfile.income.primarySalary}
    - Current Life Events: ${userProfile.lifeEvents.join(', ')}
    - Tax Goals: ${userProfile.taxGoals.join(', ')}
    - Owns Home: ${userProfile.financial.ownsHome}
    - Has Student Loans: ${userProfile.financial.hasStudentLoans}
    
    Generate 3-4 relevant life events they should consider planning for, along with tax implications. Format as "Event Name|Tax Impact Description|Timeline|Priority" where priority is High/Medium/Low.`;

    const response = await callGeminiAI(prompt);
    const parsedEvents = response.split('\n')
      .filter(line => line.includes('|'))
      .slice(0, 4)
      .map((line, index) => {
        const [name, impact, timeline, priority] = line.split('|');
        return {
          id: index + 1,
          name: name?.trim() || 'Life Event',
          impact: impact?.trim() || 'Tax implications to consider',
          timeline: timeline?.trim() || 'Future',
          priority: priority?.trim() || 'Medium'
        };
      });

    setAiEvents(parsedEvents);
    setIsLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Life Events</h1>
        <button className="bg-blue-600 text-white p-2 w-10 rounded-full hover:bg-blue-700 transition-colors">
          <Plus size={20} />
        </button>
      </div>
      
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 mb-4">🤖 AI RECOMMENDED PLANNING</h2>
        
        {isLoading ? (
          <div className="text-center py-4 text-gray-500">
            Analyzing optimal life event planning for you...
          </div>
        ) : (
          <div className="space-y-4">
            {aiEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Calendar size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{event.name}</h3>
                    <p className="text-xs text-gray-500">{event.timeline}</p>
                  </div>
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    event.priority === 'High' ? 'bg-red-100 text-red-700' : 
                    event.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {event.priority}
                  </span>
                </div>
                <div className="bg-blue-50 p-3 rounded text-sm">
                  <p className="font-medium text-blue-800">Tax Impact:</p>
                  <p className="text-xs text-blue-700">{event.impact}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 mb-4">CURRENT LIFE EVENTS</h2>
        
        <div className="space-y-4">
          {userProfile.lifeEvents.length > 0 ? (
            userProfile.lifeEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Gift size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{event}</h3>
                    <p className="text-xs text-gray-500">In progress</p>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded text-sm">
                  <p className="font-medium text-green-800">Status:</p>
                  <p className="text-xs text-green-700">Actively planning for this life event</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No current life events. Add some through your profile!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileScreen: React.FC<{ userProfile: UserProfile; onLogout: () => void }> = ({ userProfile, onLogout }) => (
  <div className="p-4  mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold">Your Profile</h1>
      <button className="text-blue-600 text-sm font-medium hover:text-blue-800">Edit</button>
    </div>
    
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-4">
          <div className="bg-blue-600 text-white p-4 rounded-full mr-4">
            <User size={24} />
          </div>
          <div>
            <h2 className="font-medmax-w-smium text-lg">{userProfile.personalInfo.firstName} {userProfile.personalInfo.lastName}</h2>
            <p className="text-sm text-gray-500">{userProfile.personalInfo.email}</p>
            <p className="text-xs text-gray-400">Age: {userProfile.personalInfo.age}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Filing Status</p>
            <p className="text-sm font-medium">{userProfile.personalInfo.filingStatus}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Dependents</p>
            <p className="text-sm font-medium">{userProfile.personalInfo.dependents}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">State Residence</p>
            <p className="text-sm font-medium">{userProfile.personalInfo.state}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-medium mb-1">Income & Expenses</h2>
          <p className="text-sm text-gray-500">Your financial profile for tax optimization</p>
        </div>
        
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <p className="font-medium">Annual Salary</p>
            <p className="text-sm text-gray-500">{userProfile.income.employer}</p>
          </div>
          <p className="font-medium text-lg">${userProfile.income.primarySalary.toLocaleString()}</p>
        </div>
        
        <div className="p-4 border-b border-gray-100">
          <p className="font-medium mb-3">Monthly Expenses</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <p className="text-gray-500">Housing</p>
              <p className="font-medium">${userProfile.expenses.housing}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Transportation</p>
              <p className="font-medium">${userProfile.expenses.transportation}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Healthcare</p>
              <p className="font-medium">${userProfile.expenses.healthcare}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Education</p>
              <p className="font-medium">${userProfile.expenses.education}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 flex justify-between items-center">
          <p className="font-medium">Tax Withholdings</p>
          <p className="font-medium text-lg">${userProfile.currentTaxWithholding}/month</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-medium mb-1">Financial Accounts</h2>
        </div>
        <div className="p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <p className="text-gray-500">401(k)</p>
            <p className="font-medium">{userProfile.financial.hasRetirement401k ? '✓ Active' : '✗ None'}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">IRA</p>
            <p className="font-medium">{userProfile.financial.hasIRA ? '✓ Active' : '✗ None'}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">HSA</p>
            <p className="font-medium">{userProfile.financial.hasHSA ? '✓ Active' : '✗ None'}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Homeowner</p>
            <p className="font-medium">{userProfile.financial.ownsHome ? '✓ Yes' : '✗ No'}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow mt-6">
      <div className="px-4 py-4 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
        <p className="font-medium">Tax Preferences</p>
        <ChevronRight size={18} className="text-gray-400" />
      </div>
      <div className="px-4 py-4 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
        <p className="font-medium">Notification Settings</p>
        <ChevronRight size={18} className="text-gray-400" />
      </div>
      <div className="px-4 py-4 flex justify-between items-center text-red-500 hover:bg-red-50 cursor-pointer" onClick={onLogout}>
        <p className="font-medium">Sign Out</p>
      </div>
    </div>
  </div>
);

// Main App Component
const TaxAppMockup: React.FC = () => {
  const [appState, setAppState] = useState<'login' | 'signup' | 'questionnaire' | 'app'>('login');
  const [activeScreen, setActiveScreen] = useState('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [tempCredentials, setTempCredentials] = useState<{email: string; password: string} | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (userProfile) {
      setChatMessages([
        { 
          id: 1, 
          text: `Hi ${userProfile.personalInfo.firstName}! I'm your personalized tax assistant powered by Gemini AI. I've already analyzed your profile and I'm ready to provide contextual advice based on your ${userProfile.personalInfo.filingStatus} filing status, $${userProfile.income.primarySalary.toLocaleString()} income, and financial goals. How can I help you optimize your taxes today?`, 
          sender: 'bot' 
        }
      ]);
    }
  }, [userProfile]);

  const handleLogin = () => {
    // In a real app, validate credentials here
    setAppState('app');
    // For demo, use default profile
    setUserProfile({
      personalInfo: {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@example.com',
        age: 30,
        state: 'Texas',
        filingStatus: 'single',
        dependents: 0
      },
      income: {
        primarySalary: 95000,
        employer: 'Demo Company',
        additionalIncome: ['Freelance work'],
        selfEmployed: false,
        businessType: ''
      },
      expenses: {
        housing: 1500,
        transportation: 500,
        healthcare: 300,
        education: 400,
        insurance: 200,
        utilities: 85,
        personalLoans: 350,
        other: 200
      },
      financial: {
        hasRetirement401k: true,
        hasIRA: false,
        hasHSA: true,
        investmentAccounts: true,
        ownsCrypto: false,
        ownsHome: false,
        hasStudentLoans: true,
        charitableDonations: 1000
      },
      lifeEvents: ['Planning a home purchase'],
      taxGoals: ['Minimize current year taxes', 'Save for home purchase'],
      riskTolerance: 'moderate',
      currentTaxWithholding: 1650
    });
  };

  const handleSignupNext = (email: string, password: string) => {
    setTempCredentials({ email, password });
    setAppState('questionnaire');
  };

  const handleQuestionnaireComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState('app');
  };

  const handleLogout = () => {
    setAppState('login');
    setUserProfile(null);
    setTempCredentials(null);
    setChatMessages([]);
    setActiveScreen('home');
  };

  const renderScreen = () => {
    if (!userProfile) return null;

    switch(activeScreen) {
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} userProfile={userProfile} />;
      case 'chat':
        return <ChatScreen 
          chatMessages={chatMessages} 
          newMessage={newMessage} 
          setNewMessage={setNewMessage} 
          setChatMessages={setChatMessages}
          userProfile={userProfile}
        />;
      case 'documents':
        return <DocumentsScreen userProfile={userProfile} />;
      case 'events':
        return <LifeEventsScreen userProfile={userProfile} />;
      case 'plan':
        return <TaxPlanningJourney userProfile={userProfile} />;
      case 'profile':
        return <ProfileScreen userProfile={userProfile} onLogout={handleLogout} />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} userProfile={userProfile} />;
    }
  };

  if (appState === 'login') {
    return <LoginScreen onLogin={handleLogin} onSignup={() => setAppState('signup')} />;
  }

  if (appState === 'signup') {
    return <SignupScreen onNext={handleSignupNext} onBack={() => setAppState('login')} />;
  }

  if (appState === 'questionnaire' && tempCredentials) {
    return (
      <TaxProfileQuestionnaire 
        email={tempCredentials.email}
        password={tempCredentials.password}
        onComplete={handleQuestionnaireComplete}
        onBack={() => setAppState('signup')}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto border" style={{backgroundColor: '#fdfdfd'}}>
      <div className="flex-1 overflow-y-auto">
        {renderScreen()}
      </div>
      
      <div className="flex justify-around items-center p-4 bg-white border-t border-gray-200">
        <NavItem icon={<Home size={20} />} label="Home" isActive={activeScreen === 'home'} onClick={() => setActiveScreen('home')} />
        <NavItem icon={<MessageCircle size={20} />} label="Chat" isActive={activeScreen === 'chat'} onClick={() => setActiveScreen('chat')} />
        <NavItem icon={<Calendar size={20} />} label="Plan" isActive={activeScreen === 'plan'} onClick={() => setActiveScreen('plan')} />
        <NavItem icon={<FileText size={20} />} label="Docs" isActive={activeScreen === 'documents'} onClick={() => setActiveScreen('documents')} />
        <NavItem icon={<Gift size={20} />} label="Events" isActive={activeScreen === 'events'} onClick={() => setActiveScreen('events')} />
        <NavItem icon={<User size={20} />} label="Profile" isActive={activeScreen === 'profile'} onClick={() => setActiveScreen('profile')} />
      </div>
    </div>
  );
};

export default TaxAppMockup;