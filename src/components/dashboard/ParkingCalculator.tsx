import { useState } from "react";
import { Calculator, Car, Accessibility, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionCard from "./SectionCard";

const parkingRatios: Record<string, { label: string; ratio: number; unit: string }> = {
  residential: { label: "מגורים", ratio: 1, unit: "יח\"ד" },
  office: { label: "משרדים", ratio: 1 / 25, unit: "מ\"ר" },
  commercial: { label: "מסחר", ratio: 1 / 25, unit: "מ\"ר" },
  hotel: { label: "מלון", ratio: 1 / 3, unit: "חדרים" },
  education: { label: "מוסד חינוך", ratio: 1 / 40, unit: "תלמידים" },
};

const ParkingCalculator = () => {
  const [useType, setUseType] = useState("residential");
  const [units, setUnits] = useState("");

  const config = parkingRatios[useType];
  const numUnits = parseFloat(units) || 0;
  const totalParking = Math.ceil(numUnits * config.ratio);
  const disabledParking = Math.max(1, Math.ceil(totalParking * 0.05));
  const evCharging = Math.ceil(totalParking * 0.2);

  return (
    <SectionCard title="מחשבון חניה" subtitle="חישוב מקומות חניה נדרשים לפי סוג שימוש">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label>סוג שימוש</Label>
          <Select value={useType} onValueChange={setUseType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(parkingRatios).map(([key, val]) => (
                <SelectItem key={key} value={key}>{val.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>כמות ({config.unit})</Label>
          <Input
            type="number"
            placeholder="הזן כמות"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="font-grotesk"
          />
        </div>
      </div>

      {numUnits > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-secondary rounded-lg p-4 text-center">
            <Car className="h-5 w-5 mx-auto mb-2 text-primary" />
            <div className="stat-number text-primary">{totalParking}</div>
            <div className="text-xs text-muted-foreground mt-1">חניות נדרשות</div>
          </div>
          <div className="bg-secondary rounded-lg p-4 text-center">
            <Accessibility className="h-5 w-5 mx-auto mb-2 text-chapter-supervision" />
            <div className="stat-number text-chapter-supervision">{disabledParking}</div>
            <div className="text-xs text-muted-foreground mt-1">חניות נכים</div>
          </div>
          <div className="bg-secondary rounded-lg p-4 text-center">
            <Zap className="h-5 w-5 mx-auto mb-2 text-chapter-electricity" />
            <div className="stat-number text-chapter-electricity">{evCharging}</div>
            <div className="text-xs text-muted-foreground mt-1">עמדות טעינה (20%)</div>
          </div>
        </div>
      )}
    </SectionCard>
  );
};

export default ParkingCalculator;
