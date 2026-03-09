import { useState, useCallback } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ContactTable from "@/components/dashboard/ContactTable";
import RequirementsList from "@/components/dashboard/RequirementsList";
import SectionCard from "@/components/dashboard/SectionCard";
import ProcessTimeline from "@/components/dashboard/ProcessTimeline";
import ParkingCalculator from "@/components/dashboard/ParkingCalculator";
import FeeCalculator from "@/components/dashboard/FeeCalculator";
import WasteCalculator from "@/components/dashboard/WasteCalculator";
import DrainageCalculator from "@/components/dashboard/DrainageCalculator";
import GreenAreaCalculator from "@/components/dashboard/GreenAreaCalculator";
import PhoneBook from "@/components/dashboard/PhoneBook";
import {
  chapters,
  licensingContacts, supervisionContacts, roadsContacts,
  drainageContacts, electricityContacts, sanitationContacts,
  waterContacts, environmentContacts,
  bankAccounts,
  graphicContentRequirements, developmentPlanRequirements,
  parkingRequirements, electricityRequirements,
  drainageGraphicContent, plantingGuidelines,
  environmentRequirements,
} from "@/data/permitData";
import { Info, AlertTriangle, FileText, HardHat, Car, Droplets, TreePine, Zap, Trash2, Waves, Leaf, BookUser, Calculator } from "lucide-react";

const iconMap: Record<string, any> = {
  FileText, HardHat, Car, Droplets, TreePine, Zap, Trash2, Waves, Leaf,
};

// ---------- Section content panels ----------

