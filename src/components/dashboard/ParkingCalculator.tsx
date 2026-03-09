import { useState, useMemo } from "react";
import { Car, Accessibility, Zap, Info, Plus, Trash2, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import SectionCard from "./SectionCard";

type Standard = "national" | "ashdod";

interface ParkingConfig {
  label: string;
  unit: string;
  inputLabel: string;
  national: { ratio: number; description: string };
  ashdod: { ratio: number; description: string };
  operational: { ratio: number; description: string };
}

const parkingRatios: Record<string, ParkingConfig> = {
  residential_small: {
    label: "מגורים – דירה עד 100 מ\"ר",
    unit: "יח\"ד",
    inputLabel: "מספר יחידות דיור",
    national: { ratio: 1, description: "1 חניה לכל יח\"ד" },
    ashdod: { ratio: 1.2, description: "1.2 חניות לכל יח\"ד" },
    operational: { ratio: 0.05, description: "1 לכל 20 יח\"ד" },
  },
  residential_large: {
    label: "מגורים – דירה מעל 100 מ\"ר",
    unit: "יח\"ד",
    inputLabel: "מספר יחידות דיור",
    national: { ratio: 1.5, description: "1.5 חניות לכל יח\"ד" },
    ashdod: { ratio: 1.75, description: "1.75 חניות לכל יח\"ד" },
    operational: { ratio: 0.05, description: "1 לכל 20 יח\"ד" },
  },
  office: {
    label: "משרדים",
    unit: "מ\"ר",
    inputLabel: "שטח עיקרי במ\"ר",
    national: { ratio: 1 / 25, description: "1 חניה לכל 25 מ\"ר" },
    ashdod: { ratio: 1 / 22, description: "1 חניה לכל 22 מ\"ר" },
    operational: { ratio: 1 / 500, description: "1 לכל 500 מ\"ר" },
  },
  commercial: {
    label: "מסחר",
    unit: "מ\"ר",
    inputLabel: "שטח מסחרי עיקרי במ\"ר",
    national: { ratio: 1 / 25, description: "1 חניה לכל 25 מ\"ר" },
    ashdod: { ratio: 1 / 20, description: "1 חניה לכל 20 מ\"ר" },
    operational: { ratio: 1 / 200, description: "1 לכל 200 מ\"ר" },
  },
  hotel: {
    label: "מלון / אכסניה",
    unit: "חדרים",
    inputLabel: "מספר חדרי אירוח",
    national: { ratio: 1 / 3, description: "1 חניה לכל 3 חדרים" },
    ashdod: { ratio: 1 / 2.5, description: "1 חניה לכל 2.5 חדרים" },
    operational: { ratio: 1 / 30, description: "1 לכל 30 חדרים" },
  },
  education: {
    label: "מוסד חינוך",
    unit: "כיתות",
    inputLabel: "מספר כיתות",
    national: { ratio: 2, description: "2 חניות לכל כיתה" },
    ashdod: { ratio: 2.5, description: "2.5 חניות לכל כיתה" },
    operational: { ratio: 0.5, description: "1 לכל 2 כיתות" },
  },
  industry: {
    label: "תעשייה / מלאכה",
    unit: "מ\"ר",
    inputLabel: "שטח עיקרי במ\"ר",
    national: { ratio: 1 / 50, description: "1 חניה לכל 50 מ\"ר" },
    ashdod: { ratio: 1 / 40, description: "1 חניה לכל 40 מ\"ר" },
    operational: { ratio: 1 / 300, description: "1 לכל 300 מ\"ר" },
  },
  clinic: {
    label: "מרפאה / מכון רפואי",
    unit: "מ\"ר",
    inputLabel: "שטח עיקרי במ\"ר",
    national: { ratio: 1 / 15, description: "1 חניה לכל 15 מ\"ר" },
    ashdod: { ratio: 1 / 15, description: "1 חניה לכל 15 מ\"ר" },
    operational: { ratio: 1 / 250, description: "1 לכל 250 מ\"ר" },
  },
};

interface UsageEntry {
  id: number;
  useType: string;
  units: string;
}

let nextId = 1;

const ParkingCalculator = () => {
  const [standard, setStandard] = useState<Standard>("ashdod");
  const [entries, setEntries] = useState<UsageEntry[]>([
    { id: nextId++, useType: "residential_small", units: "" },
  ]);

  const addEntry = () => {
    setEntries((prev) => [...prev, { id: nextId++, useType: "commercial", units: "" }]);
  };

  const removeEntry = (id: number) => {
    if (entries.length <= 1) return;
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEntry = (id: number, field: keyof Omit<UsageEntry, "id">, value: string) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const results = useMemo(() => {
    return entries.map((entry) => {
      const config = parkingRatios[entry.useType];
      const numUnits = parseFloat(entry.units) || 0;
      const activeStd = config[standard];
      const parking = Math.ceil(numUnits * activeStd.ratio);
      const operational = Math.ceil(numUnits * config.operational.ratio);
      return { ...entry, config, numUnits, activeStd, parking, operational };
    });
  }, [entries, standard]);

  const totalParking = results.reduce((sum, r) => sum + r.parking, 0);
  const totalOperational = results.reduce((sum, r) => sum + r.operational, 0);
  const hasInput = results.some((r) => r.numUnits > 0);
  const disabledParking = Math.max(totalParking > 0 ? 1 : 0, Math.ceil(totalParking * 0.05));
  const evCharging = Math.ceil(totalParking * 0.2);

  return (
    <SectionCard title="מחשבון חניה" subtitle="חישוב מקומות חניה נדרשים – תמיכה בשימוש מעורב">
      {/* Standard Selection */}
      <div className="mb-6 p-4 bg-secondary rounded-xl">
        <Label className="text-base font-bold mb-3 block">בחר תקן חניה</Label>
        <RadioGroup value={standard} onValueChange={(v) => setStandard(v as Standard)} className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="ashdod" id="ashdod" />
            <Label htmlFor="ashdod" className="text-base cursor-pointer">תקן מקומי – אשדוד</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="national" id="national" />
            <Label htmlFor="national" className="text-base cursor-pointer">תקן ארצי (תמ״א)</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Usage entries */}
      <div className="space-y-4 mb-6">
        {entries.map((entry, idx) => {
          const config = parkingRatios[entry.useType];
          return (
            <div key={entry.id} className="p-4 border border-border rounded-xl bg-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-primary">שימוש {idx + 1}</span>
                {entries.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEntry(entry.id)}
                    className="text-destructive hover:text-destructive h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">סוג שימוש</Label>
                  <Select value={entry.useType} onValueChange={(v) => updateEntry(entry.id, "useType", v)}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(parkingRatios).map(([key, val]) => (
                        <SelectItem key={key} value={key} className="text-sm">{val.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">{config.inputLabel}</Label>
                  <Input
                    type="number"
                    placeholder={`הזן ${config.inputLabel}`}
                    value={entry.units}
                    onChange={(e) => updateEntry(entry.id, "units", e.target.value)}
                    className="font-grotesk text-sm"
                  />
                </div>
              </div>
            </div>
          );
        })}

        <Button variant="outline" onClick={addEntry} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          הוסף סוג שימוש נוסף
        </Button>
      </div>

      {/* Per-usage breakdown */}
      {hasInput && (
        <div className="space-y-6">
          <SectionCard title="פירוט לפי סוג שימוש" className="border border-border">
            <div className="space-y-3">
              {results.map((r) => {
                if (r.numUnits <= 0) return null;
                return (
                  <div key={r.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <span className="text-sm font-semibold">{r.config.label}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {r.numUnits} {r.config.unit} × {r.activeStd.ratio.toFixed(4)} = {(r.numUnits * r.activeStd.ratio).toFixed(1)} → <strong>{r.parking} חניות</strong>
                      </p>
                      <p className="text-xs text-muted-foreground">{r.activeStd.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        🚛 רכב תפעולי: {r.config.operational.description} → <strong>{r.operational} מקומות</strong>
                      </p>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-primary">{r.parking}</div>
                      <div className="text-xs text-muted-foreground">+ {r.operational} תפעולי</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total lines */}
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold">סה״כ חניות רגילות</span>
                <span className="text-3xl font-bold text-primary">{totalParking}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">סה״כ רכב תפעולי</span>
                <span className="text-xl font-bold text-accent-foreground">{totalOperational}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-base font-bold">סה״כ כולל (חניות + תפעולי)</span>
                <span className="text-3xl font-bold text-primary">{totalParking + totalOperational}</span>
              </div>
            </div>
          </SectionCard>

          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-secondary rounded-xl p-5 text-center">
              <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-primary">{totalParking}</div>
              <div className="text-sm text-muted-foreground mt-1">חניות נדרשות</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-accent-foreground" />
              <div className="text-3xl font-bold text-accent-foreground">{totalOperational}</div>
              <div className="text-sm text-muted-foreground mt-1">רכב תפעולי</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <Accessibility className="h-6 w-6 mx-auto mb-2 text-chapter-supervision" />
              <div className="text-3xl font-bold text-chapter-supervision">{disabledParking}</div>
              <div className="text-sm text-muted-foreground mt-1">חניות נכים (5%)</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 text-chapter-electricity" />
              <div className="text-3xl font-bold text-chapter-electricity">{evCharging}</div>
              <div className="text-sm text-muted-foreground mt-1">עמדות טעינה (20%)</div>
            </div>
          </div>

          {/* Methodology */}
          <div className="p-4 bg-muted rounded-xl border border-border">
            <div className="flex items-start gap-2 mb-2">
              <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span className="text-base font-bold text-foreground">שיטת החישוב</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1 mr-7">
              <p><strong>חניות נכים:</strong> 5% מסה״כ, מינימום 1 (חוק שוויון זכויות)</p>
              <p><strong>עמדות טעינה:</strong> 20% מסה״כ (הנחיית משרד התחבורה)</p>
              <p><strong>רכב תפעולי:</strong> מחושב לפי ייעוד – משאיות, רכבי שירות, הובלה וכו׳</p>
              <p><strong>שימוש מעורב:</strong> כל ייעוד מחושב בנפרד לפי המקדם שלו, ואז מסוכם לסה״כ אחד</p>
            </div>
          </div>
        </div>
      )}

      {/* Reference Table */}
      <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
        <h4 className="text-base font-bold mb-3">טבלת מקדמים – תקן {standard === "ashdod" ? "מקומי אשדוד" : "ארצי"}</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right py-2 pr-2 font-bold">ייעוד</th>
                <th className="text-right py-2 font-bold">יחידת מדידה</th>
                <th className="text-right py-2 font-bold">מקדם חניה</th>
                <th className="text-right py-2 font-bold">רכב תפעולי</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(parkingRatios).map(([key, val]) => {
                const isActive = entries.some((e) => e.useType === key);
                return (
                  <tr key={key} className={`border-b border-border/50 ${isActive ? "bg-primary/10 font-bold" : ""}`}>
                    <td className="py-2 pr-2">{val.label}</td>
                    <td className="py-2">{val.unit}</td>
                    <td className="py-2">{val[standard].description}</td>
                    <td className="py-2">{val.operational.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
};

export default ParkingCalculator;
