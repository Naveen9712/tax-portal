import React, { useState, useRef } from 'react';
import { Home, MessageCircle, FileText, Gift, User, Plus, ChevronRight, Search, DollarSign, AlertCircle, Calendar, Bell, Camera, Upload } from 'lucide-react';

// Tax Planning Journey Component
const TaxPlanningJourney = () => {
  const [activeStage, setActiveStage] = useState('Entry Level');

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
    { name: '401(k) Setup', icon: '💼', description: 'Employer retirement plan optimization' },
    { name: 'Roth IRA', icon: '🎯', description: 'Tax-free retirement savings' },
    { name: 'HSA Planning', icon: '🏥', description: 'Health Savings Account strategy' },
    { name: 'Tax Withholding', icon: '📊', description: 'Optimize paycheck deductions' },
    { name: 'Emergency Fund', icon: '🛡️', description: 'Build tax-efficient savings' },
    { name: 'Credit Building', icon: '📈', description: 'Build credit for tax benefits' }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-sm mx-auto">
      {/* Title and Notification */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-800">Your Tax Planning Journey</h1>
          <div className="relative">
            <Bell size={20} className="text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white p-3 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs whitespace-nowrap">
            Tax Status
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs whitespace-nowrap">
            Find CPA
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs whitespace-nowrap">
            File Taxes
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs whitespace-nowrap">
            Update Profile
          </button>
        </div>
      </div>
      {/* Tax Journey Stages - Moved below Entry Level Planning */}
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

      {/* Entry Level Planning Section */}
      <div className="bg-white p-3 border-b border-gray-200">
        <div className="mb-3" style={{display: 'flex'}}>
        <div className="w-2 h-2 bg-blue-500 rounded-full p-3 mr-3"></div>
          <h2 className="text-lg font-bold text-blue-500">{activeStage} Planning</h2>
          
        </div>
      </div>

      

      {/* Main Content Area - No sidebar now */}
      <div className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-3">
          {planningCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-gray-800 flex items-center space-x-2 text-sm">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">{category.description}</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-blue-500" />
            </div>
          ))}
        </div>

        {/* Additional Information Card */}
        <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2 text-sm">💡 {activeStage} Tax Tips</h3>
          <div className="text-xs text-blue-700">
            {activeStage === 'Entry Level' && (
              <ul className="space-y-1">
                <li>• Start contributing to 401(k) immediately for employer match</li>
                <li>• Open a Roth IRA for tax-free growth</li>
                <li>• Set up HSA if eligible for triple tax advantage</li>
                <li>• Review tax withholdings to avoid overpaying</li>
              </ul>
            )}
            {activeStage === 'Career Growth' && (
              <ul className="space-y-1">
                <li>• Increase 401(k) contributions with salary raises</li>
                <li>• Consider backdoor Roth IRA if income limits apply</li>
                <li>• Maximize HSA contributions for future medical expenses</li>
                <li>• Start tax-loss harvesting in investment accounts</li>
              </ul>
            )}
            {activeStage === 'Family Stage' && (
              <ul className="space-y-1">
                <li>• Claim Child Tax Credit and dependent exemptions</li>
                <li>• Open 529 education savings plans</li>
                <li>• Consider Dependent Care FSA for childcare</li>
                <li>• Review life insurance for tax benefits</li>
              </ul>
            )}
            {activeStage === 'Homeowner' && (
              <ul className="space-y-1">
                <li>• Deduct mortgage interest and property taxes</li>
                <li>• Track home improvement costs for future sale</li>
                <li>• Consider home equity loan interest deductions</li>
                <li>• Maintain records for home office deductions</li>
              </ul>
            )}
            {activeStage === 'Peak Earning' && (
              <ul className="space-y-1">
                <li>• Max out all retirement account contributions</li>
                <li>• Consider mega backdoor Roth strategies</li>
                <li>• Implement tax-loss harvesting strategies</li>
                <li>• Plan for Alternative Minimum Tax (AMT)</li>
              </ul>
            )}
            {activeStage === 'Pre-Retirement' && (
              <ul className="space-y-1">
                <li>• Plan Roth IRA conversions to manage tax brackets</li>
                <li>• Consider catch-up contributions (50+)</li>
                <li>• Optimize Social Security claiming strategy</li>
                <li>• Plan required minimum distributions (RMDs)</li>
              </ul>
            )}
            {activeStage === 'Retirement' && (
              <ul className="space-y-1">
                <li>• Manage withdrawal order to minimize taxes</li>
                <li>• Take required minimum distributions on time</li>
                <li>• Consider qualified charitable distributions</li>
                <li>• Plan estate tax strategies for heirs</li>
              </ul>
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
            style={{width: '2rem'}}
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

  // Gemini AI API call function
  const callGeminiAI = async (message: string, imageData?: string) => {
    try {
      const apiKey = 'AIzaSyAaAVH1P5vHbjHWRFZm3rOWYTUU1FngycE'; // Placeholder API key
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      let parts: any[] = [{ text: message }];
      
      // Add image data if provided
      if (imageData) {
        parts.push({
          inline_data: {
            mime_type: "image/jpeg",
            data: imageData.split(',')[1] // Remove data:image/jpeg;base64, prefix
          }
        });
      }

      const requestBody = {
        contents: [{
          parts: parts
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
    setChatMessages((prev: ChatMessage[]) => [
      ...prev,
      { id: newId, text: newMessage, sender: 'user' }
    ]);
    
    const userMessage = newMessage;
    setNewMessage('');
    
    try {
      // Create context-aware message for Gemini AI
      const contextMessage = `You are a helpful tax assistant helping Michael Chen, a 30-year-old single person living in Texas with an annual salary of $95,000. His monthly expenses include rent ($1,500), car payment ($500), education loan ($400), personal loan ($350), health insurance ($300), car insurance ($200), internet ($85), and mobile ($30). His tax withholdings are $1,650/month. Please provide helpful, personalized tax advice based on this context. User message: ${userMessage}`;
      
      const response = await callGeminiAI(contextMessage);
      
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
    setChatMessages([
      ...chatMessages,
      { id: chatMessages.length + 1, text: `I'm considering: ${event}`, sender: 'user' }
    ]);
    
    setShowLifeEvents(false);
    setIsLoading(true);
    
    try {
      const contextMessage = `You are a helpful tax assistant helping Michael Chen, a 30-year-old single person living in Texas with an annual salary of $95,000. His monthly expenses include rent ($1,500), car payment ($500), education loan ($400), personal loan ($350), health insurance ($300), car insurance ($200), internet ($85), and mobile ($30). His tax withholdings are $1,650/month. The user is considering this life event: ${event}. Please provide specific, personalized tax advice for this situation, including potential deductions, credits, and strategies.`;
      
      const response = await callGeminiAI(contextMessage);
      
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
    setChatMessages([
      ...chatMessages,
      { id: chatMessages.length + 1, text: `I'm planning to earn income through: ${option}`, sender: 'user' }
    ]);
    
    setShowIncomeOptions(false);
    setIsLoading(true);
    
    try {
      const contextMessage = `You are a helpful tax assistant helping Michael Chen, a 30-year-old single person living in Texas with an annual salary of $95,000. His monthly expenses include rent ($1,500), car payment ($500), education loan ($400), personal loan ($350), health insurance ($300), car insurance ($200), internet ($85), and mobile ($30). His tax withholdings are $1,650/month. The user is planning to earn additional income through: ${option}. Please provide specific, personalized tax advice for this additional income source, including tax implications, estimated tax rates, deductions, and quarterly payment requirements.`;
      
      const response = await callGeminiAI(contextMessage);
      
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
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      
      setIsLoading(true);
      setChatMessages((prev: ChatMessage[]) => [
        ...prev,
        { 
          id: prev.length + 1, 
          text: "I've uploaded a receipt/document for analysis", 
          sender: 'user',
          image: imageData
        }
      ]);
      
      try {
        const contextMessage = `You are a helpful tax assistant. The user has uploaded a receipt or document image. Please analyze this image and extract relevant tax information such as business expenses, medical expenses, charitable donations, or other tax-deductible items. Provide specific advice on how this expense can be used for tax purposes, what documentation to keep, and any relevant tax forms or schedules. Also mention the amount, date, vendor, and category of expense if visible.`;
        
        const response = await callGeminiAI(contextMessage, imageData);
        
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
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
              <div className="text-sm">Thinking...</div>
            </div>
          )}
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
    { id: 1, text: "Hi Michael! I'm your personal tax assistant powered by Gemini AI. I can help you with tax planning, analyze receipts, and answer questions about your specific financial situation. How can I help you today?", sender: 'bot' }
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
      case 'plan':
        return <TaxPlanningJourney />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-sm mx-auto border"
    style={{backgroundColor: '#fdfdfd'}}>
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {renderScreen()}
      </div>
      
      {/* Bottom navigation */}
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