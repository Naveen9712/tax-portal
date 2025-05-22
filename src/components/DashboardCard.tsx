import { useState } from 'react';
import type { CSSProperties, FC, ReactNode } from 'react';

export type DashboardVariant = 'admin' | 'attorney' | 'dso' | 'employer';

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
  dso: 'dso',
  employer: 'employer',
};

const DashboardCard: FC<DashboardCardProps> = ({ icon, title, description, features, variant, onAccess }) => {
  const [loading, setLoading] = useState(false);
  const [cardStyle, setCardStyle] = useState<CSSProperties>({});

  const handleButtonClick = () => {
    if (loading) return;
    setLoading(true);
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
    <div className={`card ${variantClass[variant]}`} style={cardStyle}>
      <h2>
        <span className="icon">{icon}</span>
        {title}
      </h2>
      <p>{description}</p>
      <div className="features">
        <h3>Key Features:</h3>
        <ul>
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleButtonClick} disabled={loading}>
        {loading ? 'Loading...' : 'Access Dashboard'}
      </button>
    </div>
  );
};

export default DashboardCard; 