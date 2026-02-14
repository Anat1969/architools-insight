import { CheckCircle2 } from "lucide-react";

interface RequirementsListProps {
  title: string;
  items: string[];
  variant?: "check" | "number";
}

const RequirementsList = ({ title, items, variant = "check" }: RequirementsListProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-foreground">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
            {variant === "check" ? (
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            ) : (
              <span className="font-grotesk font-semibold text-primary mt-0.5 shrink-0 w-5 text-center">
                {idx + 1}
              </span>
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequirementsList;
