import { useState } from 'react';
import type { CSSProperties, FC, ReactNode } from 'react';

export type DashboardVariant = 'admin' | 'attorney';

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  variant: DashboardVariant;
  onAccess?: () => void;
}

const variantClass: Record<DashboardVariant, string> = {
  admin: 'admin',
  attorney: 'attorney',
};

const DashboardCard: FC<DashboardCardProps> = ({ icon, title, description, features, variant, onAccess }) => {
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [cardStyle, setCardStyle] = useState<CSSProperties>({});

  const handleButtonClick = () => {
    if (loading) return;
    setLoading(true);
    setIsSelected(true);
    setCardStyle({ transform: 'scale(0.98)' });
    setTimeout(() => {
      setCardStyle({ transform: 'translateY(-5px)' });
      setTimeout(() => {
        setCardStyle({});
        setLoading(false);
        onAccess && onAccess();
      }, 200);
    }, 150);
  };

  return (
    <div 
      className={`card ${variantClass[variant]} ${isSelected ? 'selected' : ''}`} 
      style={cardStyle}
      onMouseEnter={() => !isSelected && setCardStyle({ transform: 'translateY(-4px)' })}
      onMouseLeave={() => !isSelected && setCardStyle({})}
    >
      <div className="card-header">
        <h2>
          <span className="icon">{icon}</span>
          {title}
        </h2>
        {isSelected && (
          <div className="selection-indicator">
            <span className="checkmark">✓</span>
          </div>
        )}
      </div>
      <p>{description}</p>
      <div className="features">
        <h3>Key Features:</h3>
        <ul>
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
      <button 
        onClick={handleButtonClick} 
        disabled={loading}
        className={isSelected ? 'selected' : ''}
      >
        {loading ? 'Loading...' : 'Access Dashboard'}
      </button>
    </div>
  );
};

export default DashboardCard; 