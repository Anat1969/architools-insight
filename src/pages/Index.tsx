import { useState, useEffect, useCallback } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ChapterSection from "@/components/dashboard/ChapterSection";
import ContactTable from "@/components/dashboard/ContactTable";
import RequirementsList from "@/components/dashboard/RequirementsList";
import SectionCard from "@/components/dashboard/SectionCard";
import ProcessTimeline from "@/components/dashboard/ProcessTimeline";
import ParkingCalculator from "@/components/dashboard/ParkingCalculator";
import FeeCalculator from "@/components/dashboard/FeeCalculator";
import WasteCalculator from "@/components/dashboard/WasteCalculator";
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
import { Info, AlertTriangle, Building2 } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("licensing");

  const handleNavigate = useCallback((id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <DashboardNav activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="flex-1 lg:mr-0 blueprint-grid">
        {/* Header */}
        <header className="bg-card border-b sticky top-0 z-30 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="lg:hidden w-10" /> {/* spacer for mobile hamburger */}
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

        <div className="max-w-5xl mx-auto px-6 py-8 space-y-12">

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "מסלול מקוצר", value: "25", unit: "ימים", color: "text-chapter-supervision" },
              { label: "תואם תב\"ע", value: "45", unit: "ימים", color: "text-primary" },
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

          {/* Chapter A: Licensing */}
          <ChapterSection {...chapters[0]}>
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

            <RequirementsList
              title="תכולה גרפית – התכנית הראשית"
              items={graphicContentRequirements}
              variant="number"
            />

            <SectionCard title="הזמנת תיק בניין / היתרים קודמים" subtitle="מענה טלפוני: ימים א'-ה', 8:00-12:00">
              <p className="text-sm text-foreground/80 mb-3">
                טלפונים: 08-8545327, 08-8545153
              </p>
              <p className="text-sm text-foreground/80 mb-3">
                דוא"ל: archiv@ashdod.muni.il
              </p>
              <div className="bg-accent/10 rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/70">תיק בניין שהוזמן יישאר בארכיב 10 ימים מקבלתו ולאחר מכן יוחזר לגנזך.</p>
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

            <div id="fee-calc">
              <FeeCalculator />
            </div>
          </ChapterSection>

          {/* Chapter B: Supervision */}
          <ChapterSection {...chapters[1]}>
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
          </ChapterSection>

          {/* Chapter C: Roads */}
          <ChapterSection {...chapters[2]}>
            <SectionCard title="אנשי קשר – מחלקת תכנון כבישים" subtitle="טלפוני: ימים א'-ה', 8:30-11:00 | קבלת קהל: בזימון מראש">
              <ContactTable contacts={roadsContacts} />
            </SectionCard>

            <RequirementsList
              title="תכולה גרפית – תכנית פיתוח שטח"
              items={developmentPlanRequirements}
              variant="number"
            />

            <RequirementsList
              title="דרישות חניה – הנחיות ודגשים"
              items={parkingRequirements}
            />

            <div id="parking-calc">
              <ParkingCalculator />
            </div>
          </ChapterSection>

          {/* Chapter: Drainage */}
          <ChapterSection {...chapters[3]}>
            <SectionCard title="אנשי קשר – אגף ניקוז ונחלים" subtitle="קבלת קהל: בזימון מראש">
              <ContactTable contacts={drainageContacts} />
            </SectionCard>

            <RequirementsList
              title="תכולה גרפית – נספח ניקוז"
              items={drainageGraphicContent}
              variant="number"
            />

            <SectionCard title="דגשים לתכנון ניקוז">
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>• פתרון ניקוז עילי לכיוון הכניסה למגרש, האפשר במידת</li>
                <li>• חיבור לרשת עירונית דרך תאי בקרה בתיאום עם מח' ניקוז</li>
                <li>• בבקשות לתעשייה/מזון – לצרף דרישות משרד הבריאות לנספח</li>
                <li>• בבקשות עם חובת בקרה מכון – הנספח יתואם עם אגף הניקוז טרם העברה לבקרה</li>
              </ul>
            </SectionCard>
          </ChapterSection>

          {/* Chapter: Planting */}
          <ChapterSection {...chapters[4]}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {["בקרה מרחבית", "שלב התכן", "תחילת עבודות", "תעודת גמר"].map((stage, idx) => (
                  <div key={idx} className="bg-secondary rounded-lg p-3 text-center">
                    <div className="font-grotesk font-bold text-chapter-planting text-lg">{idx + 1}</div>
                    <div className="text-xs font-medium mt-1">{stage}</div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </ChapterSection>

          {/* Chapter: Electricity */}
          <ChapterSection {...chapters[5]}>
            <SectionCard title="אנשי קשר – אגף החשמל" subtitle="קבלת קהל: ימים א'-ה', 8:00-13:00 | בזימון מראש">
              <ContactTable contacts={electricityContacts} />
            </SectionCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RequirementsList title="בקרה מרחבית" items={electricityRequirements.spatialReview} variant="number" />
              <RequirementsList title="תעודת גמר" items={electricityRequirements.completionCert} variant="number" />
            </div>

            <RequirementsList title="דגשים והנחיות לתכנון חשמל" items={electricityRequirements.guidelines} />
          </ChapterSection>

          {/* Chapter: Sanitation */}
          <ChapterSection {...chapters[6]}>
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

            <div id="waste-calc">
              <WasteCalculator />
            </div>
          </ChapterSection>

          {/* Chapter: Water */}
          <ChapterSection {...chapters[7]}>
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
          </ChapterSection>

          {/* Chapter: Environment */}
          <ChapterSection {...chapters[8]}>
            <SectionCard title="איש קשר – איגוד ערים לאיכות הסביבה" subtitle="כתובת: רחוב יאיר 2, אשדוד">
              <ContactTable contacts={environmentContacts} />
            </SectionCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RequirementsList title="בקרה מרחבית" items={environmentRequirements.spatialReview} variant="number" />
              <RequirementsList title="תחילת עבודות" items={environmentRequirements.startWork} variant="number" />
              <RequirementsList title="תעודת גמר" items={environmentRequirements.completion} variant="number" />
            </div>

            <SectionCard title="דגשים סביבתיים">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="bg-secondary rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2">דו"ח אקוסטי</h4>
                  <p className="text-xs text-foreground/70">
                    נדרש בבניין רב-קומות עם מקורות רעש (דחסן, מפוחים) ובבניין החשוף למקור רעש חיצוני (כביש מהיר, תעשייה).
                  </p>
                </div>
              </div>
            </SectionCard>
          </ChapterSection>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-border">
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
