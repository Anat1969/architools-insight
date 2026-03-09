import { useState, useMemo } from "react";
import { Search, Phone, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  licensingContacts, supervisionContacts, roadsContacts,
  drainageContacts, electricityContacts, sanitationContacts,
  waterContacts, environmentContacts,
  type ContactPerson
} from "@/data/permitData";

const allContacts: (ContactPerson & { department: string })[] = [
  ...licensingContacts.map(c => ({ ...c, department: "רישוי להיתר" })),
  ...supervisionContacts.map(c => ({ ...c, department: "פיקוח על הבניה" })),
  ...roadsContacts.map(c => ({ ...c, department: "תכנון כבישים ותנועה" })),
  ...drainageContacts.map(c => ({ ...c, department: "ניקוז ונחלים" })),
  ...electricityContacts.map(c => ({ ...c, department: "חשמל ומאור" })),
  ...sanitationContacts.map(c => ({ ...c, department: "תברואה ואשפה" })),
  ...waterContacts.map(c => ({ ...c, department: "תאגיד המים יובלים" })),
  ...environmentContacts.map(c => ({ ...c, department: "איכות הסביבה" })),
];

const PhoneBook = () => {
  const [search, setSearch] = useState("");

  const filteredContacts = useMemo(() => {
    if (!search.trim()) return allContacts;
    const term = search.toLowerCase();
    return allContacts.filter(
      c => c.name.toLowerCase().includes(term) ||
           c.role.toLowerCase().includes(term) ||
           c.department.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <div className="info-card">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">ספר טלפונים</h3>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חיפוש לפי שם, תפקיד או מחלקה..."
          className="pr-10 text-right"
          dir="rtl"
        />
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">לא נמצאו תוצאות</p>
        ) : (
          filteredContacts.map((contact, idx) => (
            <div
              key={idx}
              className="bg-secondary/50 rounded-lg p-3 hover:bg-secondary transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-semibold text-sm">{contact.name}</div>
                  <div className="text-xs text-muted-foreground">{contact.role}</div>
                  <div className="text-xs text-primary/70 mt-0.5">{contact.department}</div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-grotesk"
                  >
                    <Phone className="h-3 w-3" />
                    <span dir="ltr">{contact.phone}</span>
                  </a>
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Mail className="h-3 w-3" />
                      <span className="truncate max-w-[140px]">{contact.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        {filteredContacts.length} אנשי קשר
      </p>
    </div>
  );
};

export default PhoneBook;
