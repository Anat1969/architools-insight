import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const SectionCard = ({ title, subtitle, children, className = "" }: SectionCardProps) => {
  return (
    <div className={`info-card animate-fade-in ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export default SectionCard;
