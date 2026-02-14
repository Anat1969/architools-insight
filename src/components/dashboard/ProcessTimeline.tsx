import { permitTracks } from "@/data/permitData";
import { Clock, ArrowLeft } from "lucide-react";

const ProcessTimeline = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground mb-3">מסלולי הגשה לרשות רישוי</h4>
      <div className="space-y-3">
        {permitTracks.map((track, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-secondary/60 rounded-lg p-4">
            <div className="bg-primary rounded-full p-2.5 shrink-0">
              <Clock className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{track.name}</div>
              <div className="text-xs text-muted-foreground">{track.description}</div>
            </div>
            <div className="text-left shrink-0">
              <div className="stat-number text-primary text-2xl">{track.days}</div>
              <div className="text-xs text-muted-foreground">ימים</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;
