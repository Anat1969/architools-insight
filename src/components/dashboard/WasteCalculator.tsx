import { useState, useMemo } from "react";
import { Trash2, Info, Recycle, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionCard from "./SectionCard";

const WasteCalculator = () => {
  const [units, setUnits] = useState("");
  const [floors, setFloors] = useState("");

  const numUnits = parseInt(units) || 0;
  const numFloors = parseInt(floors) || 0;

  const calc = useMemo(() => {
    if (numUnits <= 0) return null;

    // מקדמים: 7 ליטר ליום ליח"ד כולל, מתוכם 40% רטובה 60% יבשה
    const dailyPerUnit = 7; // ליטר
    const wetRatio = 0.4;
    const dryRatio = 0.6;

    const dailyTotal = numUnits * dailyPerUnit;
    const dailyWet = dailyTotal * wetRatio;
    const dailyDry = dailyTotal * dryRatio;

    // חישוב שבועי (פינוי 3 פעמים בשבוע → אצירה ל-2.5 ימים)
    const storageDays = 2.5;
    const storageWet = dailyWet * storageDays;
    const storageDry = dailyDry * storageDays;
    const storageTotal = storageWet + storageDry;

    // המרה לקוב
    const storageTotalM3 = storageTotal / 1000;
    const storageWetM3 = storageWet / 1000;
    const storageDryM3 = storageDry / 1000;

    // מעל 9 קומות או 60 יח"ד → 2 צנרות + 2 דחסניות
    const needsDualSystem = numFloors > 9 || numUnits > 60;

    // חישוב דחסניות / טמונים
    let compactors: { wet: string; dry: string } | null = null;
    let tamunim: { wet: number; dry: number } | null = null;

    if (needsDualSystem) {
      // דחסנית – גדלים 12 או 14 קוב
      const wetCompactorSize = storageWetM3 <= 12 ? 12 : 14;
      const dryCompactorSize = storageDryM3 <= 12 ? 12 : 14;
      
      if (storageDryM3 <= 14 && storageWetM3 <= 14) {
        compactors = {
          wet: `דחסנית ${wetCompactorSize} קוב`,
          dry: `דחסנית ${dryCompactorSize} קוב`,
        };
      } else {
        // אם הנפח גדול מ-14 קוב, צריך מספר טמונים
        tamunim = {
          wet: Math.ceil(storageWetM3 / 5), // טמון 5 קוב
          dry: Math.ceil(storageDryM3 / 5),
        };
      }
    } else {
      // מבנה קטן – טמונים בלבד (5 קוב לטמון)
      tamunim = {
        wet: Math.max(1, Math.ceil(storageWetM3 / 5)),
        dry: Math.max(1, Math.ceil(storageDryM3 / 5)),
      };
    }

    // מתקני מחזור: 1 לכל 50 יח"ד, מינימום 1
    const recyclingStations = Math.max(1, Math.ceil(numUnits / 50));

    // רחבת גזם: 12 מ"ר לכל 100 יח"ד, מינימום 12 מ"ר
    const gardenWasteArea = Math.max(12, Math.ceil((numUnits / 100) * 12));

    return {
      dailyTotal,
      dailyWet,
      dailyDry,
      storageTotal,
      storageWet,
      storageDry,
      storageTotalM3,
      storageWetM3,
      storageDryM3,
      needsDualSystem,
      compactors,
      tamunim,
      recyclingStations,
      gardenWasteArea,
    };
  }, [numUnits, numFloors]);

  return (
    <SectionCard title="מחשבון נפח אשפה" subtitle="חישוב מפורט לאצירת אשפה רטובה ויבשה למבני מגורים">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label className="text-base">מספר יחידות דיור</Label>
          <Input
            type="number"
            placeholder="הזן מספר יח״ד"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="font-grotesk text-base"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-base">מספר קומות</Label>
          <Input
            type="number"
            placeholder="הזן מספר קומות"
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
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
          <p><strong>מקדם אשפה:</strong> 7 ליטר ליום לכל יח״ד</p>
          <p><strong>חלוקה:</strong> 40% אשפה רטובה (אורגנית) | 60% אשפה יבשה (אריזות, נייר)</p>
          <p><strong>אצירה:</strong> חישוב ל-2.5 ימי אגירה (פינוי 3 פעמים בשבוע)</p>
          <p><strong>מערכת כפולה:</strong> מעל 9 קומות או 60 יח״ד → 2 צנרות שוט + 2 דחסניות (רטובה + יבשה)</p>
          <p><strong>דחסנית:</strong> 12 או 14 קוב לפי הנפח. מעבר ל-14 קוב → טמונים (5 קוב כל אחד)</p>
        </div>
      </div>

      {calc && (
        <>
          {/* Daily volumes */}
          <h4 className="text-base font-bold mb-3">נפחים יומיים</h4>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-primary">{calc.dailyTotal.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">ליטר / יום (כולל)</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-chapter-supervision">{calc.dailyWet.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">רטובה (40%)</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-chapter-drainage">{calc.dailyDry.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">יבשה (60%)</div>
            </div>
          </div>

          {/* Storage volumes */}
          <h4 className="text-base font-bold mb-3">נפח אצירה (2.5 ימים)</h4>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-primary">{calc.storageTotalM3.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mt-1">קוב כולל</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-chapter-supervision">{calc.storageWetM3.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mt-1">קוב רטובה</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-chapter-drainage">{calc.storageDryM3.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mt-1">קוב יבשה</div>
            </div>
          </div>

          {/* Dual system alert */}
          {calc.needsDualSystem && (
            <div className="mb-6 p-4 bg-destructive/10 rounded-xl border border-destructive/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <span className="text-base font-bold text-destructive">נדרשת מערכת כפולה</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    מבנה מעל {numFloors > 9 ? "9 קומות" : "60 יח\"ד"} → חובה 2 צנרות שוט (רטובה + יבשה) ו-2 דחסניות נפרדות
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Equipment needed */}
          <h4 className="text-base font-bold mb-3">ציוד נדרש</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {calc.compactors && (
              <>
                <div className="bg-secondary rounded-xl p-5">
                  <Trash2 className="h-6 w-6 text-chapter-supervision mb-2" />
                  <div className="text-base font-bold">דחסנית רטובה</div>
                  <div className="text-2xl font-bold text-chapter-supervision mt-1">{calc.compactors.wet}</div>
                </div>
                <div className="bg-secondary rounded-xl p-5">
                  <Trash2 className="h-6 w-6 text-chapter-drainage mb-2" />
                  <div className="text-base font-bold">דחסנית יבשה</div>
                  <div className="text-2xl font-bold text-chapter-drainage mt-1">{calc.compactors.dry}</div>
                </div>
              </>
            )}
            {calc.tamunim && (
              <>
                <div className="bg-secondary rounded-xl p-5">
                  <Trash2 className="h-6 w-6 text-chapter-supervision mb-2" />
                  <div className="text-base font-bold">טמונים – רטובה</div>
                  <div className="text-2xl font-bold text-chapter-supervision mt-1">{calc.tamunim.wet} טמונים</div>
                  <div className="text-sm text-muted-foreground">(5 קוב כל אחד)</div>
                </div>
                <div className="bg-secondary rounded-xl p-5">
                  <Trash2 className="h-6 w-6 text-chapter-drainage mb-2" />
                  <div className="text-base font-bold">טמונים – יבשה</div>
                  <div className="text-2xl font-bold text-chapter-drainage mt-1">{calc.tamunim.dry} טמונים</div>
                  <div className="text-sm text-muted-foreground">(5 קוב כל אחד)</div>
                </div>
              </>
            )}
          </div>

          {/* Calculation formula */}
          <div className="mb-6 p-4 bg-muted rounded-xl border border-border">
            <p className="text-base text-foreground font-medium">
              נוסחה: {numUnits} יח״ד × 7 ליטר × 2.5 ימים = {calc.storageTotal.toLocaleString()} ליטר = <strong>{calc.storageTotalM3.toFixed(1)} קוב</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              רטובה: {calc.storageWet.toLocaleString()} ליטר ({calc.storageWetM3.toFixed(1)} קוב) | יבשה: {calc.storageDry.toLocaleString()} ליטר ({calc.storageDryM3.toFixed(1)} קוב)
            </p>
          </div>

          {/* Recycling & Garden Waste */}
          <h4 className="text-base font-bold mb-3">מתקני מחזור ורחבת גזם</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-secondary rounded-xl p-5 text-center">
              <Recycle className="h-6 w-6 mx-auto mb-2 text-chapter-planting" />
              <div className="text-3xl font-bold text-chapter-planting">{calc.recyclingStations}</div>
              <div className="text-sm text-muted-foreground mt-1">עמדות מחזור</div>
              <div className="text-xs text-muted-foreground">(1 לכל 50 יח״ד)</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-chapter-infrastructure">{calc.gardenWasteArea}</div>
              <div className="text-sm text-muted-foreground mt-1">מ״ר רחבת גזם / גרוטאות</div>
              <div className="text-xs text-muted-foreground">(12 מ״ר לכל 100 יח״ד)</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <div className="text-sm font-bold text-foreground mb-1">עמדת מחזור כוללת:</div>
              <div className="text-xs text-muted-foreground text-right space-y-0.5">
                <p>• מכל נייר/קרטון</p>
                <p>• מכל פלסטיק/מתכת</p>
                <p>• מכל זכוכית</p>
                <p>• מכל אלקטרוניקה קטנה</p>
                <p>• מכל טקסטיל</p>
              </div>
            </div>
          </div>

          {/* Distance limitations */}
          <div className="p-4 bg-muted rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>* הגבלות מרחקים:</strong> מרחק מינימלי מפתח כניסה למבנה מגורים למתקן טמון / דחסנית – <strong>3 מטר לפחות</strong>.
              פתח המתקן יפנה הרחק מהמבנה. מרחק מחלון מגורים – <strong>6 מטר לפחות</strong>.
              גישה לרכב פינוי – רוחב שער מינימלי <strong>3.5 מטר</strong>, גובה חופשי <strong>4 מטר</strong>.
            </p>
          </div>
        </>
      )}
    </SectionCard>
  );
};

export default WasteCalculator;
