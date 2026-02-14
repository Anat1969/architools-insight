// Structured data extracted from the Ashdod permit guidelines booklet

export interface ContactPerson {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface Chapter {
  id: string;
  title: string;
  titleShort: string;
  icon: string;
  colorVar: string;
  description: string;
}

export const chapters: Chapter[] = [
  { id: "licensing", title: "רישוי להיתר", titleShort: "רישוי", icon: "FileText", colorVar: "chapter-licensing", description: "מחלקת הרישוי – בדיקת בקשות להיתר, מסלולי הגשה, אגרות ופיקדון" },
  { id: "supervision", title: "פיקוח על הבניה", titleShort: "פיקוח", icon: "HardHat", colorVar: "chapter-supervision", description: "פיקוח ומעקב על ביצוע הבנייה, אישור תחילת עבודות, תעודת גמר" },
  { id: "roads", title: "תכנון כבישים ותנועה", titleShort: "כבישים", icon: "Car", colorVar: "chapter-infrastructure", description: "תכנון תנועה, חניה, פיתוח שטח, כניסות למגרש" },
  { id: "drainage", title: "ניקוז ונחלים", titleShort: "ניקוז", icon: "Droplets", colorVar: "chapter-drainage", description: "מערכות ניקוז, בורות חלחול, חיבור לרשת עירונית" },
  { id: "planting", title: "נטיעות ופיתוח", titleShort: "נטיעות", icon: "TreePine", colorVar: "chapter-planting", description: "גינון, נטיעות, השקיה, פקיד היערות" },
  { id: "electricity", title: "חשמל, מאור ואחזקת רמזורים", titleShort: "חשמל", icon: "Zap", colorVar: "chapter-electricity", description: "תשתיות חשמל, תאורה, גנרטורים, עמדות טעינה" },
  { id: "sanitation", title: "תברואה ואצירת אשפה", titleShort: "תברואה", icon: "Trash2", colorVar: "chapter-sanitation", description: "פתרונות אצירת אשפה, דחסנים, מצנחות שוט" },
  { id: "water", title: "תאגיד המים יובלים", titleShort: "מים", icon: "Waves", colorVar: "chapter-water", description: "מערכות מים וביוב, נספח סניטרי, חיבור לרשת" },
  { id: "environment", title: "איגוד ערים לאיכות הסביבה", titleShort: "סביבה", icon: "Leaf", colorVar: "chapter-environment", description: "סקר קרקע, אסבסט, דו\"ח אקוסטי, נגר עילי" },
];

export const licensingContacts: ContactPerson[] = [
  { name: "ג'ני רוזנבלט", role: "מנהלת אגף רישוי", phone: "08-8545322", email: "geni@ashdod.muni.il" },
  { name: "אורלי אסייג", role: "מנהלת מחלקת רישוי", phone: "08-9238613", email: "orlyass@ashdod.muni.il" },
  { name: "סילס שריס", role: "מזכירת מחלקת רישוי", phone: "08-8545319", email: "cecil@ashdod.muni.il" },
  { name: "שרונה פנסו", role: "רכזת בקשות להיתר", phone: "08-8545384", email: "sharonap@ashdod.muni.il" },
  { name: "גלינה ליפוביץ", role: "בודקת רישוי", phone: "08-9568127", email: "galinali@ashdod.muni.il" },
  { name: "רימה פלקין", role: "בודקת רישוי", phone: "08-9568243", email: "rimafalkin@ashdod.muni.il" },
  { name: "ליליה נוטקין", role: "בודקת רישוי", phone: "08-9568339", email: "lelya@ashdod.muni.il" },
  { name: "עדן יפרח", role: "מנהלת מחלקת התחדשות עירונית", phone: "08-8545383", email: "edeno@ashdod.muni.il" },
];

export const supervisionContacts: ContactPerson[] = [
  { name: "כרמית סיני", role: "מנהלת מחלקת פיקוח", phone: "08-8545320", email: "karmitsi@ashdod.muni.il" },
  { name: "שירה אטדגי", role: "סגנית מנהלת מחלקת פיקוח", phone: "08-8545320", email: "shiraa@ashdod.muni.il" },
  { name: "שושנה אסור", role: "מזכירת מחלקת פיקוח", phone: "08-8545320", email: "shosha@ashdod.muni.il" },
  { name: "פליקס מזיבינסקי", role: "מפקח רובע ט\"ז, ב'", phone: "08-9238335", email: "felixm@ashdod.muni.il" },
  { name: "חן אלמליח", role: "מפקחת רובע י\"ז, ד', חוף הים", phone: "08-8545331", email: "chenelmaliah@ashdod.muni.il" },
];

export const roadsContacts: ContactPerson[] = [
  { name: "לריסה קגנוב", role: "מנהלת מח' תכנון כבישים", phone: "08-8545290", email: "larisak@ashdod.muni.il" },
  { name: "דימיטרי שנדיבין", role: "מנהל מחלקת תנועה", phone: "08-9238964", email: "dimitrysh@ashdod.muni.il" },
  { name: "יבגני אברבוך", role: "אזה\"ת צפוני, מבני ים", phone: "08-8545295", email: "evgenyav@ashdod.muni.il" },
  { name: "גליה בלומין", role: "בינוי, פינוי", phone: "08-8545291", email: "galyab@ashdod.muni.il" },
  { name: "יאיר רבניא", role: "רפרנט תיאום תשתיות", phone: "08-9238714", email: "yairra@ashdod.muni.il" },
];

export const drainageContacts: ContactPerson[] = [
  { name: "מירון יעקובוב", role: "מנהל אגף ניקוז ונחלים", phone: "08-8545956", email: "miron@ashdod.muni.il" },
  { name: "קרן שרייבר", role: "מזכירת מחלקה", phone: "08-8545347", email: "keren@ashdod.muni.il" },
];

export const electricityContacts: ContactPerson[] = [
  { name: "יוחאי אמיר", role: "מנהל אגף החשמל", phone: "08-8545340", email: "amiry@ashdod.muni.il" },
  { name: "אוריאן גדג'", role: "רפרנט רמזורים ואחזקת מאור", phone: "08-9568354", email: "oriangu@ashdod.muni.il" },
  { name: "תומר כהן", role: "סגן מנהל מח' חשמל מב\"צ", phone: "08-8545185", email: "tomerc@ashdod.muni.il" },
];

export const sanitationContacts: ContactPerson[] = [
  { name: "קובי זינו", role: "מנהל מחלקת בקרה טכנולוגית", phone: "08-8634863", email: "kobi@ashdod.muni.il" },
  { name: "עופר עמר", role: "מנהל מחלקת אשפה ומחזור", phone: "08-8634887", email: "oferamar@ashdod.muni.il" },
];

export const waterContacts: ContactPerson[] = [
  { name: "מקסים פטליס", role: "מהנדס מח' תכנון", phone: "08-8628906", email: "maxim@yuvallim.co.il" },
  { name: "מזכירות", role: "מח' תכנון", phone: "08-8544333", email: "" },
];

export const environmentContacts: ContactPerson[] = [
  { name: "איתי מירז", role: "מרכז תכנון סביבתי", phone: "08-8519500", email: "eitay@env.org.il" },
];

export const permitTracks = [
  { name: "מסלול מקוצר", days: 25, description: "בקשות פשוטות ללא חריגות" },
  { name: "מסלול מלא – תואם תב\"ע", days: 45, description: "בקשות תואמות תכנית בניין עיר" },
  { name: "מסלול מלא – כולל הקלות/שימושים חורגים", days: 90, description: "בקשות הכוללות הקלות או שימושים חורגים" },
];

export const bankAccounts = [
  { bank: "לאומי", bankNum: "10", branch: "932", account: "49660021", iban: "IL32019320000049660021" },
  { bank: "לאומי", bankNum: "10", branch: "932", account: "700100/04", iban: "ILl07109320000070010004" },
  { bank: "הפועלים", bankNum: "12", branch: "658", account: "14579", iban: "IL200126580000000014579" },
  { bank: "דיסקונט", bankNum: "11", branch: "004", account: "3506", iban: "IL49011004000000200350" },
  { bank: "מזרחי", bankNum: "20", branch: "416", account: "325338", iban: "IL610204160000000325338" },
  { bank: "הבינלאומי", bankNum: "31", branch: "33", account: "409015806", iban: "IL300310330000000015806" },
  { bank: "איגוד", bankNum: "13", branch: "71", account: "80400043", iban: "IL470130710000080400043" },
];

export const graphicContentRequirements = [
  "טבלת שטחים ותרשים סכמתי של חישוב שטחים",
  "תכניות בנייה כוללות תכנית התנוחה של כל מבנה",
  "חתכים וחזיתות כולל ציון חומרי גמר, גבהים, מפלסים",
  "סימון קבועות סניטריות, פירים, צמ\"ג, צ\"א, מתקני תברואה",
  "סימון אלמנטי קונסטרוקציה: עמודים, קורות יורדות, קירות",
  "סימון מיקום מעבי מזגנים, מערכות סולריות, מיזוג אוורור",
  "סימון ארובות, אנטנות, מתקנים טכניים בפירים",
  "סימון מרכיבי הנגשה למבנה",
  "תיאור מיקום מרחב מוגן / מקלט",
];

export const developmentPlanRequirements = [
  "תערך ע\"י אדריכל נוף בחתימה דיגיטלית",
  "בקנ\"מ 1:250 / 1:100 על רקע מפת מדידה עדכנית",
  "כולל שטח המדרכה בחזית ותיאום עם מגרשים גובלים",
  "סימון ±0.00 ותכנון תנועה וחניה",
  "סימון גבהי קרקע קיימים ומתוכננים בחניה ושבילים",
  "פתרון ניקוז עילי לכיוון הכניסה למגרש",
  "סימון צמחייה, עצים בוגרים, מתקני אשפה, גידור",
  "פריסת קירות וגדרות בקנ\"מ 1:100",
  "תכנית השקיה כולל מיקום ראש מערכת",
  "תכנית צמחייה: מיקום, כמות וסוג",
];

export const parkingRequirements = [
  "תכנון חניות לרכב פרטי ותפעולי בהתאם לתקן ולהנחיות משרד התחבורה",
  "חניות נכים בהתאם לחוק הנגישות – באחריות יועץ נגישות",
  "עמדות טעינה לרכבים חשמליים: תשתית הכנה לכל החניות הפרטיות",
  "20% מחניות מסחר עם עמדות טעינה בפועל",
  "לא תאושר חניה טורית למעט מקרים חריגים (עד 10%)",
  "כניסה/יציאה אחת למגרש (למעט מגרשים גדולים)",
  "כניסה מרחובות מקומיים ואספים בלבד – לא מרחובות ראשיים",
  "גובה קירות/גדרות ליד כניסה עד 0.6 מ' – שמירה על משולש ראות",
];

export const electricityRequirements = {
  spatialReview: [
    "הגשת נספח פיתוח כולל פריסת תאורה",
    "הצהרת קרינה / יועץ קרינה",
    "סיכום טכני – גודל חדר שנאים ומיקום",
    "הסכם עם חח\"י לעמדות טעינה חשמליות",
    "גודל חיבור כולל במתקן החשמל",
  ],
  completionCert: [
    "תכניות עדות (as-made) חשמל קומת קרקע ופיתוח",
    "תכניות עדות חניות תת-קרקעיות",
    "אישור בודק חשמל מוסמך / חברת חשמל",
    "אישור יועץ קרינה אלקטרומגנטית",
    "היתר גנרטור ממשרד התשתיות",
    "בדיקת מתקן בשטח ע\"י מפקח אגף החשמל",
    "עמדות טעינה: תשתית לכל החניות הפרטיות, 20% בפועל למסחר",
  ],
  guidelines: [
    "בניין מעל 29 מ' מחויב בגנרטור אחד לפחות",
    "חניון משותף לבניינים מעל 28 מ': גנרטור לכל 2 בניינים",
    "כל בניין מחויב בגוף תאורה מואר בהדלקה עצמית עם שם רחוב ומס' בית",
    "יישום תאורת לד חסכונית בגופי התאורה",
    "תכנון תאורת חירום בחדרי מדרגות (כולל תמ\"א 38)",
    "סקר היתכנות קרינה בקרבה לקווי מתח עיליים",
  ],
};

export const drainageGraphicContent = [
  "תכנית פיתוח על רקע מפת מדידה עדכנית בקנ\"מ 1:250",
  "סימון צנרת ניקוז – קטרים, מפלסים, נתונים",
  "שלושה תאי בקרה: תא לפני חיבור, תא נוסף ותא חיבור לרשת עירונית",
  "חתך וחתכנית מערכת ביוב עם פרטי חיבור לרשת עירונית",
  "תכנית למערכת הניקוז כולל רומים של תאי הבקרה",
  "פרט בור חלחול כולל חישוב ספיקות לפי סוג הקרקע",
];

export const wasteVolumeTable = [
  { type: "דירת מגורים", unit: "יח\"ד", volumePerUnit: 7, note: "ליטר ליום" },
  { type: "משרד", unit: "מ\"ר עיקרי", volumePerUnit: 2, note: "ליטר ליום" },
  { type: "מסחר כללי (300-2,000 מ\"ר)", unit: "מ\"ר עיקרי", volumePerUnit: 5, note: "מכבש קרטון" },
  { type: "מסחר גדול (מעל 2,000 מ\"ר)", unit: "מ\"ר עיקרי", volumePerUnit: 10, note: "דחסן קרטון" },
  { type: "מוסד חינוך", unit: "תלמיד", volumePerUnit: 5, note: "ליטר ליום" },
  { type: "בתי חולים", unit: "מ\"ר עיקרי", volumePerUnit: 40, note: "דחסנית קרטון" },
  { type: "תעשיה", unit: "מ\"ר עיקרי", volumePerUnit: 4, note: "ליטר ליום" },
];

export const plantingGuidelines = [
  { title: "מרחקי נטיעה מתשתיות", items: [
    "3 מ' ממבנה, 2 מ' ממדרכה",
    "4 מ' מעמוד תאורה, 3 מ' מקולטן מים",
    "2 מ' מגדרות וקירות, 2.5 מ' מקווי חשמל",
    "4 מ' מביוב, 3 מ' מניקוז, 2 מ' ממים",
  ]},
  { title: "בור נטיעה", items: [
    "מידות מינימליות: אורך 200 ס\"מ, רוחב 100 ס\"מ, עומק 100 ס\"מ",
    "מילוי באדמת גן עם תוספת 50 ליטר קומפוסט",
  ]},
  { title: "השקיה", items: [
    "מערכת השקיה בטפטוף – חובה",
    "מיקום ראש מערכת השקיה יסומן בתכנית",
    "חובת חיבור לשעון מים נפרד",
  ]},
  { title: "מדשאות", items: [
    "רק במקומות המיועדים לשימוש (לא ליופי בלבד)",
    "דשא מרבדים מקרקע קלה בלבד",
    "ללא רשת פלסטית",
  ]},
];

export const environmentRequirements = {
  spatialReview: [
    "סקר היסטורי לזיהום קרקע (במגרשים חשודים)",
    "תצהיר מאזן חומרי חפירה ומילוי",
    "דו\"ח אקוסטי (שימושים ציבוריים/מסחר)",
    "חתך חדר גנרטור כולל מיגון אקוסטי (קנ\"מ 1:50)",
    "תצהיר עורך הבקשה בעניין אסבסט",
    "נספח הידרולוגיה (מגרשים עם פחות מ-15% שטח חלחול)",
    "סקר בטיחות קרינה ממתקני חשמל",
  ],
  startWork: [
    "אישור משרד הגנת הסביבה לטיפול בקרקע (אם נדרש)",
    "הודעה לדיירים 24 שעות לפני עבודות הריסה",
    "דו\"ח סביבתי לעבודות הריסה (מעל 1,000 מ\"ר)",
    "אישור ממונה אסבסט לפרוק וסילוק",
    "הסכם פינוי עודפי חפירה",
    "דו\"ח אקלימי לפי סיווג המבנה",
  ],
  completion: [
    "אישור יועץ איטום לפי הנחיות הסביבה",
    "אישור אקוסטי על ביצוע ההמלצות",
    "אישור עורך נספח ניקוז והחדרת נגר",
    "מדידת קרינה ע\"י גורם מוסמך",
  ],
};
