import { ReactNode, useState } from "react";
import { FileText, HardHat, Car, Droplets, TreePine, Zap, Trash2, Waves, Leaf, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [open, setOpen] = useState(false);

  return (
    <section id={id} className="scroll-mt-20">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-3 mb-2 group cursor-pointer text-right">
            <div className={`p-2.5 rounded-lg bg-${colorVar}/10`}>
              <IconComponent className={`h-6 w-6 text-${colorVar}`} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
        <div className="section-divider" />
        <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="space-y-6 pt-2">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};

export default ChapterSection;
