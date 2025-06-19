import React, { useState } from 'react';
import { Home, MessageCircle, FileText, Gift, User, Plus, ChevronRight, Search, DollarSign, AlertCircle } from 'lucide-react';

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
}

interface HomeScreenProps {
  setActiveScreen: (screen: string) => void;
}

interface ChatScreenProps {
  chatMessages: ChatMessage[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

interface TaxAppMockupProps {
  onBack?: () => void;
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

const HomeScreen: React.FC<HomeScreenProps & { onBack?: () => void }> = ({ setActiveScreen, onBack }) => (
  <div className="p-4 mx-auto max-w-sm">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        {onBack && (
          <button 
            onClick={onBack}
            className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
            style={{ width: '2rem'}}
          >
            <ChevronRight size={20} className="rotate-180 text-gray-600" />
          </button>
        )}
        <h1 className="text-2xl font-bold">Tax AI</h1>
      </div>
      <div className="bg-blue-600 text-white p-2 rounded-full">
        <User size={20} />
      </div>
    </div>

    <div className="bg-blue-600 rounded-lg p-4 text-white mb-6">
      <h2 className="text-lg font-semibold mb-2">Next Tax Payment</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">Federal Income Tax</p>
          <p className="text-2xl font-bold">$1,650.00</p>
        </div>
        <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          Monthly Withholding
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Tax Insights</h2>
      
      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg mb-3 hover:bg-blue-100 transition-colors cursor-pointer">
        <AlertCircle size={20} className="text-blue-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">Student Loan Interest Deduction</p>
          <p className="text-xs text-gray-500">You may qualify for up to $2,500 in deductions</p>
        </div>
        <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
      </div>
      
      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg mb-3 hover:bg-green-100 transition-colors cursor-pointer">
        <DollarSign size={20} className="text-green-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">Retirement Savings Credit</p>
          <p className="text-xs text-gray-500">Consider opening an IRA to reduce tax liability</p>
        </div>
        <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
      </div>
      
      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer">
        <AlertCircle size={20} className="text-yellow-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">Withholding Check</p>
          <p className="text-xs text-gray-500">You may be withholding too little</p>
        </div>
        <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
      </div>
    </div>

    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <a href="#" className="text-blue-600 text-sm hover:text-blue-800">View All</a>
      </div>
      
      <div className="space-y-3">
        <div className="border-b border-gray-100 pb-3">
          <p className="text-sm font-medium">Updated salary information</p>
          <p className="text-xs text-gray-500">May 10, 2025</p>
        </div>
        
        <div className="border-b border-gray-100 pb-3">
          <p className="text-sm font-medium">Uploaded education loan statement</p>
          <p className="text-xs text-gray-500">May 5, 2025</p>
        </div>
        
        <div>
          <p className="text-sm font-medium">Added monthly expense information</p>
          <p className="text-xs text-gray-500">May 1, 2025</p>
        </div>
      </div>
    </div>

    <button 
      className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
      onClick={() => setActiveScreen('chat')}
    >
      <MessageCircle size={20} className="mr-2" />
      Talk to Tax AI
    </button>
  </div>
);

const ChatScreen: React.FC<ChatScreenProps> = ({ chatMessages, newMessage, setNewMessage, setChatMessages }) => {
  const [showLifeEvents, setShowLifeEvents] = useState(false);
  const [showIncomeOptions, setShowIncomeOptions] = useState(false);
  
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

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newId = chatMessages.length + 1;
    setChatMessages((prev: ChatMessage[]) => [
      ...prev,
      { id: newId, text: newMessage, sender: 'user' }
    ]);
    setNewMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages((prev: ChatMessage[]) => [
        ...prev,
        { 
          id: prev.length + 1, 
          text: "I've noted this information. Let me analyze potential tax implications and suggest strategies. Would you like me to help you set a reminder for relevant document collection?", 
          sender: 'bot' 
        }
      ]);
    }, 1000);
  };

