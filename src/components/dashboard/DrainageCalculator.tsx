import { useState, useMemo } from "react";
import { Droplets, Info, CloudRain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionCard from "./SectionCard";

const DrainageCalculator = () => {
  const [plotArea, setPlotArea] = useState("");
  const [buildingFootprint, setBuildingFootprint] = useState("");
  const [greenArea, setGreenArea] = useState("");

  const calc = useMemo(() => {
    const plot = parseFloat(plotArea) || 0;
    const building = parseFloat(buildingFootprint) || 0;
    const green = parseFloat(greenArea) || 0;
    if (plot <= 0) return null;

    const pavedArea = Math.max(0, plot - building - green);

    // מקדמי נגר (Runoff Coefficients)
    const cRoof = 0.95;      // גגות / מבנה
    const cPaved = 0.85;     // שטח מרוצף / כבישים
    const cGreen = 0.20;     // שטח ירוק / חלחול

    // שטח אפקטיבי (Effective Impervious Area)
    const effectiveRoof = building * cRoof;
    const effectivePaved = pavedArea * cPaved;
    const effectiveGreen = green * cGreen;
    const totalEffective = effectiveRoof + effectivePaved + effectiveGreen;

    // מקדם נגר משוקלל
    const weightedC = totalEffective / plot;

    // עוצמת גשם – אשדוד (IDF): אירוע תכנוני 5 שנים, 15 דקות
    // I = 120 מ"מ/שעה (ערך אופייני לאשדוד)
    const rainfallIntensity = 120; // mm/hr
    const stormDuration = 0.25; // שעות (15 דקות)

    // נוסחת הרציונל: Q = C × I × A / 360
    // Q בקוב לשנייה, A בדונם
    const plotDunam = plot / 1000;
    const peakFlowRate = (weightedC * rainfallIntensity * plotDunam) / 360; // m³/s
    const peakFlowLPS = peakFlowRate * 1000; // ליטר/שנייה

    // נפח נגר לאירוע (קוב)
    const rainfallMM = rainfallIntensity * stormDuration; // מ"מ גשם באירוע
    const runoffVolumeM3 = (totalEffective * rainfallMM) / 1000; // קוב

    // גשם שנתי ממוצע אשדוד: ~400 מ"מ
    const annualRainfallMM = 400;
    const annualRunoffM3 = (totalEffective * annualRainfallMM) / 1000;

    // פתרון ניקוז נדרש
    // חובת חלחול: 15% משטח המגרש לפחות כשטח חלחול
    const minInfiltrationArea = plot * 0.15;
    const hasEnoughGreen = green >= minInfiltrationArea;

    // נפח בור חלחול נדרש (אצירת 30 מ"מ גשם מהשטח האטום)
    const imperviousArea = building + pavedArea;
    const infiltrationPitVolume = (imperviousArea * 30) / 1000; // קוב

    // אחריות עירייה vs יזם
    const municipalResponsibility = plot > 2000;

    return {
      plot, building, green, pavedArea,
      cRoof, cPaved, cGreen, weightedC,
      effectiveRoof, effectivePaved, effectiveGreen, totalEffective,
      rainfallIntensity, peakFlowLPS, peakFlowRate,
      runoffVolumeM3, rainfallMM,
      annualRainfallMM, annualRunoffM3,
      minInfiltrationArea, hasEnoughGreen,
      infiltrationPitVolume, imperviousArea,
      municipalResponsibility,
    };
  }, [plotArea, buildingFootprint, greenArea]);

  return (
    <SectionCard title="מחשבון ניקוז" subtitle="חישוב נפחי נגר עילי ופתרונות ניקוז למגרש">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Label className="text-base">שטח מגרש (מ״ר)</Label>
          <Input type="number" placeholder="הזן שטח מגרש" value={plotArea} onChange={(e) => setPlotArea(e.target.value)} className="font-grotesk text-base" />
        </div>
        <div className="space-y-2">
          <Label className="text-base">שטח תכסית מבנה (מ״ר)</Label>
          <Input type="number" placeholder="שטח טביעת רגל" value={buildingFootprint} onChange={(e) => setBuildingFootprint(e.target.value)} className="font-grotesk text-base" />
        </div>
        <div className="space-y-2">
          <Label className="text-base">שטח ירוק / חלחול (מ״ר)</Label>
          <Input type="number" placeholder="שטח גינון ומשטחים חדירים" value={greenArea} onChange={(e) => setGreenArea(e.target.value)} className="font-grotesk text-base" />
        </div>
      </div>

      {/* Method explanation */}
      <div className="mb-6 p-4 bg-muted rounded-xl border border-border">
        <div className="flex items-start gap-2 mb-2">
          <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <span className="text-base font-bold text-foreground">שיטת החישוב – נוסחת הרציונל</span>
        </div>
        <div className="text-base text-muted-foreground space-y-1 mr-7">
          <p><strong>נוסחה:</strong> Q = C × I × A / 360</p>
          <p><strong>Q</strong> = ספיקת שיא (קוב/שנייה) | <strong>C</strong> = מקדם נגר משוקלל | <strong>I</strong> = עוצמת גשם (מ״מ/שעה) | <strong>A</strong> = שטח (דונם)</p>
          <p><strong>מקדמי נגר:</strong> גגות = 0.95 | ריצוף/כבישים = 0.85 | שטח ירוק = 0.20</p>
          <p><strong>אירוע תכנוני:</strong> חזרתיות 5 שנים, משך 15 דקות, עוצמה 120 מ״מ/שעה (אשדוד)</p>
          <p><strong>גשם שנתי:</strong> ממוצע 400 מ״מ/שנה באשדוד</p>
        </div>
      </div>

      {calc && (
        <>
          {/* Area breakdown */}
          <h4 className="text-base font-bold mb-3">פירוט שטחים ומקדמים</h4>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right py-2 pr-2 font-bold">סוג משטח</th>
                  <th className="text-right py-2 font-bold">שטח (מ״ר)</th>
                  <th className="text-right py-2 font-bold">מקדם נגר (C)</th>
                  <th className="text-right py-2 font-bold">שטח אפקטיבי (מ״ר)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-2">גג / מבנה</td>
                  <td className="py-2">{calc.building.toLocaleString()}</td>
                  <td className="py-2">{calc.cRoof}</td>
                  <td className="py-2 font-medium">{calc.effectiveRoof.toFixed(0)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-2">ריצוף / כבישים</td>
                  <td className="py-2">{calc.pavedArea.toLocaleString()}</td>
                  <td className="py-2">{calc.cPaved}</td>
                  <td className="py-2 font-medium">{calc.effectivePaved.toFixed(0)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-2">שטח ירוק</td>
                  <td className="py-2">{calc.green.toLocaleString()}</td>
                  <td className="py-2">{calc.cGreen}</td>
                  <td className="py-2 font-medium">{calc.effectiveGreen.toFixed(0)}</td>
                </tr>
                <tr className="font-bold border-t-2 border-border">
                  <td className="py-2 pr-2">סה״כ</td>
                  <td className="py-2">{calc.plot.toLocaleString()}</td>
                  <td className="py-2">{calc.weightedC.toFixed(2)}</td>
                  <td className="py-2">{calc.totalEffective.toFixed(0)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Peak flow results */}
          <h4 className="text-base font-bold mb-3">תוצאות – אירוע תכנוני</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-secondary rounded-xl p-5 text-center">
              <CloudRain className="h-6 w-6 mx-auto mb-2 text-chapter-drainage" />
              <div className="text-2xl font-bold text-chapter-drainage">{calc.peakFlowLPS.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mt-1">ליטר/שנייה</div>
              <div className="text-xs text-muted-foreground">ספיקת שיא</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <Droplets className="h-6 w-6 mx-auto mb-2 text-chapter-water" />
              <div className="text-2xl font-bold text-chapter-water">{calc.runoffVolumeM3.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mt-1">קוב</div>
              <div className="text-xs text-muted-foreground">נפח נגר לאירוע</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-primary">{calc.annualRunoffM3.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground mt-1">קוב/שנה</div>
              <div className="text-xs text-muted-foreground">נגר שנתי</div>
            </div>
            <div className="bg-secondary rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-chapter-planting">{calc.infiltrationPitVolume.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mt-1">קוב</div>
              <div className="text-xs text-muted-foreground">נפח בור חלחול</div>
            </div>
          </div>

          {/* Formula breakdown */}
          <div className="mb-6 p-4 bg-muted rounded-xl border border-border">
            <p className="text-base text-foreground font-medium">
              Q = {calc.weightedC.toFixed(2)} × 120 × {(calc.plot / 1000).toFixed(2)} / 360 = <strong>{calc.peakFlowRate.toFixed(4)} קוב/שנייה ({calc.peakFlowLPS.toFixed(1)} ל/ש)</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              נפח נגר שנתי: {calc.totalEffective.toFixed(0)} מ״ר × 0.4 מ׳ = <strong>{calc.annualRunoffM3.toFixed(0)} קוב/שנה</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              בור חלחול: {calc.imperviousArea.toFixed(0)} מ״ר אטום × 30 מ״מ אצירה = <strong>{calc.infiltrationPitVolume.toFixed(1)} קוב</strong>
            </p>
          </div>

          {/* Infiltration check */}
          <h4 className="text-base font-bold mb-3">בדיקת עמידה בדרישות חלחול</h4>
          <div className={`mb-6 p-4 rounded-xl border ${calc.hasEnoughGreen ? "bg-chapter-planting/5 border-chapter-planting/30" : "bg-destructive/10 border-destructive/30"}`}>
            <p className="text-base font-bold mb-1">
              {calc.hasEnoughGreen ? "✓ עומד בדרישות חלחול" : "✗ לא עומד בדרישות חלחול"}
            </p>
            <p className="text-sm text-muted-foreground">
              נדרש: {calc.minInfiltrationArea.toFixed(0)} מ״ר (15% מהמגרש) | קיים: {calc.green.toFixed(0)} מ״ר שטח ירוק
              {!calc.hasEnoughGreen && ` | חסר: ${(calc.minInfiltrationArea - calc.green).toFixed(0)} מ״ר`}
            </p>
          </div>

          {/* Responsibility */}
          <h4 className="text-base font-bold mb-3">חלוקת אחריות ניקוז</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary rounded-xl p-5">
              <h5 className="text-base font-bold text-chapter-drainage mb-2">אחריות היזם</h5>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• ניקוז פנים המגרש וגגות</li>
                <li>• בור/ות חלחול בתחום המגרש ({calc.infiltrationPitVolume.toFixed(1)} קוב)</li>
                <li>• 3 תאי בקרה: לפני חיבור, ביניים, וחיבור לרשת</li>
                <li>• חיבור לרשת הניקוז העירונית</li>
                <li>• הכנת נספח הידרולוגי</li>
                <li>• תכנית ניקוז בקנ״מ 1:250</li>
              </ul>
            </div>
            <div className="bg-secondary rounded-xl p-5">
              <h5 className="text-base font-bold text-primary mb-2">אחריות הרשות</h5>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• תחזוקת רשת ניקוז ראשית</li>
                <li>• ניקוז כבישים ומדרכות ציבוריים</li>
                <li>• תא חיבור ברשת העירונית</li>
                {calc.municipalResponsibility && <li>• סיוע בתכנון מגרשים מעל 2 דונם</li>}
                <li>• אישור תכנית הניקוז</li>
                <li>• פיקוח על ביצוע</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </SectionCard>
  );
};

export default DrainageCalculator;
