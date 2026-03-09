import { useState } from "react";
import { FileText, HardHat, Car, Droplets, TreePine, Zap, Trash2, Waves, Leaf, Menu, X, Building2, BookUser, Calculator } from "lucide-react";
import { chapters } from "@/data/permitData";

const iconMap: Record<string, any> = {
  FileText, HardHat, Car, Droplets, TreePine, Zap, Trash2, Waves, Leaf,
};

const tools = [
  { id: "phone-book", label: "ספר טלפונים", icon: BookUser },
  { id: "parking-calc", label: "מחשבון חניה", icon: Calculator },
  { id: "fee-calc", label: "מחשבון אגרות", icon: Calculator },
  { id: "waste-calc", label: "מחשבון אשפה", icon: Calculator },
  { id: "drainage-calc", label: "מחשבון ניקוז", icon: Calculator },
  { id: "green-calc", label: "מחשבון שטח ירוק", icon: TreePine },
];

interface DashboardNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const DashboardNav = ({ activeSection, onNavigate }: DashboardNavProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-primary text-primary-foreground p-2.5 rounded-lg shadow-lg"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-foreground/30 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-sidebar z-40 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        } lg:sticky lg:top-0 flex flex-col`}
      >
        <button
          onClick={() => handleClick("home")}
          className="p-5 border-b border-sidebar-border w-full text-right hover:bg-sidebar-accent/30 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Building2 className="h-7 w-7 text-sidebar-primary" />
            <div>
              <h1 className="text-base font-bold text-sidebar-foreground leading-tight">אוגדן הנחיות</h1>
              <p className="text-xs text-sidebar-foreground/60">מידע להיתר – עיריית אשדוד</p>
            </div>
          </div>
        </button>

        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <div className="text-[10px] uppercase tracking-wider text-sidebar-foreground/40 font-semibold px-3 mb-2">
            פרקי האוגדן
          </div>
          {chapters.map((ch) => {
            const Icon = iconMap[ch.icon] || FileText;
            const isActive = activeSection === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => handleClick(ch.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm transition-colors mb-0.5 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{ch.titleShort}</span>
              </button>
            );
          })}

          <div className="section-divider opacity-30" />
          <div className="text-[10px] uppercase tracking-wider text-sidebar-foreground/40 font-semibold px-3 mb-2">
            כלים
          </div>
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeSection === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => handleClick(tool.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm transition-colors mb-0.5 ${
                  isActive
                    ? "bg-sidebar-primary/20 text-sidebar-primary font-semibold"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{tool.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <p className="text-[10px] text-sidebar-foreground/40 text-center">
            נוסח מתאריך 01/01/2025
          </p>
        </div>
      </aside>
    </>
  );
};

export default DashboardNav;