const LicensingSection = () => (
  <div className="space-y-6">
    <SectionCard title="אנשי קשר – מחלקת רישוי" subtitle="קבלת קהל: ימים א'-ה', 8:30-12:00 | טלפוני: 8:30-11:00">
      <ContactTable contacts={licensingContacts} />
    </SectionCard>
    <SectionCard title="תחום אחריות">
      <p className="text-sm text-foreground/80 leading-relaxed">
        מחלקת הרישוי אחראית לבדיקת התאמת בקשות להיתר להוראות חוק התכנון והבנייה (תשכ"ה 1965),
        לתקנותיו ותיקוניו, למדיניות הוועדה, להנחיות המרחביות ולתכניות החלות בקרקע.
      </p>
    </SectionCard>
    <SectionCard title="מסלולי הגשה">
      <ProcessTimeline />
    </SectionCard>
    <RequirementsList title="תכולה גרפית – התכנית הראשית" items={graphicContentRequirements} variant="number" />
    <SectionCard title="הזמנת תיק בניין / היתרים קודמים" subtitle="מענה טלפוני: ימים א'-ה', 8:00-12:00">
      <p className="text-sm text-foreground/80 mb-3">טלפונים: 08-8545327, 08-8545153</p>
      <p className="text-sm text-foreground/80 mb-3">דוא"ל: archiv@ashdod.muni.il</p>
      <div className="bg-destructive/5 rounded-lg p-3 flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/80">תיק בניין שהוזמן יישאר בארכיב 10 ימים מקבלתו ולאחר מכן יוחזר לגנזך.</p>
      </div>
    </SectionCard>
    <SectionCard title="פרטי חשבונות בנק לתשלום אגרות/פיקדון">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-right py-2 px-3 text-muted-foreground font-semibold">בנק</th>
              <th className="text-right py-2 px-3 text-muted-foreground font-semibold">מס' בנק</th>
              <th className="text-right py-2 px-3 text-muted-foreground font-semibold">סניף</th>
              <th className="text-right py-2 px-3 text-muted-foreground font-semibold">חשבון</th>
              <th className="text-right py-2 px-3 text-muted-foreground font-semibold">IBAN</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((b, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                <td className="py-2 px-3 font-medium">{b.bank}</td>
                <td className="py-2 px-3 font-grotesk">{b.bankNum}</td>
                <td className="py-2 px-3 font-grotesk">{b.branch}</td>
                <td className="py-2 px-3 font-grotesk">{b.account}</td>
                <td className="py-2 px-3 font-grotesk text-xs">{b.iban}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        לאחר ביצוע תשלום יש להעביר אסמכתא + הודעת חיוב במייל: agrot@asdod.muni.il
      </p>
    </SectionCard>
    <FeeCalculator />
  </div>
);

const SupervisionSection = () => (
  <div className="space-y-6">
    <SectionCard title="אנשי קשר – מחלקת פיקוח" subtitle="קבלת קהל: בזימון מראש | טלפוני: ימים א'-ה', 8:30-11:00">
      <ContactTable contacts={supervisionContacts} />
    </SectionCard>
    <SectionCard title="תחום אחריות">
      <p className="text-sm text-foreground/80 leading-relaxed mb-3">
        מחלקת הפיקוח על הבנייה היא הגורם הבלעדי המופקד על אכיפת חוק התכנון והבנייה.
        תחום האחריות כולל:
      </p>
      <RequirementsList title="" items={[
        "מעקב ופיקוח על ביצוע הבנייה בהתאם להיתר",
        "אישור תחילת עבודות (טופס 2) – חיבור מים, בנייה, חשמל",
        "איתור עבירות בנייה ושימושים חורגים",
        "ביצוע צווים מינהליים (הפסקת עבודה, הריסה)",
        "מתן תעודת גמר",
        "אישור טיולים (אישור מכירה/העברה לטאבו)",
        "טיפול ברישיון עסק",
      ]} />
    </SectionCard>
    <SectionCard title="דרישות לאישור תחילת עבודות">
      <div className="bg-destructive/5 rounded-lg p-3 flex items-start gap-2 mb-4">
        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/80 font-medium">
          אין לבצע עבודות עפ"י היתר בנייה ללא קבלת אישור תחילת עבודות!
        </p>
      </div>
      <p className="text-sm text-foreground/80">
        יש להגיש תכנית גידור והתארגנות אתר ונקיטת אמצעי בטיחות.
        ההנחיות לעריכת תכנית זו נמצאות באתר עיריית אשדוד, תחת מינהל הנדסה.
      </p>
    </SectionCard>
  </div>
);

const RoadsSection = () => (
  <div className="space-y-6">
    <SectionCard title="אנשי קשר – מחלקת תכנון כבישים" subtitle="טלפוני: ימים א'-ה', 8:30-11:00 | קבלת קהל: בזימון מראש">
      <ContactTable contacts={roadsContacts} />
    </SectionCard>
    <RequirementsList title="תכולה גרפית – תכנית פיתוח שטח" items={developmentPlanRequirements} variant="number" />
    <RequirementsList title="דרישות חניה – הנחיות ודגשים" items={parkingRequirements} />
    <ParkingCalculator />
  </div>
);

const DrainageSection = () => (
  <div className="space-y-6">
    <SectionCard title="אנשי קשר – אגף ניקוז ונחלים" subtitle="קבלת קהל: בזימון מראש">
      <ContactTable contacts={drainageContacts} />
    </SectionCard>
    <RequirementsList title="תכולה גרפית – נספח ניקוז" items={drainageGraphicContent} variant="number" />
    <SectionCard title="דגשים לתכנון ניקוז">
      <ul className="space-y-2 text-sm text-foreground/80">
        <li>• פתרון ניקוז עילי לכיוון הכניסה למגרש, האפשר במידת</li>
        <li>• חיבור לרשת עירונית דרך תאי בקרה בתיאום עם מח' ניקוז</li>
        <li>• בבקשות לתעשייה/מזון – לצרף דרישות משרד הבריאות לנספח</li>
        <li>• בבקשות עם חובת בקרה מכון – הנספח יתואם עם אגף הניקוז טרם העברה לבקרה</li>
      </ul>
    </SectionCard>
  </div>
);

const PlantingSection = () => (
  <div className="space-y-6">
    <SectionCard title="הנחיות לגינון ונטיעות">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plantingGuidelines.map((section, idx) => (
          <div key={idx}>
            <h4 className="font-semibold text-sm mb-2 text-primary">{section.title}</h4>
            <ul className="space-y-1.5">
              {section.items.map((item, i) => (
                <li key={i} className="text-xs text-foreground/75 flex items-start gap-1.5">
                  <span className="text-chapter-planting mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionCard>
    <SectionCard title="שלבי אישור נטיעות">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["בקרה מרחבית", "שלב התכן", "תחילת עבודות", "תעודת גמר"].map((stage, idx) => (
          <div key={idx} className="bg-secondary rounded-lg p-3 text-center">
            <div className="font-grotesk font-bold text-chapter-planting text-lg">{idx + 1}</div>
            <div className="text-xs font-medium mt-1">{stage}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  </div>
);

const ElectricitySection = () => (
  <div className="space-y-6">
    <SectionCard title="אנשי קשר – אגף החשמל" subtitle="קבלת קהל: ימים א'-ה', 8:00-13:00 | בזימון מראש">
      <ContactTable contacts={electricityContacts} />
    </SectionCard>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <RequirementsList title="בקרה מרחבית" items={electricityRequirements.spatialReview} variant="number" />
      <RequirementsList title="תעודת גמר" items={electricityRequirements.completionCert} variant="number" />
    </div>
    <RequirementsList title="דגשים והנחיות לתכנון חשמל" items={electricityRequirements.guidelines} />
  </div>
);

const SanitationSection = () => (
  <div className="space-y-6">
    <SectionCard title="אנשי קשר – מחלקת בקרה וכלי אצירה" subtitle="קבלת קהל: בזימון מראש">
      <ContactTable contacts={sanitationContacts} />
    </SectionCard>
    <SectionCard title="תכולה גרפית – נספח תברואה לאצירת אשפה">
      <RequirementsList title="" items={[
        "סוג המבנה המבוקש ושטח במ\"ר",
        "כמות יחידות דיור (קיימות ומוצעות)",
        "חישוב נפח אשפה ביתית מצטברת ליום",
        "חישוב נפח אשפת מיחזור ליום",
        "הצעה לכמות וסוג כלי אצירה",
        "תכנית חדרי אשפה / דחסנית מפורטת (תאורה, מים, ניקוז, חשמל, אוורור)",
        "תכנית תנועה וחניה למשאית פינוי",
        "סימון מרחק טמון: עד 5 מ' ממרכז משאית; 10 מ' לפחות ממבנה",
      ]} variant="number" />
    </SectionCard>
    <WasteCalculator />
  </div>
);

const WaterSection = () => (
  <div className="space-y-6">
    <SectionCard title="אנשי קשר – תאגיד המים יובלים" subtitle="כתובת: רחוב אורט 18, קומה 6, פורט-סי">
      <ContactTable contacts={waterContacts} />
    </SectionCard>
    <RequirementsList title="תכולה גרפית – נספח סניטרי" items={[
      "תכנית בקנ\"מ 1:2500 או 1:1250",
      "מפת מדידה עדכנית ע\"י מודד מוסמך",
      "פריסת קווי מים וביוב",
      "פרט חיבור לרשת מים עירונית (כולל חוזר)",
      "סכמת מערכת הספקת מים פנימית וחיצונית",
      "סכמת מערכת ביוב כולל קולטנים",
      "חתך קווי ביוב בחצר הבניין",
      "חישוב הידראולי של מהנדס אינסטלציה",
    ]} variant="number" />
  </div>
);

const EnvironmentSection = () => (
  <div className="space-y-6">
    <SectionCard title="איש קשר – איגוד ערים לאיכות הסביבה" subtitle="כתובת: רחוב יאיר 2, אשדוד">
      <ContactTable contacts={environmentContacts} />
    </SectionCard>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RequirementsList title="בקרה מרחבית" items={environmentRequirements.spatialReview} variant="number" />
      <RequirementsList title="תחילת עבודות" items={environmentRequirements.startWork} variant="number" />
      <RequirementsList title="תעודת גמר" items={environmentRequirements.completion} variant="number" />
    </div>
    <SectionCard title="דגשים סביבתיים">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-secondary rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-2">סקר קרקע</h4>
          <p className="text-xs text-foreground/70">
            נדרש בשטחים חשודים/מוכרים כמזוהמים: תחנות דלק, מפעלי תעשייה, בסיסים צבאיים, מוסכים.
            כולל דיגום קרקע/גז ותכנית טיפול.
          </p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-2">אסבסט</h4>
          <p className="text-xs text-foreground/70">
            הריסת מבנים עם רכיבי אסבסט-צמנט – ביצוע בלבד ע"י קבלן מורשה.
            מינוי קבלן מורשה הוא תנאי להיתר.
          </p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-2">נגר עילי</h4>
          <p className="text-xs text-foreground/70">
            יש להציג לפחות 15% שטחים מחלחלים (לא מרוצפים, לא מעל מרתפים).
            ניקוז לערוגות גינון/אזורים פנויים בתחומי המגרש בלבד.
          </p>
        </div>
      </div>
    </SectionCard>
  </div>
);

// ---------- Section map ----------

const sectionComponents: Record<string, React.FC> = {
  licensing: LicensingSection,
  supervision: SupervisionSection,
  roads: RoadsSection,
  drainage: DrainageSection,
  planting: PlantingSection,
  electricity: ElectricitySection,
  sanitation: SanitationSection,
  water: WaterSection,
  environment: EnvironmentSection,
};

const toolComponents: Record<string, React.FC> = {
  "phone-book": PhoneBook,
  "parking-calc": ParkingCalculator,
  "fee-calc": FeeCalculator,
  "waste-calc": WasteCalculator,
  "drainage-calc": DrainageCalculator,
  "green-calc": GreenAreaCalculator,
};

// ---------- Home / Overview ----------

const HomeOverview = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "מסלול מקוצר", value: "25", unit: "ימים", color: "text-chapter-supervision" },
        { label: 'תואם תב"ע', value: "45", unit: "ימים", color: "text-primary" },
        { label: "כולל הקלות", value: "90", unit: "ימים", color: "text-chapter-infrastructure" },
        { label: "פרקי מידע", value: "9", unit: "תחומים", color: "text-chapter-sanitation" },
      ].map((stat, idx) => (
        <div key={idx} className="info-card text-center">
          <div className={`stat-number ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{stat.unit}</div>
          <div className="text-sm font-medium mt-1">{stat.label}</div>
        </div>
      ))}
    </div>

    <SectionCard title="ברוכים הבאים">
      <p className="text-sm text-foreground/80 leading-relaxed">
        בחר פרק מהתפריט הימני כדי לצפות בדרישות, אנשי קשר, ומידע מקצועי לכל תחום.
        הדשבורד מבוסס על אוגדן הנחיות מידע להיתר לעורכי בקשה של עיריית אשדוד, עדכון ינואר 2025.
      </p>
    </SectionCard>
  </div>
);

// ---------- Main component ----------

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const handleNavigate = useCallback((id: string) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const chapter = chapters.find(c => c.id === activeSection);
  const ChapterIcon = chapter ? (iconMap[chapter.icon] || FileText) : null;

  const SectionContent = sectionComponents[activeSection] || null;
  const ToolContent = toolComponents[activeSection] || null;

  const isToolSection = !!toolComponents[activeSection];
  const toolIcons: Record<string, any> = {
    "phone-book": BookUser,
    "parking-calc": Calculator,
    "fee-calc": Calculator,
    "waste-calc": Calculator,
    "drainage-calc": Calculator,
    "green-calc": TreePine,
  };
  const toolLabels: Record<string, string> = {
    "phone-book": "ספר טלפונים",
    "parking-calc": "מחשבון חניה",
    "fee-calc": "מחשבון אגרות",
    "waste-calc": "מחשבון אשפה",
    "drainage-calc": "מחשבון ניקוז",
    "green-calc": "מחשבון שטח ירוק",
  };
  const ToolIcon = isToolSection ? toolIcons[activeSection] : null;

  return (
    <div className="flex min-h-screen w-full">
      <DashboardNav activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="flex-1 blueprint-grid">
        {/* Header */}
        <header className="bg-card border-b sticky top-0 z-30 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="lg:hidden w-10" />
              <div>
                <h1 className="text-lg font-bold text-foreground">דשבורד הנחיות להיתר בנייה</h1>
                <p className="text-xs text-muted-foreground">עיריית אשדוד – אוגדן מידע לעורכי בקשה</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-accent/10 text-accent-foreground px-3 py-1.5 rounded-full text-xs font-medium">
              <Info className="h-3.5 w-3.5" />
              עדכון: ינואר 2025
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">

          {/* Section Title */}
          {(chapter || isToolSection) && (
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="p-2 rounded-lg bg-primary/10">
                {ChapterIcon && <ChapterIcon className="h-5 w-5 text-primary" />}
                {ToolIcon && <ToolIcon className="h-5 w-5 text-primary" />}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {chapter?.title || toolLabels[activeSection]}
                </h2>
                {chapter?.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{chapter.description}</p>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          {activeSection === "home" && <HomeOverview />}
          {SectionContent && <SectionContent />}
          {ToolContent && !SectionContent && <ToolContent />}

          <footer className="text-center py-8 mt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              מבוסס על אוגדן הנחיות מידע להיתר לעורכי בקשה – עיריית אשדוד | נוסח מתאריך 01/01/2025
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
