import { ReactNode } from "react";
import { FileText, HardHat, Car, Droplets, TreePine, Zap, Trash2, Waves, Leaf } from "lucide-react";

const iconMap: Record<string, any> = {
  FileText, HardHat, Car, Droplets, TreePine, Zap, Trash2, Waves, Leaf,
};

interface ChapterSectionProps {
  id: string;
  title: string;
  icon: string;
  colorVar: string;
  description: string;
  children: ReactNode;
}

const ChapterSection = ({ id, title, icon, colorVar, description, children }: ChapterSectionProps) => {
  const IconComponent = iconMap[icon] || FileText;

  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2.5 rounded-lg bg-${colorVar}/10`}>
          <IconComponent className={`h-6 w-6 text-${colorVar}`} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="section-divider" />
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
};

export default ChapterSection;
