import { Phone, Mail } from "lucide-react";
import type { ContactPerson } from "@/data/permitData";

interface ContactTableProps {
  contacts: ContactPerson[];
  accentColor?: string;
}

const ContactTable = ({ contacts, accentColor = "bg-primary" }: ContactTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-right py-3 px-4 font-semibold text-muted-foreground">שם</th>
            <th className="text-right py-3 px-4 font-semibold text-muted-foreground">תפקיד</th>
            <th className="text-right py-3 px-4 font-semibold text-muted-foreground">טלפון</th>
            <th className="text-right py-3 px-4 font-semibold text-muted-foreground">דוא"ל</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, idx) => (
            <tr key={idx} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
              <td className="py-3 px-4 font-medium">{contact.name}</td>
              <td className="py-3 px-4 text-muted-foreground">{contact.role}</td>
              <td className="py-3 px-4">
                <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-1.5 text-primary hover:underline font-grotesk">
                  <Phone className="h-3.5 w-3.5" />
                  <span dir="ltr">{contact.phone}</span>
                </a>
              </td>
              <td className="py-3 px-4">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 text-primary hover:underline text-xs">
                    <Mail className="h-3.5 w-3.5" />
                    {contact.email}
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
