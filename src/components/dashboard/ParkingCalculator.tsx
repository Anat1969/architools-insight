import { useState } from "react";
import { Car, Accessibility, Zap, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SectionCard from "./SectionCard";

type Standard = "national" | "ashdod";

interface ParkingConfig {
  label: string;
  unit: string;
  inputLabel: string;
  national: { ratio: number; description: string };
  ashdod: { ratio: number; description: string };
}

const parkingRatios: Record<string, ParkingConfig> = {
  residential_small: {
    label: "מגורים – דירה עד 100 מ\"ר",
    unit: "יח\"ד",
    inputLabel: "מספר יחידות דיור",
    national: { ratio: 1, description: "1 חניה לכל יח\"ד" },
    ashdod: { ratio: 1.2, description: "1.2 חניות לכל יח\"ד (תקן מקומי אשדוד)" },
  },
  residential_large: {
    label: "מגורים – דירה מעל 100 מ\"ר",
    unit: "יח\"ד",
    inputLabel: "מספר יחידות דיור",
    national: { ratio: 1.5, description: "1.5 חניות לכל יח\"ד" },
    ashdod: { ratio: 1.75, description: "1.75 חניות לכל יח\"ד (תקן מקומי אשדוד)" },
  },
  office: {
    label: "משרדים",
    unit: "מ\"ר",
    inputLabel: "שטח עיקרי במ\"ר",
    national: { ratio: 1 / 25, description: "1 חניה לכל 25 מ\"ר שטח עיקרי" },
    ashdod: { ratio: 1 / 22, description: "1 חניה לכל 22 מ\"ר שטח עיקרי (תקן מקומי אשדוד)" },
  },
  commercial: {
    label: "מסחר",
    unit: "מ\"ר",
    inputLabel: "שטח מסחרי עיקרי במ\"ר",
    national: { ratio: 1 / 25, description: "1 חניה לכל 25 מ\"ר שטח מסחרי" },
    ashdod: { ratio: 1 / 20, description: "1 חניה לכל 20 מ\"ר שטח מסחרי (תקן מקומי אשדוד)" },
  },
  hotel: {
    label: "מלון / אכסניה",
    unit: "חדרים",
    inputLabel: "מספר חדרי אירוח",
    national: { ratio: 1 / 3, description: "1 חניה לכל 3 חדרים" },
    ashdod: { ratio: 1 / 2.5, description: "1 חניה לכל 2.5 חדרים (תקן מקומי אשדוד)" },
  },
  education: {
    label: "מוסד חינוך",
    unit: "כיתות",
    inputLabel: "מספר כיתות",
    national: { ratio: 2, description: "2 חניות לכל כיתה" },
    ashdod: { ratio: 2.5, description: "2.5 חניות לכל כיתה (תקן מקומי אשדוד)" },
  },
  industry: {
    label: "תעשייה / מלאכה",
    unit: "מ\"ר",
    inputLabel: "שטח עיקרי במ\"ר",
    national: { ratio: 1 / 50, description: "1 חניה לכל 50 מ\"ר שטח עיקרי" },
    ashdod: { ratio: 1 / 40, description: "1 חניה לכל 40 מ\"ר שטח עיקרי (תקן מקומי אשדוד)" },
  },
  clinic: {
    label: "מרפאה / מכון רפואי",
    unit: "מ\"ר",
    inputLabel: "שטח עיקרי במ\"ר",
    national: { ratio: 1 / 15, description: "1 חניה לכל 15 מ\"ר שטח עיקרי" },
    ashdod: { ratio: 1 / 15, description: "1 חניה לכל 15 מ\"ר שטח עיקרי" },
  },
};

const ParkingCalculator = () => {
  const [useType, setUseType] = useState("residential_small");
  const [units, setUnits] = useState("");
  const [standard, setStandard] = useState<Standard>("ashdod");

  const config = parkingRatios[useType];
  const activeStandard = config[standard];
  const numUnits = parseFloat(units) || 0;
  const totalParking = Math.ceil(numUnits * activeStandard.ratio);
  const disabledParking = Math.max(totalParking > 0 ? 1 : 0, Math.ceil(totalParking * 0.05));
  const evCharging = Math.ceil(totalParking * 0.2);

  return (
    <SectionCard title="מחשבון חניה" subtitle="חישוב מקומות חניה נדרשים לפי סוג שימוש ותקן">
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
            <Label htmlFor="national" className="text-base cursor-pointer">תקן ארצי (תמ\"א)</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label className="text-base">סוג שימוש</Label>
          <Select value={useType} onValueChange={setUseType}>
            <SelectTrigger className="text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(parkingRatios).map(([key, val]) => (
                <SelectItem key={key} value={key} className="text-base">{val.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-base">{config.inputLabel}</Label>
          <Input
            type="number"
            placeholder={`הזן ${config.inputLabel}`}
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="font-grotesk text-base"
          />
        </div>
      </div>

      {/* Calculation Explanation */}
      <div className="mb-6 p-4 bg-muted rounded-xl border border-border">
        <div className="flex items-start gap-2 mb-2">
          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <span className="text-base font-bold text-foreground">שיטת החישוב</span>
        </div>
        <div className="text-base text-muted-foreground space-y-1 mr-7">
          <p><strong>מקדם חניה:</strong> {activeStandard.description}</p>
          <p><strong>חניות נכים:</strong> 5% מסה״כ החניות, מינימום 1 (בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות)</p>
          <p><strong>עמדות טעינה:</strong> 20% מסה״כ החניות (הנחיית משרד התחבורה לרכבים חשמליים)</p>
          {numUnits > 0 && (
            <p className="mt-2 pt-2 border-t border-border text-foreground font-medium">
              נוסחה: {numUnits} {config.unit} × {activeStandard.ratio.toFixed(4)} = {(numUnits * activeStandard.ratio).toFixed(1)} → עיגול כלפי מעלה = <strong>{totalParking} חניות</strong>
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      {numUnits > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-secondary rounded-xl p-5 text-center">
            <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-3xl font-bold text-primary">{totalParking}</div>
            <div className="text-sm text-muted-foreground mt-1">חניות נדרשות</div>
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
                <th className="text-right py-2 font-bold">מקדם</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(parkingRatios).map(([key, val]) => (
                <tr key={key} className={`border-b border-border/50 ${key === useType ? "bg-primary/10 font-bold" : ""}`}>
                  <td className="py-2 pr-2">{val.label}</td>
                  <td className="py-2">{val.unit}</td>
                  <td className="py-2">{val[standard].description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
};

export default ParkingCalculator;