  const handleLifeEventSelect = (event: string) => {
    setChatMessages([
      ...chatMessages,
      { id: chatMessages.length + 1, text: `I'm considering: ${event}`, sender: 'user' }
    ]);
    
    setShowLifeEvents(false);
    
    // Simulate bot response
    setTimeout(() => {
      let response = "";
      
      switch(event) {
        case "New job opportunity":
          response = "A job change could have several tax implications. If your salary increases, you may move to a higher tax bracket. You should check if your new employer's W-4 withholding is appropriate. Also, remember that unused FSA funds might be forfeited when changing jobs, so plan accordingly. Would you like me to help you set up a tax planning strategy for this potential income?";
          break;
        case "Planning for graduate school":
          response = "Graduate education expenses may qualify for tax benefits! The Lifetime Learning Credit could reduce your tax bill by up to $2,000 (20% of the first $10,000 in expenses). Student loan interest remains tax-deductible up to $2,500, and employer tuition assistance may be tax-free up to $5,250. Would you like me to estimate potential tax savings based on your expected education costs?";
          break;
        case "Planning a home purchase":
          response = "Buying a home introduces several tax considerations. As a first-time homebuyer, you might qualify for special programs. Once you own, mortgage interest and property taxes may be deductible if you itemize. Given your $95,000 income and current expenses, I'd recommend saving relevant documentation and possibly adjusting your withholding. Want me to run some numbers on how homeownership might affect your tax situation?";
          break;
        default:
          response = "This life event could have tax implications. Let me analyze this further based on your specific financial situation. Would you like me to provide a detailed breakdown of potential tax impacts and strategies?";
      }
      
      setChatMessages((prev: ChatMessage[]) => [
        ...prev,
        { id: prev.length + 1, text: response, sender: 'bot' }
      ]);
    }, 1000);
  };

