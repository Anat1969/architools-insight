import { useState } from "react";
import { Calculator, Banknote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionCard from "./SectionCard";

const FEE_PER_SQM = 188; // approximate agra per sqm

const FeeCalculator = () => {
  const [sqm, setSqm] = useState("");

  const area = parseFloat(sqm) || 0;
  const totalFee = area * FEE_PER_SQM;
  const deposit = totalFee * 0.2;

  return (
    <SectionCard title="מחשבון אגרות ופיקדון" subtitle="חישוב משוער של אגרת בנייה ופיקדון (20% מסך האגרה)">
      <div className="space-y-2 mb-6">
        <Label>שטח בנייה מוצע (מ"ר)</Label>
        <Input
          type="number"
          placeholder='הזן שטח במ"ר'
          value={sqm}
          onChange={(e) => setSqm(e.target.value)}
          className="font-grotesk max-w-xs"
        />
      </div>

      {area > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary rounded-lg p-4 text-center">
            <Banknote className="h-5 w-5 mx-auto mb-2 text-primary" />
            <div className="stat-number text-primary">₪{totalFee.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">אגרת בנייה משוערת</div>
          </div>
          <div className="bg-secondary rounded-lg p-4 text-center">
            <Calculator className="h-5 w-5 mx-auto mb-2 text-chapter-infrastructure" />
            <div className="stat-number text-chapter-infrastructure">₪{deposit.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">פיקדון (20%)</div>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        * החישוב הוא אומדן בלבד. הסכום המדויק ייקבע ע"י מחלקת האגרות בהתאם לתעריפים העדכניים.
      </p>
    </SectionCard>
  );
};

export default FeeCalculator;
