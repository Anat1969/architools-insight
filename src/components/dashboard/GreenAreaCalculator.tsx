import { useState, useMemo } from "react";
import { TreePine, Info, AlertTriangle, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionCard from "./SectionCard";

const GreenAreaCalculator = () => {
  const [plotArea, setPlotArea] = useState("");
  const [buildingFootprint, setBuildingFootprint] = useState("");
  const [numUnits, setNumUnits] = useState("");

  const calc = useMemo(() => {
    const plot = parseFloat(plotArea) || 0;
    const building = parseFloat(buildingFootprint) || 0;
    const units = parseInt(numUnits) || 0;
    if (plot <= 0) return null;

    // דרישת שטח ירוק מינימלי – 15% משטח המגרש
    const minGreenPercent = 0.15;
    const minGreenArea = plot * minGreenPercent;

    // שטח חילחול – שטח ירוק שאינו מעל מרתפים (100% מהשטח הירוק המינימלי)
    const infiltrationArea = minGreenArea;

    // שטח פתוח בפועל (מגרש פחות תכסית)
    const openArea = Math.max(0, plot - building);
    const openPercent = (openArea / plot) * 100;

    // עצים בוגרים – 1 עץ לכל 50 מ״ר שטח ירוק (תקן עיריית אשדוד)
    const treesRequired = Math.ceil(minGreenArea / 50);
    // שטח השפעה לעץ בוגר – רדיוס 4 מ׳ = ~50 מ״ר
    const treeInfluenceArea = treesRequired * 50;

    // הצללה – דרישה: 30% הצללה מהשטח הציבורי/משותף
    // שטח משותף = שטח פתוח פחות חניות (הערכה: 25 מ״ר ליח״ד)
    const estimatedParkingArea = units * 25;
    const commonOpenArea = Math.max(0, openArea - estimatedParkingArea);
    const requiredShadePercent = 0.30;
    const requiredShadeArea = commonOpenArea * requiredShadePercent;

    // הצללה מעצים – כל עץ בוגר מצליל ~30 מ״ר
    const shadePerTree = 30;
    const treesForShade = Math.ceil(requiredShadeArea / shadePerTree);
    const actualTreesNeeded = Math.max(treesRequired, treesForShade);
    const totalShadeFromTrees = actualTreesNeeded * shadePerTree;

    // בדיקה האם עומד בדרישת 15%
    const meetsGreenReq = openArea >= minGreenArea;

    // ערוגות נוי – 40% מהשטח הירוק
    const ornamentalBeds = minGreenArea * 0.40;
    // דשא / כיסוי קרקע – 60% מהשטח הירוק
    const lawnArea = minGreenArea * 0.60;

    return {
      plot,
      building,
      openArea,
      openPercent,
      minGreenArea,
      infiltrationArea,
      treesRequired,
      treeInfluenceArea,
      commonOpenArea,
      requiredShadeArea,
      treesForShade,
      actualTreesNeeded,
      totalShadeFromTrees,
      meetsGreenReq,
      ornamentalBeds,
      lawnArea,
    };
  }, [plotArea, buildingFootprint, numUnits]);

  return (
    <div className="space-y-6">
      <SectionCard title="מחשבון שטח ירוק" subtitle="חישוב דרישות שטח ירוק, חילחול, עצים והצללה">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <Label className="text-sm font-medium">שטח מגרש (מ״ר)</Label>
            <Input
              type="number"
              placeholder="לדוגמה: 2000"
              value={plotArea}
              onChange={(e) => setPlotArea(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">שטח תכסית מבנה (מ״ר)</Label>
            <Input
              type="number"
              placeholder="לדוגמה: 600"
              value={buildingFootprint}
              onChange={(e) => setBuildingFootprint(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">מספר יח״ד</Label>
            <Input
              type="number"
              placeholder="לדוגמה: 40"
              value={numUnits}
              onChange={(e) => setNumUnits(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {calc && (
          <div className="space-y-6">
            {/* סטטוס עמידה בדרישות */}
            <div className={`rounded-lg p-4 flex items-start gap-3 ${calc.meetsGreenReq ? "bg-green-500/10" : "bg-destructive/10"}`}>
              {calc.meetsGreenReq ? (
                <TreePine className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-semibold">
                  {calc.meetsGreenReq
                    ? "✓ המגרש עומד בדרישת השטח הירוק המינימלי"
                    : "✗ המגרש אינו עומד בדרישת 15% שטח ירוק"}
                </p>
                <p className="text-xs text-foreground/70 mt-1">
                  שטח פתוח: {calc.openArea.toFixed(0)} מ״ר ({calc.openPercent.toFixed(1)}%) | דרישה מינימלית: {calc.minGreenArea.toFixed(0)} מ״ר (15%)
                </p>
              </div>
            </div>

            {/* תוצאות עיקריות */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">{calc.minGreenArea.toFixed(0)}</div>
                <div className="text-xs text-muted-foreground mt-1">מ״ר שטח ירוק נדרש</div>
                <div className="text-[10px] text-muted-foreground">(15% מהמגרש)</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{calc.infiltrationArea.toFixed(0)}</div>
                <div className="text-xs text-muted-foreground mt-1">מ״ר שטח חילחול</div>
                <div className="text-[10px] text-muted-foreground">(לא מעל מרתף)</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">{calc.actualTreesNeeded}</div>
                <div className="text-xs text-muted-foreground mt-1">עצים בוגרים נדרשים</div>
                <div className="text-[10px] text-muted-foreground">(1 לכל 50 מ״ר ירוק)</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{calc.requiredShadeArea.toFixed(0)}</div>
                <div className="text-xs text-muted-foreground mt-1">מ״ר הצללה נדרשת</div>
                <div className="text-[10px] text-muted-foreground">(30% מהשטח המשותף)</div>
              </div>
            </div>

            {/* פירוט שטח ירוק */}
            <SectionCard title="פירוט הרכב השטח הירוק">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-primary">חלוקת שטח ירוק</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>ערוגות נוי ושיחים</span>
                      <span className="font-medium">{calc.ornamentalBeds.toFixed(0)} מ״ר (40%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "40%" }} />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>דשא / כיסוי קרקע</span>
                      <span className="font-medium">{calc.lawnArea.toFixed(0)} מ״ר (60%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: "60%" }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5">
                    <Sun className="h-4 w-4" />
                    הצללה
                  </h4>
                  <div className="text-sm space-y-1.5">
                    <div className="flex justify-between">
                      <span>שטח משותף פתוח</span>
                      <span className="font-medium">{calc.commonOpenArea.toFixed(0)} מ״ר</span>
                    </div>
                    <div className="flex justify-between">
                      <span>הצללה נדרשת (30%)</span>
                      <span className="font-medium">{calc.requiredShadeArea.toFixed(0)} מ״ר</span>
                    </div>
                    <div className="flex justify-between">
                      <span>עצים להצללה</span>
                      <span className="font-medium">{calc.treesForShade} עצים × 30 מ״ר</span>
                    </div>
                    <div className="flex justify-between text-primary font-semibold">
                      <span>הצללה בפועל מעצים</span>
                      <span>{calc.totalShadeFromTrees.toFixed(0)} מ״ר</span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* שטח חילחול */}
            <SectionCard title="שטח חילחול – דרישות">
              <div className="space-y-3">
                <div className="flex items-start gap-2 bg-blue-500/5 rounded-lg p-3">
                  <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground/80">
                    <p className="font-semibold mb-1">שטח חילחול = 15% לפחות משטח המגרש</p>
                    <p>שטח חילחול הוא שטח ירוק שאינו מרוצף ואינו ממוקם מעל מרתפים או מבנים תת-קרקעיים.
                    שטח זה מאפשר חלחול מי גשמים לקרקע ומפחית עומס על מערכת הניקוז העירונית.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="font-semibold text-foreground mb-1">✓ נכלל בחילחול</div>
                    <ul className="text-xs text-foreground/70 space-y-1">
                      <li>• ערוגות נוי על קרקע טבעית</li>
                      <li>• מדשאות ללא ריצוף תחתי</li>
                      <li>• גינות גג עם עומק קרקע ≥60 ס"מ*</li>
                    </ul>
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="font-semibold text-foreground mb-1">✗ לא נכלל</div>
                    <ul className="text-xs text-foreground/70 space-y-1">
                      <li>• שטח מעל מרתפי חניה</li>
                      <li>• משטחים מרוצפים</li>
                      <li>• אדניות ועציצים</li>
                    </ul>
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="font-semibold text-foreground mb-1">מקדמי חילחול</div>
                    <ul className="text-xs text-foreground/70 space-y-1">
                      <li>• קרקע טבעית: C=0.20</li>
                      <li>• דשא על חול: C=0.10</li>
                      <li>• חצץ מחלחל: C=0.50</li>
                    </ul>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* עצים בוגרים */}
            <SectionCard title="עצים בוגרים – דרישות נטיעה">
              <div className="space-y-3">
                <div className="text-sm text-foreground/80 space-y-2">
                  <p>
                    <strong>תקן:</strong> עץ בוגר אחד לכל 50 מ״ר שטח ירוק.
                    שטח ירוק נדרש: {calc.minGreenArea.toFixed(0)} מ״ר → <strong>{calc.treesRequired} עצים</strong>.
                  </p>
                  <p>
                    <strong>שטח השפעה:</strong> כל עץ בוגר תופס שטח השפעה של ~50 מ״ר (רדיוס 4 מ׳)
                    ומצליל ~30 מ״ר.
                  </p>
                </div>
                <div className="bg-destructive/5 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <div className="text-xs text-foreground/80">
                    <p className="font-semibold">הגבלות מרחק לנטיעת עצים:</p>
                    <ul className="mt-1 space-y-0.5">
                      <li>• 2 מ׳ לפחות מקיר מבנה</li>
                      <li>• 1 מ׳ לפחות מגדר/קו מגרש</li>
                      <li>• 2.5 מ׳ לפחות מקו תשתית (מים, ביוב, חשמל)</li>
                      <li>• 4 מ׳ לפחות מעץ סמוך (רדיוס צמרת)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* מתודולוגיה */}
            <SectionCard title="מתודולוגיית חישוב">
              <div className="bg-muted/50 rounded-lg p-4 text-xs text-foreground/70 space-y-2 font-mono">
                <p>שטח מגרש: {calc.plot.toFixed(0)} מ״ר</p>
                <p>תכסית מבנה: {calc.building.toFixed(0)} מ״ר</p>
                <p>שטח פתוח: {calc.plot.toFixed(0)} - {calc.building.toFixed(0)} = {calc.openArea.toFixed(0)} מ״ר ({calc.openPercent.toFixed(1)}%)</p>
                <div className="border-t border-border pt-2 mt-2">
                  <p>שטח ירוק מינימלי: {calc.plot.toFixed(0)} × 15% = {calc.minGreenArea.toFixed(0)} מ״ר</p>
                  <p>שטח חילחול נדרש: {calc.infiltrationArea.toFixed(0)} מ״ר (= שטח ירוק שלא מעל מרתף)</p>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <p>עצים בוגרים: {calc.minGreenArea.toFixed(0)} ÷ 50 = {calc.treesRequired} עצים</p>
                  <p>עצים להצללה: {calc.requiredShadeArea.toFixed(0)} ÷ 30 = {calc.treesForShade} עצים</p>
                  <p className="font-semibold text-foreground">סה״כ עצים נדרשים: {calc.actualTreesNeeded} (הגבוה מבין השניים)</p>
                </div>
              </div>
            </SectionCard>
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default GreenAreaCalculator;
