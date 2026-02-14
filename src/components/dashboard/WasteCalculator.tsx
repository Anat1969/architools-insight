import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionCard from "./SectionCard";
import { wasteVolumeTable } from "@/data/permitData";

const WasteCalculator = () => {
  const [buildingType, setBuildingType] = useState("0");
  const [units, setUnits] = useState("");

  const selected = wasteVolumeTable[parseInt(buildingType)];
  const numUnits = parseFloat(units) || 0;
  const dailyVolume = numUnits * selected.volumePerUnit;
  const weeklyVolume = dailyVolume * 7;
  // Standard 1100L container
  const containersNeeded = Math.ceil(weeklyVolume / 1100);

  return (
    <SectionCard title="מחשבון נפח אשפה" subtitle="חישוב כמות אצירת אשפה נדרשת לפי סוג מבנה">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label>סוג מבנה</Label>
          <Select value={buildingType} onValueChange={setBuildingType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {wasteVolumeTable.map((item, idx) => (
                <SelectItem key={idx} value={String(idx)}>{item.type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>כמות ({selected.unit})</Label>
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
            <div className="stat-number text-primary">{dailyVolume.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">ליטר / יום</div>
          </div>
          <div className="bg-secondary rounded-lg p-4 text-center">
            <div className="stat-number text-chapter-sanitation">{weeklyVolume.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">ליטר / שבוע</div>
          </div>
          <div className="bg-secondary rounded-lg p-4 text-center">
            <Trash2 className="h-5 w-5 mx-auto mb-2 text-chapter-infrastructure" />
            <div className="stat-number text-chapter-infrastructure">{containersNeeded}</div>
            <div className="text-xs text-muted-foreground mt-1">מכלי 1,100 ליטר</div>
          </div>
        </div>
      )}
    </SectionCard>
  );
};

export default WasteCalculator;