  const handleIncomeOptionSelect = (option: string) => {
    setChatMessages([
      ...chatMessages,
      { id: chatMessages.length + 1, text: `I'm planning to earn income through: ${option}`, sender: 'user' }
    ]);
    
    setShowIncomeOptions(false);
    
    // Simulate bot response
    setTimeout(() => {
      let response = "";
      
      switch(option) {
        case "Freelance work":
          response = "Freelance work is considered self-employment income, which has specific tax requirements. You'll likely need to pay quarterly estimated taxes and self-employment tax (15.3% for Social Security and Medicare). However, you can deduct business expenses like home office, software, equipment, and professional development. Based on your current $95,000 salary, additional income could push you into a higher tax bracket. Would you like me to help you set up a tax planning strategy for your freelance work?";
          break;
        case "Investment dividends":
          response = "Investment dividends are typically taxed at special capital gains rates, which are lower than ordinary income rates. Qualified dividends are taxed at 0%, 15%, or 20% depending on your income level. With your $95,000 salary, you'd likely be in the 15% bracket for qualified dividends. I recommend keeping detailed records of all investment transactions for tax reporting. Would you like me to help you understand how dividend income might impact your overall tax situation?";
          break;
        case "Rental income":
          response = "Rental income offers both tax obligations and advantages. The income is taxable, but you can deduct expenses like mortgage interest, property taxes, insurance, maintenance, and depreciation. Given your current financial profile, adding rental income could affect your tax bracket, but the deductions often offset much of the taxable amount. Should I create a detailed tax projection for a potential rental property based on your situation?";
          break;
        default:
          response = "This additional income source will have specific tax implications. Based on your current $95,000 salary and expenses, I can help you plan for the tax impact. Would you like me to create a tax estimate showing how this additional income might affect your tax situation?";
      }
      
      setChatMessages((prev: ChatMessage[]) => [
        ...prev,
        { id: prev.length + 1, text: response, sender: 'bot' }
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full max-w-sm mx-auto">
      <div className="bg-white p-4 shadow">
        <h1 className="text-lg font-bold">Tax AI Assistant</h1>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-sm mx-auto">
          {chatMessages.map(msg => (
            <div 
              key={msg.id} 
              className={`rounded-lg p-3 mb-3 max-w-xs ${
                msg.sender === 'user' 
                  ? 'ml-auto bg-blue-600 text-white' 
                  : 'mr-auto bg-gray-200 text-gray-800'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{msg.text}</div>
            </div>
          ))}
        </div>
      </div>
      
      {showLifeEvents && (
        <div className="bg-white p-4 border-t border-gray-200 max-w-sm mx-auto w-full">
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
        <div className="bg-white p-4 border-t border-gray-200 max-w-sm mx-auto w-full">
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
        <div className="bg-white p-4 border-t border-gray-200 max-w-sm mx-auto w-full">
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Message your tax assistant..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-600 w-10 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <MessageCircle size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              onClick={() => setShowIncomeOptions(true)}
            >
              New income
            </button>
            <button 
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
              onClick={() => setShowLifeEvents(true)}
            >
              Life event
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
              Upload receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DocumentsScreen: React.FC = () => (
  <div className="p-4 max-w-sm mx-auto">
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
    
    <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
      {['All', 'Receipts', 'W-2', 'Loans', 'Rent'].map((filter, index) => (
        <button 
          key={filter}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            index === 0 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
    
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-gray-500 mb-3">MAY 2025</h2>
        <div className="space-y-2">
          {[
            { name: 'Rent Payment Receipt', date: 'May 12, 2025', color: 'blue' },
            { name: 'Car Insurance Statement', date: 'May 5, 2025', color: 'blue' }
          ].map((doc, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center hover:shadow-md transition-shadow cursor-pointer">
              <div className={`bg-${doc.color}-100 p-3 rounded mr-4`}>
                <FileText size={20} className={`text-${doc.color}-600`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.date}</p>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-sm font-semibold text-gray-500 mb-3">APRIL 2025</h2>
        <div className="space-y-2">
          {[
            { name: 'Education Loan Statement', date: 'April 28, 2025', color: 'green' },
            { name: 'Rent Payment Receipt', date: 'April 15, 2025', color: 'blue' },
            { name: 'Personal Loan Statement', date: 'April 10, 2025', color: 'purple' }
          ].map((doc, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center hover:shadow-md transition-shadow cursor-pointer">
              <div className={`bg-${doc.color}-100 p-3 rounded mr-4`}>
                <FileText size={20} className={`text-${doc.color}-600`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.date}</p>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const LifeEventsScreen: React.FC = () => (
  <div className="p-4 max-w-sm mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold">Life Events</h1>
      <button className="bg-blue-600 text-white p-2 w-10 rounded-full hover:bg-blue-700 transition-colors">
        <Plus size={20} />
      </button>
    </div>
    
    <p className="text-sm text-gray-600 mb-6">
      Add important life events that may impact your taxes.
    </p>
    
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-500 mb-4">UPCOMING</h2>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-3">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <DollarSign size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Potential Job Change</h3>
              <p className="text-xs text-gray-500">Considering for August 2025</p>
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded text-sm">
            <p className="font-medium text-purple-800">Tax Impact:</p>
            <p className="text-xs text-purple-700">New W-2, possible changes in tax brackets and withholdings. May need to adjust W-4 with new employer.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Home size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Considering Home Purchase</h3>
              <p className="text-xs text-gray-500">Researching for Q4 2025</p>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded text-sm">
            <p className="font-medium text-blue-800">Tax Impact:</p>
            <p className="text-xs text-blue-700">Mortgage interest and property tax deductions may be available. First-time homebuyer benefits may apply.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h2 className="text-sm font-semibold text-gray-500 mb-4">PAST EVENTS</h2>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-3">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Salary Increase</h3>
              <p className="text-xs text-gray-500">January, 2025</p>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded text-sm">
            <p className="font-medium text-green-800">Tax Impact:</p>
            <p className="text-xs text-green-700">Placed in higher tax bracket. Withholding amounts adjusted. Possible impact on student loan interest deduction eligibility.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-3">
            <div className="bg-gray-100 p-3 rounded-full mr-4">
              <User size={20} className="text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Refinanced Education Loan</h3>
              <p className="text-xs text-gray-500">November, 2024</p>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded text-sm">
            <p className="font-medium text-gray-800">Tax Impact:</p>
            <p className="text-xs text-gray-700">Still eligible for student loan interest deduction. New loan servicer information needed for tax forms.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProfileScreen: React.FC = () => (
  <div className="p-4 max-w-sm mx-auto">
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
            <h2 className="font-medium text-lg">Michael Chen</h2>
            <p className="text-sm text-gray-500">michael.c@example.com</p>
            <p className="text-xs text-gray-400">Age: 30</p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Filing Status</p>
            <p className="text-sm font-medium">Single</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">Dependents</p>
            <p className="text-sm font-medium">0</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500">State Residence</p>
            <p className="text-sm font-medium">Texas</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-medium mb-1">Income & Expenses</h2>
          <p className="text-sm text-gray-500">Manage your financial information for tax calculations</p>
        </div>
        
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <p className="font-medium">Annual Salary</p>
            <p className="text-sm text-gray-500">Private Company</p>
          </div>
          <p className="font-medium text-lg">$95,000</p>
        </div>
        
        <div className="p-4 border-b border-gray-100">
          <p className="font-medium mb-3">Monthly Expenses</p>
          <div className="space-y-2 text-sm">
            {[
              ['Rent', '$1,500'],
              ['Car Payment', '$500'],
              ['Education Loan', '$400'],
              ['Personal Loan', '$350'],
              ['Health Insurance', '$300'],
              ['Car Insurance', '$200'],
              ['Internet', '$85'],
              ['Mobile', '$30']
            ].map(([label, amount]) => (
              <div key={label} className="flex justify-between">
                <p className="text-gray-500">{label}</p>
                <p className="font-medium">{amount}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 flex justify-between items-center">
          <p className="font-medium">Tax Withholdings</p>
          <p className="font-medium text-lg">$1,650/month</p>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow mt-6">
      {[
        'Connected Accounts',
        'Tax Preferences', 
        'Notification Settings'
      ].map((item) => (
        <div key={item} className="px-4 py-4 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
          <p className="font-medium">{item}</p>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
      ))}
      <div className="px-4 py-4 flex justify-between items-center text-red-500 hover:bg-red-50 cursor-pointer">
        <p className="font-medium">Sign Out</p>
      </div>
    </div>
  </div>
);

const TaxAppMockup: React.FC<TaxAppMockupProps> = ({ onBack }) => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hi Michael! I'm your personal tax assistant. How can I help you today?", sender: 'bot' },
    { id: 2, text: "I'm thinking of starting some freelance work on weekends for extra income. Would that affect my taxes?", sender: 'user' },
    { id: 3, text: "Great question! Freelance income is considered self-employment income, which has some important tax implications:\n\n1. You'll need to pay self-employment tax (15.3%) to cover Social Security and Medicare\n2. You may need to make quarterly estimated tax payments\n3. You can deduct business expenses to reduce your taxable income\n\nWith your current $95,000 salary, additional income could push you into a higher tax bracket. I recommend tracking all business expenses carefully. Would you like me to help you set up a tax planning strategy for this potential income?", sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const renderScreen = () => {
    switch(activeScreen) {
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} onBack={onBack} />;
      case 'chat':
        return <ChatScreen 
          chatMessages={chatMessages} 
          newMessage={newMessage} 
          setNewMessage={setNewMessage} 
          setChatMessages={setChatMessages} 
        />;
      case 'documents':
        return <DocumentsScreen />;
      case 'events':
        return <LifeEventsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-full max-w-sm border mx-auto">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {renderScreen()}
      </div>
      
      {/* Bottom navigation */}
      <div className="flex justify-around items-center p-4 bg-white border-t border-gray-200">
        <NavItem icon={<Home size={24} />} label="Home" isActive={activeScreen === 'home'} onClick={() => setActiveScreen('home')} />
        <NavItem icon={<MessageCircle size={24} />} label="Chat" isActive={activeScreen === 'chat'} onClick={() => setActiveScreen('chat')} />
        <NavItem icon={<FileText size={24} />} label="Docs" isActive={activeScreen === 'documents'} onClick={() => setActiveScreen('documents')} />
        <NavItem icon={<Gift size={24} />} label="Events" isActive={activeScreen === 'events'} onClick={() => setActiveScreen('events')} />
        <NavItem icon={<User size={24} />} label="Profile" isActive={activeScreen === 'profile'} onClick={() => setActiveScreen('profile')} />
      </div>
    </div>
  );
};

export default TaxAppMockup;