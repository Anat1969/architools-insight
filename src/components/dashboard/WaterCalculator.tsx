import { useState, useMemo } from "react";
import { Droplets, Plus, Trash2, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionCard from "./SectionCard";

interface UsageEntry {
  id: number;
  type: string;
  units: string;
  residents: string;
}

const usageTypes: Record<string, { label: string; dailyPerCapita: number; unitLabel: string; residentsPerUnit: number; description: string }> = {
  residential: { label: "מגורים", dailyPerCapita: 150, unitLabel: "יח\"ד", residentsPerUnit: 3.5, description: "150 ליטר/תושב/יום" },
  office: { label: "משרדים", dailyPerCapita: 80, unitLabel: "עובדים", residentsPerUnit: 1, description: "80 ליטר/עובד/יום" },
  commercial: { label: "מסחר", dailyPerCapita: 100, unitLabel: "עובדים", residentsPerUnit: 1, description: "100 ליטר/עובד/יום" },
  hotel: { label: "מלונאות", dailyPerCapita: 300, unitLabel: "חדרים", residentsPerUnit: 2, description: "300 ליטר/אורח/יום" },
  industry: { label: "תעשייה", dailyPerCapita: 100, unitLabel: "עובדים", residentsPerUnit: 1, description: "100 ליטר/עובד/יום" },
  education: { label: "חינוך", dailyPerCapita: 50, unitLabel: "תלמידים", residentsPerUnit: 1, description: "50 ליטר/תלמיד/יום" },
  public: { label: "מבנה ציבור", dailyPerCapita: 80, unitLabel: "מבקרים/יום", residentsPerUnit: 1, description: "80 ליטר/מבקר/יום" },
};

const irrigationRates: Record<string, { label: string; rate: number }> = {
  lawn: { label: "דשא", rate: 1.2 },
  shrubs: { label: "שיחים ופרחים", rate: 0.7 },
  trees: { label: "עצים בלבד", rate: 0.5 },
  mixed: { label: "מעורב (דשא + שיחים + עצים)", rate: 0.9 },
  drip: { label: "טפטוף חסכוני", rate: 0.4 },
};

let entryCounter = 1;

const WaterCalculator = () => {
  const [plotArea, setPlotArea] = useState("");
  const [buildingFootprint, setBuildingFootprint] = useState("");
  const [irrigationType, setIrrigationType] = useState("mixed");
  const [entries, setEntries] = useState<UsageEntry[]>([
    { id: 0, type: "residential", units: "", residents: "" },
  ]);

  const addEntry = () => {
    setEntries(prev => [...prev, { id: entryCounter++, type: "residential", units: "", residents: "" }]);
  };

  const removeEntry = (id: number) => {
    if (entries.length > 1) setEntries(prev => prev.filter(e => e.id !== id));
  };

  const updateEntry = (id: number, field: keyof UsageEntry, value: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const calc = useMemo(() => {
    const plot = parseFloat(plotArea) || 0;
    const building = parseFloat(buildingFootprint) || 0;
    if (plot <= 0) return null;

    const greenArea = Math.max(0, plot - building);
    const irrigRate = irrigationRates[irrigationType]?.rate || 0.9;

    // חישוב השקיה שנתי (מ"ק)
    const annualIrrigation = greenArea * irrigRate;

    // חישוב צריכה ביתית/תפעולית לכל שימוש
    const entryResults = entries.map(entry => {
      const config = usageTypes[entry.type];
      if (!config) return null;
      const units = parseFloat(entry.units) || 0;
      const customResidents = parseFloat(entry.residents);
      const people = !isNaN(customResidents) && customResidents > 0
        ? customResidents
        : units * config.residentsPerUnit;
      const dailyLiters = people * config.dailyPerCapita;
      const annualM3 = (dailyLiters * 365) / 1000;
      return {
        ...entry,
        config,
        units,
        people,
        dailyLiters,
        annualM3,
      };
    }).filter(Boolean) as NonNullable<ReturnType<typeof Array.prototype.map>[number]>[];

    const totalDomesticAnnual = entryResults.reduce((sum, e: any) => sum + e.annualM3, 0);
    const totalAnnual = totalDomesticAnnual + annualIrrigation;

    // חישוב קוטר צינור מים מומלץ (אומדן)
    // Q = צריכה שעתית שיא (מקדם שיא 2.5)
    const peakDailyM3 = (totalDomesticAnnual / 365) * 2.5;
    const peakHourlyM3 = peakDailyM3 / 10; // 10 שעות שיא
    const peakFlowLPS = (peakHourlyM3 * 1000) / 3600;
    // v = 1.5 m/s, Q = v * A => A = Q/v => d = sqrt(4A/π)
    const pipeAreaM2 = (peakFlowLPS / 1000) / 1.5;
    const pipeDiameterMM = Math.sqrt((4 * pipeAreaM2) / Math.PI) * 1000;
    const recommendedPipe = pipeDiameterMM <= 25 ? '3/4"' : pipeDiameterMM <= 32 ? '1"' : pipeDiameterMM <= 50 ? '1.5"' : pipeDiameterMM <= 63 ? '2"' : pipeDiameterMM <= 75 ? '2.5"' : '3"+';

    return {
      plot,
      building,
      greenArea,
      irrigRate,
      annualIrrigation,
      entryResults,
      totalDomesticAnnual,
      totalAnnual,
      peakFlowLPS,
      recommendedPipe,
      dailyTotal: totalAnnual / 365,
    };
  }, [plotArea, buildingFootprint, irrigationType, entries]);

  return (
    <div className="space-y-6">
      <SectionCard title="מחשבון צריכת מים שנתית" subtitle="חישוב כמות מים ביחס לשטח מגרש, תכסית בינוי וסוגי שימוש">
        {/* נתוני מגרש */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <Label className="text-sm font-medium">שטח מגרש (מ״ר)</Label>
            <Input type="number" min="0" value={plotArea} onChange={e => setPlotArea(e.target.value)} placeholder="לדוגמה: 2000" className="mt-1 font-grotesk" />
          </div>
          <div>
            <Label className="text-sm font-medium">תכסית בינוי (מ״ר)</Label>
            <Input type="number" min="0" value={buildingFootprint} onChange={e => setBuildingFootprint(e.target.value)} placeholder="שטח בנוי על הקרקע" className="mt-1 font-grotesk" />
          </div>
        </div>

        {/* סוג השקיה */}
        <div className="mb-6">
          <Label className="text-sm font-medium">סוג צמחייה / השקיה</Label>
          <Select value={irrigationType} onValueChange={setIrrigationType}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(irrigationRates).map(([key, val]) => (
                <SelectItem key={key} value={key}>{val.label} — {val.rate} מ״ק/מ״ר/שנה</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* שימושים */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-semibold">סוגי שימוש (צריכה סניטרית)</Label>
            <button onClick={addEntry} className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
              <Plus className="h-3.5 w-3.5" /> הוסף שימוש
            </button>
          </div>

          <div className="space-y-3">
            {entries.map((entry, idx) => {
              const config = usageTypes[entry.type];
              return (
                <div key={entry.id} className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">שימוש {idx + 1}</span>
                    {entries.length > 1 && (
                      <button onClick={() => removeEntry(entry.id)} className="text-destructive/60 hover:text-destructive transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs">ייעוד</Label>
                      <Select value={entry.type} onValueChange={v => updateEntry(entry.id, "type", v)}>
                        <SelectTrigger className="mt-1 h-9 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(usageTypes).map(([key, val]) => (
                            <SelectItem key={key} value={key}>{val.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">כמות ({config?.unitLabel})</Label>
                      <Input type="number" min="0" value={entry.units} onChange={e => updateEntry(entry.id, "units", e.target.value)} className="mt-1 h-9 text-xs font-grotesk" placeholder="0" />
                    </div>
                    <div>
                      <Label className="text-xs">נפשות (אופציונלי)</Label>
                      <Input type="number" min="0" value={entry.residents} onChange={e => updateEntry(entry.id, "residents", e.target.value)} className="mt-1 h-9 text-xs font-grotesk" placeholder={config ? `ברירת מחדל: ${config.residentsPerUnit}/יח'` : ""} />
                    </div>
                  </div>
                  {config && (
                    <p className="text-[10px] text-muted-foreground mt-1.5">תקן: {config.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </SectionCard>

      {/* תוצאות */}
      {calc && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="info-card text-center">
              <Droplets className="h-5 w-5 text-chapter-infrastructure mx-auto mb-1" />
              <div className="font-grotesk text-2xl font-bold text-chapter-infrastructure">{calc.totalAnnual.toLocaleString("he-IL", { maximumFractionDigits: 0 })}</div>
              <div className="text-xs text-muted-foreground">מ״ק/שנה סה״כ</div>
            </div>
            <div className="info-card text-center">
              <div className="font-grotesk text-2xl font-bold text-primary">{calc.totalDomesticAnnual.toLocaleString("he-IL", { maximumFractionDigits: 0 })}</div>
              <div className="text-xs text-muted-foreground">מ״ק/שנה סניטרי</div>
            </div>
            <div className="info-card text-center">
              <div className="font-grotesk text-2xl font-bold text-chapter-planting">{calc.annualIrrigation.toLocaleString("he-IL", { maximumFractionDigits: 0 })}</div>
              <div className="text-xs text-muted-foreground">מ״ק/שנה השקיה</div>
            </div>
            <div className="info-card text-center">
              <div className="font-grotesk text-lg font-bold text-foreground">{calc.recommendedPipe}</div>
              <div className="text-xs text-muted-foreground">קוטר צינור מומלץ</div>
            </div>
          </div>

          {/* פירוט לפי שימוש */}
          <SectionCard title="פירוט צריכה סניטרית לפי שימוש">
            <div className="space-y-2">
              {(calc.entryResults as any[]).map((r: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2.5">
                  <div>
                    <span className="text-sm font-medium">{r.config.label}</span>
                    <span className="text-xs text-muted-foreground mr-2">
                      {r.people.toFixed(0)} נפשות × {r.config.dailyPerCapita} ל׳/יום × 365
                    </span>
                  </div>
                  <span className="font-grotesk font-bold text-sm">{r.annualM3.toLocaleString("he-IL", { maximumFractionDigits: 0 })} מ״ק</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* פירוט השקיה */}
          <SectionCard title="פירוט צריכת השקיה">
            <div className="bg-secondary/50 rounded-lg px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">שטח פתוח להשקיה</span>
                <span className="font-grotesk font-bold">{calc.greenArea.toLocaleString("he-IL")} מ״ר</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">שטח מגרש − תכסית = שטח פתוח</span>
                <span className="font-grotesk text-xs text-muted-foreground">{calc.plot} − {calc.building} = {calc.greenArea}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/50 pt-2">
                <span className="text-sm">
                  {calc.greenArea.toLocaleString("he-IL")} מ״ר × {calc.irrigRate} מ״ק/מ״ר/שנה
                </span>
                <span className="font-grotesk font-bold text-chapter-planting">{calc.annualIrrigation.toLocaleString("he-IL", { maximumFractionDigits: 0 })} מ״ק/שנה</span>
              </div>
            </div>
          </SectionCard>

          {/* נתונים טכניים */}
          <SectionCard title="נתונים טכניים">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-3">
                <h4 className="text-sm font-semibold mb-2">צריכה יומית</h4>
                <div className="space-y-1 text-xs text-foreground/80">
                  <div className="flex justify-between">
                    <span>צריכה יומית ממוצעת</span>
                    <span className="font-grotesk">{(calc.dailyTotal * 1000).toFixed(0)} ליטר</span>
                  </div>
                  <div className="flex justify-between">
                    <span>צריכה יומית שיא (×2.5)</span>
                    <span className="font-grotesk">{((calc.dailyTotal * 1000) * 2.5).toFixed(0)} ליטר</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ספיקת שיא (ל׳/שנ׳)</span>
                    <span className="font-grotesk">{calc.peakFlowLPS.toFixed(2)} LPS</span>
                  </div>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <h4 className="text-sm font-semibold mb-2">תקני השקיה (מ״ק/מ״ר/שנה)</h4>
                <div className="space-y-1 text-xs text-foreground/80">
                  {Object.entries(irrigationRates).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span>{val.label}</span>
                      <span className="font-grotesk">{val.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <div className="bg-accent/10 rounded-lg p-3 flex items-start gap-2">
            <Info className="h-4 w-4 text-accent-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/70">
              החישוב מבוסס על תקני צריכת מים מקובלים. הערכים בפועל עשויים להשתנות בהתאם לדרישות תאגיד המים (יובלים) ולנתוני הפרויקט הספציפיים.
              קוטר הצינור המומלץ הוא אומדן ראשוני – יש לבצע חישוב הידראולי מפורט.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default WaterCalculator;
