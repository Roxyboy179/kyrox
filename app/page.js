"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import {
  Scale, Shield, Lock, User, Users, Server, Crown, Gift, Coins,
  Ticket, FileText, Database, AlertTriangle, Info, CheckCircle, Ban, Calendar,
  Clock, ExternalLink, Settings, Bot, MessageSquare, Archive, Gavel, Headphones,
  Menu, X, ChevronRight, ChevronUp, Search, Percent, Languages, Link2, Check, ArrowUp
} from "lucide-react";

const InfinityIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 16c5 0 5-8 10-8a3 3 0 1 1 0 6c-5 0-5-8-10-8a3 3 0 1 0 0 6"/></svg>
);

const TOC_CATEGORIES = [
  { title_de: "ALLGEMEINES", title_en: "GENERAL", icon: Bot, items: [
    { id: "ueber-kyrox", num: "01", title_de: "Über KyroX", title_en: "About KyroX" },
    { id: "geltungsbereich", num: "02", title_de: "Geltungsbereich", title_en: "Scope" },
    { id: "begriffsbestimmungen", num: "03", title_de: "Begriffsbestimmungen", title_en: "Definitions" },
    { id: "voraussetzungen", num: "04", title_de: "Voraussetzungen", title_en: "Requirements" },
    { id: "verhaeltnis-zu-discord", num: "05", title_de: "Verhältnis zu Discord", title_en: "Relationship to Discord" },
    { id: "discord-nutzerzuordnung", num: "06", title_de: "Discord Nutzerzuordnung", title_en: "Discord User Mapping" },
    { id: "bot-verfuegbarkeit", num: "07", title_de: "Bot-Verfügbarkeit und Discord-Abhängigkeit", title_en: "Bot Availability & Discord Dependency" },
    { id: "aenderungen-an-kyrox", num: "08", title_de: "Änderungen an KyroX", title_en: "Changes to KyroX" },
    { id: "sprache-kommunikation", num: "09", title_de: "Sprache und Kommunikation", title_en: "Language and Communication" },
    { id: "kostenlose-premium-funktionen", num: "10", title_de: "Kostenlose und Premium-Funktionen", title_en: "Free and Premium Features" },
  ]},
  { title_de: "NUTZUNGSBEDINGUNGEN", title_en: "TERMS OF USE", icon: FileText, items: [
    { id: "allgemeine-nutzungsbedingungen", num: "11", title_de: "Allgemeine Nutzungsbedingungen", title_en: "General Terms of Use" },
    { id: "commands-interactions", num: "12", title_de: "Discord Commands und Interactions", title_en: "Discord Commands and Interactions" },
    { id: "zulaessige-nutzung", num: "13", title_de: "Zulässige Nutzung", title_en: "Permitted Use" },
    { id: "verbotene-nutzung", num: "14", title_de: "Verbotene Nutzung", title_en: "Prohibited Use" },
    { id: "pflichten-nutzer", num: "15", title_de: "Pflichten der Nutzer", title_en: "User Obligations" },
    { id: "server-owner-administratoren", num: "16", title_de: "Server-Owner & Administratoren", title_en: "Server-Owner & Administrators" },
    { id: "server-konfiguration-kyrox", num: "17", title_de: "Server-Konfiguration über KyroX", title_en: "Server Configuration via KyroX" },
    { id: "bot-berechtigungen-rollen", num: "18", title_de: "Bot-Berechtigungen und Rollen-Hierarchie", title_en: "Bot Permissions & Role Hierarchy" },
    { id: "missbrauch-exploits", num: "19", title_de: "Missbrauch & Exploits", title_en: "Abuse & Exploits" },
    { id: "automatisierungsmissbrauch", num: "20", title_de: "Automatisierungsmissbrauch", title_en: "Automation Abuse" },
    { id: "spam-ueberlastung", num: "21", title_de: "Spam und Überlastung", title_en: "Spam and Overload" },
    { id: "sperrungen-massnahmen", num: "22", title_de: "Sperrungen & Maßnahmen", title_en: "Blocks & Measures" },
  ]},
  { title_de: "PREMIUM & CREDITS", title_en: "PREMIUM & CREDITS", icon: Crown, items: [
    { id: "user-premium", num: "23", title_de: "User Premium", title_en: "User Premium" },
    { id: "server-premium", num: "24", title_de: "Server Premium", title_en: "Server Premium" },
    { id: "monthly-server-premium", num: "25", title_de: "Monthly Server Premium", title_en: "Monthly Server Premium" },
    { id: "lifetime-server-premium", num: "26", title_de: "Lifetime Server Premium", title_en: "Lifetime Server Premium" },
    { id: "server-credits", num: "27", title_de: "Server Credits", title_en: "Server Credits" },
    { id: "premium-gift-codes", num: "28", title_de: "Premium Gift-Codes", title_en: "Premium Gift Codes" },
    { id: "premium-laufzeiten", num: "29", title_de: "Premium-Laufzeiten", title_en: "Premium Durations" },
    { id: "premium-ablauf", num: "30", title_de: "Premium-Ablauf", title_en: "Premium Expiration" },
    { id: "beanspruchung-premium", num: "31", title_de: "Beanspruchung von Premium", title_en: "Claiming Premium" },
    { id: "uebertragbarkeit-premium", num: "32", title_de: "Übertragbarkeit von Premium", title_en: "Transferability of Premium" },
    { id: "missbrauch-premium", num: "33", title_de: "Missbrauch von Premium-Systemen", title_en: "Abuse of Premium Systems" },
    { id: "credits-manipulation", num: "34", title_de: "Credits-Manipulation", title_en: "Credits Manipulation" },
    { id: "rueckzahlung-rueckerstattung", num: "35", title_de: "Rückzahlung und Rückerstattung", title_en: "Repayment and Refunds" },
  ]},
  { title_de: "EVENTS & ANGEBOTE", title_en: "EVENTS & OFFERS", icon: Calendar, items: [
    { id: "event-richtlinien", num: "36", title_de: "Event-Richtlinien", title_en: "Event Policies" },
    { id: "event-premium", num: "37", title_de: "Event Premium", title_en: "Event Premium" },
    { id: "event-gift-codes", num: "38", title_de: "Event Gift-Codes", title_en: "Event Gift Codes" },
    { id: "event-rabatte", num: "39", title_de: "Event-Rabatte", title_en: "Event Discounts" },
    { id: "globale-event-rabatte", num: "40", title_de: "Globale Event-Rabatte", title_en: "Global Event Discounts" },
    { id: "event-cooldowns", num: "41", title_de: "Event-Cooldowns", title_en: "Event Cooldowns" },
    { id: "sonderregeln-events", num: "42", title_de: "Sonderregeln für Events", title_en: "Special Rules for Events" },
    { id: "ablauf-events", num: "43", title_de: "Ablauf von Events", title_en: "Event Expiration" },
    { id: "verfall-event-vorteile", num: "44", title_de: "Verfall von Event-Vorteilen", title_en: "Expiration of Event Benefits" },
    { id: "spooky-deals", num: "45", title_de: "Spooky Deals", title_en: "Spooky Deals" },
    { id: "christmas-deals", num: "46", title_de: "Christmas Deals", title_en: "Christmas Deals" },
    { id: "anniversary-rewards", num: "47", title_de: "Anniversary Rewards", title_en: "Anniversary Rewards" },
    { id: "kyrox-day-offers", num: "48", title_de: "KyroX Day Offers", title_en: "KyroX Day Offers" },
    { id: "summer-end-event", num: "49", title_de: "Summer End Event", title_en: "Summer End Event" },
  ]},
  { title_de: "SERVER & BOT-FUNKTIONEN", title_en: "SERVER & BOT FEATURES", icon: Server, items: [
    { id: "moderation-sicherheit", num: "50", title_de: "Moderation & Sicherheit", title_en: "Moderation & Security" },
    { id: "auto-moderation", num: "51", title_de: "Auto-Moderation", title_en: "Auto-Moderation" },
    { id: "ticket-system", num: "52", title_de: "Ticket-System", title_en: "Ticket System" },
    { id: "ticket-kategorien-zuweisung", num: "53", title_de: "Ticket-Kategorien und Zuweisung", title_en: "Ticket Categories and Assignment" },
    { id: "ticket-transcripts", num: "54", title_de: "Ticket-Transcripts", title_en: "Ticket Transcripts" },
    { id: "backups", num: "55", title_de: "Backups", title_en: "Backups" },
    { id: "wiederherstellung-backups", num: "56", title_de: "Wiederherstellung von Backups", title_en: "Backup Restoration" },
    { id: "automatisierungen", num: "57", title_de: "Automatisierungen", title_en: "Automations" },
    { id: "logging", num: "58", title_de: "Logging", title_en: "Logging" },
    { id: "level-system", num: "59", title_de: "Level-System", title_en: "Level System" },
    { id: "counting", num: "60", title_de: "Counting", title_en: "Counting" },
    { id: "welcome-goodbye", num: "61", title_de: "Welcome & Goodbye", title_en: "Welcome & Goodbye" },
    { id: "embeds-team-verwaltung", num: "62", title_de: "Embeds und Team Verwaltung", title_en: "Embeds and Team Management" },
  ]},
  { title_de: "DATENSCHUTZ", title_en: "PRIVACY", icon: Shield, items: [
    { id: "datenschutz", num: "63", title_de: "Datenschutz", title_en: "Privacy" },
    { id: "verarbeitete-discord-daten", num: "64", title_de: "Verarbeitete Discord-Daten", title_en: "Processed Discord Data" },
    { id: "zwecke-datenverarbeitung", num: "65", title_de: "Zwecke der Datenverarbeitung", title_en: "Purposes of Data Processing" },
    { id: "server-konfigurationsdaten", num: "66", title_de: "Server- und Konfigurationsdaten", title_en: "Server and Configuration Data" },
    { id: "ticket-transcript-daten", num: "67", title_de: "Ticket- & Transcript-Daten", title_en: "Ticket & Transcript Data" },
    { id: "speicherungen-loeschung", num: "68", title_de: "Speicherungen & Löschung", title_en: "Storage & Deletion" },
    { id: "weitergabe-drittanbieter", num: "69", title_de: "Weitergabe & Drittanbieter", title_en: "Sharing & Third Parties" },
    { id: "sicherheit-daten", num: "70", title_de: "Sicherheit von Daten", title_en: "Data Security" },
    { id: "bot-interne-datenverarbeitung", num: "71", title_de: "Bot-Interne Datenverarbeitung", title_en: "Bot-Internal Data Processing" },
    { id: "rechte-datenschutzanfragen", num: "72", title_de: "Rechte & Datenschutzanfragen", title_en: "Rights & Privacy Requests" },
  ]},
  { title_de: "DIENST & RECHTLICHES", title_en: "SERVICE & LEGAL", icon: Gavel, items: [
    { id: "haftung", num: "73", title_de: "Haftung", title_en: "Liability" },
    { id: "beendigung-aenderungen-richtlinien", num: "74", title_de: "Beendigung & Änderungen der Richtlinien", title_en: "Termination & Policy Changes" },
    { id: "kontakt-support", num: "75", title_de: "Kontakt & Support", title_en: "Contact & Support" },
  ]},
  { title_de: "KOSTENLOSER SERVICE & PREMIUM", title_en: "FREE SERVICE & PREMIUM", icon: Gift, items: [
    { id: "kostenloser-dienst", num: "76", title_de: "Kostenloser Dienst", title_en: "Free Service" },
    { id: "keine-echtgeld-abonnements", num: "77", title_de: "Keine Echtgeld-Abonnements", title_en: "No Real Money Subscriptions" },
    { id: "lifetime-premium", num: "78", title_de: "Lifetime Premium", title_en: "Lifetime Premium" },
    { id: "server-credits-ohne-echtgeldwert", num: "79", title_de: "Server Credits ohne Echtgeldwert", title_en: "Server Credits Without Real Money Value" },
    { id: "kein-handel-credits", num: "80", title_de: "Kein Handel mit Credits", title_en: "No Trading of Credits" },
    { id: "kein-verkauf-premium", num: "81", title_de: "Kein Verkauf von Premium", title_en: "No Sale of Premium" },
    { id: "keine-automatischen-zahlungen", num: "82", title_de: "Keine automatischen Zahlungen", title_en: "No Automatic Payments" },
    { id: "keine-zahlungsdaten", num: "83", title_de: "Keine Zahlungsdaten", title_en: "No Payment Data" },
    { id: "premium-internes-vorteilssystem", num: "84", title_de: "Premium als internes Vorteilssystem", title_en: "Premium as Internal Benefit System" },
    { id: "premium-status", num: "85", title_de: "Premium-Status", title_en: "Premium Status" },
    { id: "premium-verlaengerung", num: "86", title_de: "Premium-Verlängerung", title_en: "Premium Extension" },
    { id: "12-monats-premium-grenze", num: "87", title_de: "12-Monats-Premium-Grenze", title_en: "12-Month Premium Limit" },
  ]},
  { title_de: "GIFTS", title_en: "GIFTS", icon: Gift, items: [
    { id: "premium-gift-erstellung", num: "88", title_de: "Premium-Gift Erstellung", title_en: "Premium Gift Creation" },
    { id: "premium-gift-einloesung", num: "89", title_de: "Premium-Gift Einlösung", title_en: "Premium Gift Redemption" },
    { id: "gift-code-bindung", num: "90", title_de: "Gift-Code Bindung", title_en: "Gift Code Binding" },
    { id: "verbrauchte-gift-codes", num: "91", title_de: "Verbrauchte Gift-Codes", title_en: "Consumed Gift Codes" },
    { id: "ungueltige-gift-codes", num: "92", title_de: "Ungültige Gift-Codes", title_en: "Invalid Gift Codes" },
    { id: "gift-code-missbrauch", num: "93", title_de: "Gift-Code-Missbrauch", title_en: "Gift Code Abuse" },
    { id: "event-gift-codes-detail", num: "94", title_de: "Event-Gift-Codes", title_en: "Event Gift Codes" },
    { id: "event-gift-event-ende", num: "95", title_de: "Event-Gift und Event-Ende", title_en: "Event Gift & Event End" },
  ]},
  { title_de: "EVENTS & RABATTE", title_en: "EVENTS & DISCOUNTS", icon: Percent, items: [
    { id: "event-belohnungen", num: "96", title_de: "Event-Belohnungen", title_en: "Event Rewards" },
    { id: "event-zeitraeume", num: "97", title_de: "Event-Zeiträume", title_en: "Event Periods" },
    { id: "event-rabatte-ohne-echtgeld", num: "98", title_de: "Event-Rabatte ohne Echtgeld", title_en: "Event Discounts Without Real Money" },
    { id: "monthly-event-rabatt", num: "99", title_de: "Monthly Event-Rabatt", title_en: "Monthly Event Discount" },
    { id: "lifetime-event-rabatt", num: "100", title_de: "Lifetime Event-Rabatt", title_en: "Lifetime Event Discount" },
    { id: "einmalige-rabattnutzung", num: "101", title_de: "Einmalige Rabattnutzung", title_en: "Single Discount Usage" },
    { id: "globaler-event-rabatt", num: "102", title_de: "Globaler Event-Rabatt", title_en: "Global Event Discount" },
    { id: "rabatt-claim", num: "103", title_de: "Rabatt-Claim", title_en: "Discount Claim" },
    { id: "rabatt-aktivierung", num: "104", title_de: "Rabatt-Aktivierung", title_en: "Discount Activation" },
    { id: "rabatt-verbrauch", num: "105", title_de: "Rabatt-Verbrauch", title_en: "Discount Consumption" },
    { id: "rabatt-bei-fehler", num: "106", title_de: "Rabatt bei Fehler", title_en: "Discount on Error" },
    { id: "rabatt-ablauf", num: "107", title_de: "Rabatt-Ablauf", title_en: "Discount Expiration" },
    { id: "event-cooldown-detail", num: "108", title_de: "Event-Cooldown", title_en: "Event Cooldown" },
    { id: "cooldown-startpunkt", num: "109", title_de: "Cooldown Startpunkt", title_en: "Cooldown Starting Point" },
    { id: "summer-end-event-detail", num: "110", title_de: "Summer End Event", title_en: "Summer End Event" },
    { id: "summer-end-sonderregel", num: "111", title_de: "Summer End Sonderregel", title_en: "Summer End Special Rule" },
    { id: "spooky-deals-detail", num: "112", title_de: "Spooky Deals", title_en: "Spooky Deals" },
    { id: "christmas-deals-detail", num: "113", title_de: "Christmas Deals", title_en: "Christmas Deals" },
    { id: "anniversary-rewards-detail", num: "114", title_de: "Anniversary Rewards", title_en: "Anniversary Rewards" },
    { id: "kyrox-day-offers-detail", num: "115", title_de: "KyroX Day Offers", title_en: "KyroX Day Offers" },
    { id: "kein-anspruch-event-wiederholung", num: "116", title_de: "Kein Anspruch auf Event-Wiederholung", title_en: "No Guarantee of Event Repetition" },
  ]},
  { title_de: "SERVER-OWNER & CREDITS", title_en: "SERVER-OWNER & CREDITS", icon: Users, items: [
    { id: "server-owner-pruefung", num: "117", title_de: "Server-Owner-Prüfung", title_en: "Server-Owner Check" },
    { id: "owner-wechsel", num: "118", title_de: "Owner-Wechsel", title_en: "Owner Change" },
    { id: "admin-nicht-owner", num: "119", title_de: "Administrator ist nicht automatisch Owner", title_en: "Administrator is not automatically Owner" },
    { id: "server-premium-zuordnung", num: "120", title_de: "Server Premium Zuordnung", title_en: "Server Premium Assignment" },
    { id: "server-credits-zuordnung", num: "121", title_de: "Server Credits Zuordnung", title_en: "Server Credits Assignment" },
    { id: "credit-aktionen", num: "122", title_de: "Credit-Aktionen", title_en: "Credit Actions" },
    { id: "credit-fehlerkorrektur", num: "123", title_de: "Credit-Fehlerkorrektur", title_en: "Credit Error Correction" },
    { id: "keine-auszahlung", num: "124", title_de: "Keine Auszahlung", title_en: "No Payout" },
    { id: "keine-uebertragung", num: "125", title_de: "Keine Übertragung", title_en: "No Transfer" },
  ]},
  { title_de: "PREMIUM-TECHNIK", title_en: "PREMIUM TECHNOLOGY", icon: Settings, items: [
    { id: "premium-ohne-echtgeldwert", num: "126", title_de: "Premium ohne Echtgeldwert", title_en: "Premium Without Real Money Value" },
    { id: "kostenlose-funktionen-aenderung", num: "127", title_de: "Kostenlose Funktionen können sich ändern", title_en: "Free Functions Can Change" },
    { id: "keine-garantierte-premium-funktion", num: "128", title_de: "Keine garantierte Premium-Funktion", title_en: "No Guaranteed Premium Function" },
    { id: "technische-premium-ausfaelle", num: "129", title_de: "Technische Premium-Ausfälle", title_en: "Technical Premium Failures" },
    { id: "premium-ablauf-detail", num: "130", title_de: "Premium-Ablauf", title_en: "Premium Expiration" },
    { id: "lifetime-ohne-expiresat", num: "131", title_de: "Lifetime ohne Expiresat", title_en: "Lifetime Without ExpiresAt" },
    { id: "kein-automatisches-credit-abo", num: "132", title_de: "Kein automatisches Credit-Abo", title_en: "No Automatic Credit Subscription" },
    { id: "manuelle-premium-aktivierung", num: "133", title_de: "Manuelle Premium-Aktivierung", title_en: "Manual Premium Activation" },
    { id: "keine-premium-selbstmanipulation", num: "134", title_de: "Keine Premium-Selbstmanipulation", title_en: "No Premium Self-Manipulation" },
    { id: "premium-rollen", num: "135", title_de: "Premium-Rollen", title_en: "Premium Roles" },
  ]},
  { title_de: "ROLLEN & SERVERKONFIGURATION", title_en: "ROLES & SERVER CONFIG", icon: Shield, items: [
    { id: "rollen-hierarchie-detail", num: "136", title_de: "Rollen-Hierarchie", title_en: "Role Hierarchy" },
    { id: "geloeschte-rollen", num: "137", title_de: "Gelöschte Rollen", title_en: "Deleted Roles" },
    { id: "geloeschte-channels", num: "138", title_de: "Gelöschte Channels", title_en: "Deleted Channels" },
    { id: "server-loeschung-bot-entfernung", num: "139", title_de: "Server-Löschung oder Bot-Entfernung", title_en: "Server Deletion or Bot Removal" },
    { id: "erneutes-hinzufuegen", num: "140", title_de: "Erneutes Hinzufügen", title_en: "Re-adding" },
  ]},
  { title_de: "VERFÜGBARKEIT & DISCORD", title_en: "AVAILABILITY & DISCORD", icon: Server, items: [
    { id: "discord-ausfaelle", num: "141", title_de: "Discord-Ausfälle", title_en: "Discord Outages" },
    { id: "discord-api-aenderungen", num: "142", title_de: "Discord-API-Änderungen", title_en: "Discord API Changes" },
    { id: "bot-restarts", num: "143", title_de: "Bot-Restarts", title_en: "Bot Restarts" },
    { id: "wartungsarbeiten", num: "144", title_de: "Wartungsarbeiten", title_en: "Maintenance Work" },
    { id: "sicherheitsabschaltungen", num: "145", title_de: "Sicherheitsabschaltungen", title_en: "Security Shutdowns" },
    { id: "missbrauchsschutz", num: "146", title_de: "Missbrauchsschutz", title_en: "Abuse Protection" },
    { id: "fehlermeldungen", num: "147", title_de: "Fehlermeldungen", title_en: "Error Messages" },
  ]},
  { title_de: "SUPPORT & ABSCHLUSS", title_en: "SUPPORT & CONCLUSION", icon: Headphones, items: [
    { id: "support-detail", num: "148", title_de: "Support", title_en: "Support" },
    { id: "betreiber", num: "149", title_de: "Betreiber", title_en: "Operator" },
    { id: "abschliessende-grundregel", num: "150", title_de: "Abschließende Grundregel", title_en: "Concluding Basic Rule" },
  ]}
];

function KyroXLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-[10px] bg-[#F1F5F9] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] relative overflow-hidden">
        <span className="font-black text-[17px] tracking-tighter leading-none text-[#07090D] z-10">K</span>
        <span className="font-black text-[17px] tracking-tighter leading-none text-[#10B981] z-10 -ml-[2px]">X</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-extrabold text-[14px] tracking-[0.14em] text-[#F1F5F9]">KYROX™</span>
        <span className="font-medium text-[10px] tracking-[0.2em] text-[#718096] mt-0.5">OFFICIAL</span>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeSection, setActiveSection] = useState("ueber-kyrox");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchClosing, setIsSearchClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState("de");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openCats, setOpenCats] = useState(() => { 
    const s = {}; TOC_CATEGORIES.forEach((c, i) => s[c.title_en] = i < 2); return s; 
  });
  
  const desktopNavRef = useRef(null);
  const activeTocRef = useRef(null);
  const searchCloseTimerRef = useRef(null);
  const navigationTimerRef = useRef(null);

  const openSearch = () => {
    window.clearTimeout(searchCloseTimerRef.current);
    setIsSearchClosing(false);
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    if (!isSearchOpen || isSearchClosing) return;
    setIsSearchClosing(true);
    window.clearTimeout(searchCloseTimerRef.current);
    searchCloseTimerRef.current = window.setTimeout(() => {
      setIsSearchOpen(false);
      setIsSearchClosing(false);
    }, 240);
  };

  const t = (de, en) => (lang === "de" ? de : en);
  const L = (arr) => arr.map(([de, en]) => t(de, en));

  const allItems = useMemo(() => TOC_CATEGORIES.flatMap(c => c.items), []);
  const total = allItems.length;

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const normalize = (value) => String(value)
      .toLocaleLowerCase(lang === "de" ? "de-DE" : "en-US")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    const q = normalize(searchQuery);

    return allItems.filter(it => (
      [it.title_de, it.title_en, it.num, it.id]
        .some(value => normalize(value).includes(q))
    )).slice(0, 12);
  }, [searchQuery, lang, allItems]);

  const activeData = useMemo(() => {
    let idx = 0;
    for (const cat of TOC_CATEGORIES) {
      const f = cat.items.findIndex(i => i.id === activeSection);
      if (f !== -1) return { cat, item: cat.items[f], globalIndex: idx + f + 1 };
      idx += cat.items.length;
    }
    return null;
  }, [activeSection]);

  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(dh > 0 ? (st / dh) * 100 : 0);
      setShowScrollTop(st > 800);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setActiveSection(e.target.id);
          const cat = TOC_CATEGORIES.find(c => c.items.some(it => it.id === e.target.id));
          if (cat) {
            setOpenCats(p => p[cat.title_en] ? p : ({ ...p, [cat.title_en]: true }));
          }
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });
    
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    setActiveSection(id);
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }, []);

  useEffect(() => {
    if (activeTocRef.current && desktopNavRef.current) {
      const item = activeTocRef.current;
      const cont = desktopNavRef.current;
      const ir = item.getBoundingClientRect();
      const cr = cont.getBoundingClientRect();
      if (ir.top < cr.top || ir.bottom > cr.bottom) {
        cont.scrollTo({ top: item.offsetTop - cont.clientHeight / 2 + item.clientHeight / 2, behavior: "smooth" });
      }
    }
  }, [activeSection]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        isSearchOpen ? closeSearch() : openSearch();
      }
      if (e.key === "Escape") { closeSearch(); setIsMobileMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSearchOpen, isSearchClosing]);

  useEffect(() => () => {
    window.clearTimeout(searchCloseTimerRef.current);
    window.clearTimeout(navigationTimerRef.current);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isMobileMenuOpen || isSearchOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen, isSearchOpen]);

  const handleTocClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    closeSearch();
    history.replaceState(null, "", `#${id}`);

    // Mobile overlays lock body scrolling. Wait until they are closed before
    // calculating the section position and starting the smooth scroll.
    const overlayWasOpen = isSearchOpen || isMobileMenuOpen;
    const navigationDelay = overlayWasOpen ? 300 : 0;

    window.clearTimeout(navigationTimerRef.current);
    navigationTimerRef.current = window.setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;

      const headerOffset = window.innerWidth < 1024 ? 76 : 24;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    }, navigationDelay);
  };

  const toggleCat = (k) => setOpenCats(p => ({ ...p, [k]: !p[k] }));

  return (
    <div className="min-h-screen bg-[#070A10] text-[#A6B1C3] font-sans selection:bg-[#10B981]/30 selection:text-[#F1F5F9]">
      
      {/* Global Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[100] pointer-events-none bg-[#0A0E15]">
        <div className="h-full bg-gradient-to-r from-[#10B981] to-[#2DD4BF] transition-[width] duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Global Search Palette (STRG+K) */}
      {isSearchOpen && (
        <div className={`search-overlay ${isSearchClosing ? "search-overlay--closing" : ""} fixed inset-0 z-[90] bg-[#020806]/75 backdrop-blur-[14px] flex items-start justify-center p-3 pt-[calc(env(safe-area-inset-top)+72px)] md:p-4 md:pt-[12vh]`} onClick={closeSearch}>
          <div className={`search-palette ${isSearchClosing ? "search-palette--closing" : ""} relative flex max-h-[calc(100dvh-88px)] w-full max-w-[640px] flex-col overflow-hidden rounded-[16px] border border-emerald-400/15 bg-[#0B1516]/95 shadow-[0_28px_100px_rgba(0,0,0,0.65),0_0_60px_rgba(16,185,129,0.10)] md:max-h-[76vh] md:rounded-[18px]`} onClick={e => e.stopPropagation()}>
            <div className="search-aura pointer-events-none absolute -top-24 left-1/2 h-44 w-80 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="search-input-row relative flex h-[60px] shrink-0 items-center gap-2.5 border-b border-emerald-300/10 px-3 md:h-[64px] md:gap-3 md:px-5">
              <Search size={20} className="search-icon shrink-0 text-[#2DD4BF]" />
              <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} enterKeyHint="search" placeholder={t("Richtlinien durchsuchen...","Search policies...")} className="search-input min-w-0 flex-1 bg-transparent text-[16px] text-[#F1F5F9] caret-[#2DD4BF] outline-none placeholder:text-[#718096] md:text-[15px]" />
              <span className="hidden md:flex text-[10px] font-mono text-[#718096] border border-white/[0.07] rounded px-1.5 py-0.5">ESC</span>
              <button type="button" onClick={closeSearch} aria-label={t("Suche schließen", "Close search")} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.04] text-[#718096] active:scale-95 md:hidden">
                <X size={16} />
              </button>
            </div>
            <div className="sidebar-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
              {!searchQuery.trim() ? (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#141D2B] border border-white/[0.07] flex items-center justify-center mx-auto mb-4"><Search size={20} className="text-[#718096]" /></div>
                  <p className="text-sm text-[#A6B1C3] font-medium">{t("Tippe um 150 Abschnitte zu durchsuchen","Type to search 150 sections")}</p>
                  <p className="text-[11px] text-[#718096] mt-2 font-mono">STRG + K</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div role="status" aria-live="polite" className="px-3 py-10 text-center md:py-12">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/15 bg-amber-400/[0.07] text-amber-300">
                    <Search size={20} />
                  </div>
                  <p className="text-sm font-semibold text-[#F1F5F9]">{t("Keine Ergebnisse gefunden", "No results found")}</p>
                  <p className="mx-auto mt-2 max-w-[360px] break-words text-xs leading-relaxed text-[#718096]">
                    {t("Für deine Suche wurde kein passender Abschnitt gefunden:", "No matching section was found for your search:")} <span className="font-medium text-[#A6B1C3]">“{searchQuery}”</span>
                  </p>
                  <button type="button" onClick={() => setSearchQuery("")} className="mt-5 min-h-11 rounded-[10px] border border-emerald-400/20 bg-emerald-400/[0.08] px-4 text-sm font-medium text-[#2DD4BF] transition-colors active:bg-emerald-400/[0.14] md:min-h-0 md:py-2">
                    {t("Suche zurücksetzen", "Clear search")}
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map((it, resultIndex) => {
                    const cat = TOC_CATEGORIES.find(c => c.items.some(x => x.id === it.id));
                    return (
                      <button key={it.id} onClick={e => handleTocClick(e, it.id)} style={{ animationDelay: `${resultIndex * 38}ms` }} className="search-result-item group flex min-h-14 w-full items-center gap-3 rounded-[11px] px-3 py-3 text-left transition-[transform,background-color] duration-150 active:bg-emerald-400/[0.10] md:min-h-0 md:hover:bg-emerald-400/[0.07]">
                        <span className="text-[11px] font-mono text-[#10B981] bg-[rgba(16, 185, 129,0.10)] border border-[rgba(16, 185, 129,0.20)] rounded px-1.5 py-0.5">{it.num}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#F1F5F9] group-hover:text-white truncate">{t(it.title_de, it.title_en)}</p>
                          <p className="text-[11px] text-[#718096] truncate">{cat ? t(cat.title_de, cat.title_en) : ""}</p>
                        </div>
                        <ChevronRight size={16} className="text-white/[0.07] group-hover:text-[#10B981] transition-colors" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="px-4 h-10 border-t border-white/[0.07] flex items-center justify-between text-[11px] text-[#718096] font-mono bg-[#0A0E15]">
              <span>{searchResults.length} {t("Ergebnisse","results")}</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded border border-white/[0.07] flex items-center justify-center text-[9px]">↵</span> {t("öffnen","open")}</span>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* DESKTOP LAYOUT (Strictly Hidden on Mobile) */}
      {/* ================================================================== */}
      <div className="hidden lg:grid lg:grid-cols-[clamp(280px,22vw,336px)_minmax(0,1fr)]">
        
        {/* Fixed Edge Sidebar */}
        <aside className="sticky inset-y-0 left-0 top-0 h-dvh w-full border-r border-white/[0.07] bg-[#0B1018]/95 backdrop-blur-xl z-50 flex flex-col shadow-[16px_0_50px_rgba(0,0,0,0.18)]">
          <div className="h-[68px] px-5 flex items-center justify-between border-b border-white/[0.07] shrink-0">
            <KyroXLogo />
            <div className="flex items-center gap-2">
              <button onClick={openSearch} className="w-9 h-9 rounded-full bg-[#141D2B] border border-white/[0.07] flex items-center justify-center text-[#718096] hover:text-[#10B981] hover:border-[#10B981]/30 transition-colors">
                <Search size={14} />
              </button>
              <button onClick={() => setLang(lang === "de" ? "en" : "de")} className="h-9 px-3 rounded-full bg-[#141D2B] border border-white/[0.07] text-[11px] font-bold text-[#A6B1C3] hover:border-[#10B981]/30 transition-colors flex items-center gap-1.5">
                <Languages size={12} className="text-[#10B981]" /> {lang.toUpperCase()}
              </button>
            </div>
          </div>
          
          <div ref={desktopNavRef} className="sidebar-scroll flex-1 overflow-y-auto p-3">
            {TOC_CATEGORIES.map(cat => {
              const isOpen = openCats[cat.title_en];
              const Icon = cat.icon;
              const isActiveCat = cat.items.some(i => i.id === activeSection);
              return (
                <div key={cat.title_en} className="mb-2">
                  <button onClick={() => toggleCat(cat.title_en)} className="w-full flex items-center justify-between px-2 py-2.5 rounded-[8px] hover:bg-[#141D2B] group transition-colors">
                    <span className="flex items-center gap-2.5">
                      <Icon size={14} className={`${isActiveCat ? "text-[#10B981]" : "text-[#718096] group-hover:text-[#A6B1C3]"} transition-colors`} />
                      <span className={`text-[11px] font-bold tracking-widest uppercase ${isActiveCat ? "text-[#F1F5F9]" : "text-[#718096] group-hover:text-[#A6B1C3]"} transition-colors`}>{t(cat.title_de, cat.title_en)}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono bg-[#07090D] text-[#718096] border border-white/[0.07] rounded-full px-1.5 py-0.5">{cat.items.length}</span>
                      <ChevronRight size={12} className={`text-[#718096] transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="mt-1 ml-3 pl-3 border-l border-white/[0.07] space-y-[1px]">
                        {cat.items.map(it => {
                          const active = activeSection === it.id;
                          return (
                            <a key={it.id} ref={active ? activeTocRef : null} href={`#${it.id}`} onClick={e => handleTocClick(e, it.id)} className={`flex items-center gap-2.5 px-3 py-[7px] rounded-[6px] text-[13px] leading-tight transition-all border-l-2 -ml-[13px] ${active ? "bg-[rgba(16, 185, 129,0.08)] border-[#10B981] text-[#F1F5F9] font-medium" : "border-transparent text-[#718096] hover:text-[#A6B1C3] hover:bg-[#141D2B]"}`}>
                              <span className={`font-mono text-[11px] ${active ? "text-[#10B981]" : "text-[#718096]"}`}>{it.num}</span>
                              <span className="truncate">{t(it.title_de, it.title_en)}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="p-3 border-t border-white/[0.07] bg-[#0A0E15] shrink-0">
            <div className="bg-[#141D2B] border border-white/[0.07] rounded-[12px] p-3.5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#718096] mb-2">{t("Aktuell Gelesen","Currently Reading")}</p>
              {activeData ? (
                <div className="flex items-start gap-2.5">
                  <span className="text-[11px] font-mono bg-[#10B981] text-white px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0">{activeData.item.num}</span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-[#F1F5F9] leading-tight truncate">{t(activeData.item.title_de, activeData.item.title_en)}</p>
                    <p className="text-[11px] text-[#718096] mt-1">{t(activeData.cat.title_de, activeData.cat.title_en)} • {activeData.globalIndex}/{total}</p>
                  </div>
                </div>
              ) : <p className="text-xs text-[#718096]">-</p>}
            </div>
          </div>
        </aside>

        {/* Main Content Area shifted right */}
        <div className="min-w-0">
          
          {/* Desktop Header */}
          <header className="relative border-b border-white/[0.07] overflow-hidden" style={{ background: `radial-gradient(circle at 30% 0%, rgba(16, 185, 129, 0.12), transparent 50%), #07090D` }}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMyMDI5MzgiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] opacity-30 pointer-events-none"></div>
            
            <div className="relative max-w-[1000px] mx-auto px-10 py-16">
              <div className="flex flex-col gap-8">
                <div className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-[#10B981] to-[#0F766E] flex items-center justify-center shadow-[0_12px_40px_rgba(16, 185, 129,0.30)] border border-[#2DD4BF]/20">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(16, 185, 129,0.12)] border border-[rgba(16, 185, 129,0.20)] text-[#2DD4BF] text-[10px] font-bold tracking-widest uppercase mb-4">
                    <CheckCircle size={10} /> {t("OFFIZIELL • AKTUELL","OFFICIAL • CURRENT")}
                  </div>
                  <h1 className="text-[44px] font-extrabold tracking-tight leading-[1.05] text-[#F1F5F9] mb-4">
                    {t("Richtlinien &","Policies &")} <span className="text-[#10B981]">{t("Rechtliches","Legal")}</span>
                  </h1>
                  <p className="text-[15px] leading-relaxed text-[#A6B1C3] max-w-[680px] mb-6">
                    {t("Zentrale Anlaufstelle für Nutzungsbedingungen, Datenschutz und alle Regeln rund um KyroX. Präzise, verständlich und immer aktuell.","Central hub for terms, privacy and all KyroX rules. Precise, understandable and always up to date.")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-[#141D2B] border border-white/[0.07] text-xs text-[#A6B1C3] font-medium"><FileText size={12} className="text-[#10B981]" />{total} {t("Abschnitte","Sections")}</span>
                    <span className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-[#141D2B] border border-white/[0.07] text-xs text-[#A6B1C3] font-medium"><Server size={12} className="text-[#10B981]" />14 {t("Themenbereiche","Categories")}</span>
                    <span className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-[#141D2B] border border-white/[0.07] text-xs text-[#A6B1C3] font-medium"><Clock size={12} className="text-[#10B981]" />{t("Letzte Aktualisierung: 21.08.2026","Last update: 21.08.2026")}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Desktop Main Content */}
          <main className="max-w-[1000px] mx-auto px-10 py-12">
            <PolicySections lang={lang} activeData={activeData} scrollProgress={scrollProgress} />
            
            {/* Desktop Conclusion & Footer */}
            <div className="mt-20 border border-white/[0.07] rounded-[16px] bg-[#0E1520] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none"></div>
              <h2 className="text-2xl font-bold text-[#F1F5F9] mb-2 relative">{t("Noch Fragen zu diesen Richtlinien?","Questions about these policies?")}</h2>
              <p className="text-[15px] text-[#A6B1C3] mb-6 max-w-[600px] relative">{t("Bei Fragen, Unklarheiten oder Datenschutzanliegen steht der offizielle KyroX Support zur Verfügung.","For questions or privacy concerns, official KyroX support is available.")}</p>
              <div className="flex flex-wrap gap-3 relative">
                <a href="https://discord.gg/JFaDGaFkk5" target="_blank" className="h-12 px-7 rounded-[12px] bg-[#10B981] hover:bg-[#2DD4BF] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors shadow-[0_8px_24px_rgba(16, 185, 129,0.25)]">
                  {t("Support-Server öffnen","Open support server")} <ExternalLink size={16} />
                </a>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="h-12 px-6 rounded-[12px] bg-[#141D2B] border border-white/[0.07] hover:border-[#10B981]/40 text-[#A6B1C3] hover:text-[#F1F5F9] text-sm font-semibold inline-flex items-center gap-2 transition-colors">
                  <ArrowUp size={16} /> {t("Nach oben","To top")}
                </button>
              </div>
            </div>

            <footer className="mt-12 border-t border-white/[0.07] pt-6 pb-12 flex flex-col md:flex-row gap-2 justify-between text-[11px] font-mono text-[#718096]">
              <div><p className="font-bold text-[#A6B1C3]">KyroX™ Official</p><p>{t("Richtlinien & Rechtliches · Deutsch / English","Policies & Legal · German / English")}</p></div>
              <div className="text-left md:text-right"><p>{t("Letzte Aktualisierung: 21.08.2026","Last updated: 21.08.2026")}</p><p>150 {t("Abschnitte","sections")} • 14 {t("Bereiche","categories")}</p></div>
            </footer>
          </main>
        </div>

        {showScrollTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#0E1520] border border-white/[0.07] hover:border-[#10B981] text-[#A6B1C3] hover:text-[#10B981] items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.4)] z-30 transition-all flex">
            <ChevronUp size={20} />
          </button>
        )}
      </div>

      {/* ================================================================== */}
      {/* MOBILE LAYOUT (Strictly Hidden on Desktop) */}
      {/* ================================================================== */}
      <div className="lg:hidden">
        
        {/* Mobile Top Sticky Bar */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-[#07090D]/80 backdrop-blur-[20px] border-b border-white/[0.07] flex items-center justify-between px-4 h-[60px]">
          <button onClick={() => setIsMobileMenuOpen(true)} className="flex items-center gap-2.5 text-[#F1F5F9]">
            <span className="w-9 h-9 rounded-full bg-[#141D2B] border border-white/[0.07] flex items-center justify-center relative">
              <Menu size={16} className="text-[#10B981]" />
              {activeData && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full text-[9px] font-bold text-white flex items-center justify-center">{activeData.globalIndex}</span>}
            </span>
            <span className="text-sm font-semibold">{t("Inhalt","Contents")}</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={openSearch} className="w-9 h-9 rounded-full bg-[#141D2B] border border-white/[0.07] flex items-center justify-center text-[#718096]"><Search size={16} /></button>
            <button onClick={() => setLang(lang === "de" ? "en" : "de")} className="h-9 px-3 rounded-full bg-[#141D2B] border border-white/[0.07] text-xs font-bold text-[#A6B1C3] flex items-center gap-1.5"><Languages size={12} className="text-[#10B981]" />{lang.toUpperCase()}</button>
          </div>
        </div>

        {/* Mobile Header */}
        <header className="relative border-b border-white/[0.07] overflow-hidden pt-[60px]" style={{ background: `radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.14), transparent 45%), #07090D` }}>
          <div className="relative px-5 py-10">
            <div className="mb-8"><KyroXLogo /></div>
            <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-[#10B981] to-[#0F766E] flex items-center justify-center shadow-[0_12px_40px_rgba(16, 185, 129,0.30)] border border-[#2DD4BF]/20 mb-6"><Scale className="w-7 h-7 text-white" /></div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(16, 185, 129,0.12)] border border-[rgba(16, 185, 129,0.20)] text-[#2DD4BF] text-[9px] font-bold tracking-widest uppercase mb-3"><CheckCircle size={10} /> {t("OFFIZIELL • AKTUELL","OFFICIAL • CURRENT")}</div>
            <h1 className="text-[30px] font-extrabold tracking-tight leading-[1.05] text-[#F1F5F9] mb-3">{t("Richtlinien &","Policies &")} <span className="text-[#10B981]">{t("Rechtliches","Legal")}</span></h1>
            <p className="text-[14px] leading-relaxed text-[#A6B1C3] mb-5">{t("Zentrale Anlaufstelle für Nutzungsbedingungen, Datenschutz und alle Regeln rund um KyroX. Präzise, verständlich und immer aktuell.","Central hub for terms, privacy and all KyroX rules. Precise, understandable and always up to date.")}</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-[#141D2B] border border-white/[0.07] text-[11px] text-[#A6B1C3] font-medium"><FileText size={11} className="text-[#10B981]" />150 {t("Abschnitte","Sections")}</span>
              <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-[#141D2B] border border-white/[0.07] text-[11px] text-[#A6B1C3] font-medium"><Server size={11} className="text-[#10B981]" />14 {t("Bereiche","Categories")}</span>
            </div>
          </div>
        </header>

        {/* Mobile Main Content */}
        <main className="px-4 py-8 pb-[120px]">
          <PolicySections lang={lang} activeData={activeData} scrollProgress={scrollProgress} />
          
          <div className="mt-12 border border-white/[0.07] rounded-[16px] bg-[#0E1520] p-6">
            <h2 className="text-xl font-bold text-[#F1F5F9] mb-2">{t("Noch Fragen?","Questions?")}</h2>
            <p className="text-sm text-[#A6B1C3] mb-5">{t("Offizieller KyroX Support Server.","Official KyroX Support Server.")}</p>
            <a href="https://discord.gg/JFaDGaFkk5" target="_blank" className="h-12 px-6 rounded-[12px] bg-[#10B981] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(16, 185, 129,0.25)]">
              {t("Support-Server öffnen","Open support server")} <ExternalLink size={16} />
            </a>
          </div>

          <footer className="mt-8 pt-6 border-t border-white/[0.07] text-[11px] font-mono text-[#718096] space-y-1 pb-4">
            <p className="font-bold text-[#A6B1C3]">KyroX™ Official</p>
            <p>{t("Letzte Aktualisierung: 21.08.2026","Last updated: 21.08.2026")}</p>
          </footer>
        </main>

        {/* Mobile Bottom Navigation (App-like) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0E1520]/90 backdrop-blur-[20px] border-t border-white/[0.07] pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-4 h-[68px]">
            <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center justify-center gap-1 text-[#A6B1C3] active:bg-[#141D2B] transition-colors">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center ${isMobileMenuOpen ? "bg-[#10B981] text-white" : "bg-[#141D2B] border border-white/[0.07]"}`}><Menu size={16} /></span>
              <span className="text-[10px] font-medium">{t("Inhalt","Menu")}</span>
            </button>
            <button onClick={openSearch} className="flex flex-col items-center justify-center gap-1 text-[#A6B1C3] active:bg-[#141D2B] transition-colors">
              <span className="w-8 h-8 rounded-full bg-[#141D2B] border border-white/[0.07] flex items-center justify-center"><Search size={16} /></span>
              <span className="text-[10px] font-medium">{t("Suche","Search")}</span>
            </button>
            <button onClick={() => setLang(lang === "de" ? "en" : "de")} className="flex flex-col items-center justify-center gap-1 text-[#A6B1C3] active:bg-[#141D2B] transition-colors">
              <span className="w-8 h-8 rounded-full bg-[#141D2B] border border-white/[0.07] flex items-center justify-center text-[10px] font-bold">{lang.toUpperCase()}</span>
              <span className="text-[10px] font-medium">DE/EN</span>
            </button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex flex-col items-center justify-center gap-1 text-[#A6B1C3] active:bg-[#141D2B] transition-colors">
              <span className="w-8 h-8 rounded-full bg-[#141D2B] border border-white/[0.07] flex items-center justify-center"><ChevronUp size={16} /></span>
              <span className="text-[10px] font-medium">{t("Nach oben","Top")}</span>
            </button>
          </div>
        </div>

        {/* Mobile Bottom Sheet Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[paletteIn_0.2s_cubic-bezier(0.16,1,0.3,1)]" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-[#0E1520] border-t border-white/[0.07] rounded-t-[28px] h-[92vh] flex flex-col shadow-[0_-20px_80px_rgba(0,0,0,0.6)] animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
              <div className="w-10 h-1.5 bg-white/[0.07] rounded-full mx-auto mt-3 mb-1 shrink-0" />
              <div className="flex items-center justify-between px-6 h-[60px] border-b border-white/[0.07] shrink-0">
                <div className="flex items-center gap-3"><KyroXLogo /><span className="text-sm font-bold text-[#F1F5F9]">{t("Navigation","Navigation")}</span></div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-9 h-9 rounded-full bg-[#141D2B] border border-white/[0.07] flex items-center justify-center text-[#718096] active:bg-[#151C28]"><X size={16} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-3 py-3">
                {TOC_CATEGORIES.map(cat => {
                  const isOpen = openCats[cat.title_en];
                  const Icon = cat.icon;
                  const isActiveCat = cat.items.some(i => i.id === activeSection);
                  return (
                    <div key={cat.title_en} className="mb-2">
                      <button onClick={() => toggleCat(cat.title_en)} className={`w-full flex items-center justify-between px-3 h-[52px] rounded-[12px] border transition-all ${isActiveCat ? "bg-[rgba(16, 185, 129,0.08)] border-[rgba(16, 185, 129,0.20)]" : "bg-[#141D2B] border-white/[0.07] active:bg-[#151C28]"}`}>
                        <span className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-[8px] flex items-center justify-center border ${isActiveCat ? "bg-[#10B981] border-[#10B981] text-white" : "bg-[#0A0E15] border-white/[0.07] text-[#718096]"}`}><Icon size={14} /></span>
                          <span className={`text-[12px] font-bold tracking-widest ${isActiveCat ? "text-[#F1F5F9]" : "text-[#A6B1C3]"}`}>{t(cat.title_de, cat.title_en)}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-[10px] font-mono bg-[#07090D] border border-white/[0.07] rounded-full px-2 py-0.5 text-[#718096]">{cat.items.length}</span>
                          <ChevronRight size={14} className={`text-[#718096] transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                        </span>
                      </button>
                      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="mt-1 ml-3 pl-3 border-l border-white/[0.07] space-y-0.5 py-1">
                            {cat.items.map(it => {
                              const active = activeSection === it.id;
                              return (
                                <a key={it.id} href={`#${it.id}`} onClick={e => handleTocClick(e, it.id)} className={`flex items-center gap-3 px-3 h-[44px] rounded-[10px] text-sm transition-colors ${active ? "bg-[#10B981] text-white font-medium" : "text-[#718096] active:text-[#F1F5F9] active:bg-[#141D2B]"}`}>
                                  <span className="font-mono text-[11px] opacity-70">{it.num}</span>
                                  <span className="truncate">{t(it.title_de, it.title_en)}</span>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="p-4 border-t border-white/[0.07] bg-[#0A0E15] rounded-b-[28px] shrink-0">
                <a href="https://discord.gg/JFaDGaFkk5" target="_blank" className="w-full h-12 bg-[#10B981] active:bg-[#2DD4BF] text-white rounded-[14px] flex items-center justify-center gap-2 text-sm font-semibold transition-colors">
                  {t("Support-Server öffnen","Open Support Server")} <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// =========================================================
// SHARED COMPONENTS FOR RENDERING 150 SECTIONS
// =========================================================

function PolicySections({ lang, activeData, scrollProgress }) {
  const t = (de, en) => (lang === "de" ? de : en);
  const L = (arr) => arr.map(([de, en]) => t(de, en));

  return (
    <>
      {activeData && (
        <div className="hidden lg:flex mb-10 items-center gap-2 text-[11px] font-mono tracking-wide">
          <span className="px-2 py-1 rounded-full bg-[rgba(16, 185, 129,0.12)] border border-[rgba(16, 185, 129,0.20)] text-[#2DD4BF] uppercase">{t(activeData.cat.title_de, activeData.cat.title_en)}</span>
          <span className="text-white/[0.07]">/</span>
          <span className="text-[#718096]">{activeData.globalIndex} {t("von","of")} 150</span>
          <span className="ml-auto flex items-center gap-1.5 text-[#718096]"><Clock size={11} className="text-[#10B981]" /> {Math.round(scrollProgress)}% {t("gelesen","read")}</span>
        </div>
      )}

      <div className="space-y-14">
        <CategoryDivider title={t("ALLGEMEINES","GENERAL")} />
        <Section id="ueber-kyrox" lang={lang}><p className="mb-4">{t("KyroX ist ein umfassender, kostenloser Discord-Bot, der verschiedene Werkzeuge und Funktionen zur Verfügung stellt, um Discord-Server effizient zu verwalten, zu moderieren und zu erweitern. Zu den Kernfunktionen gehören Server-Management, Automatisierungen, Tickets, Backups, Moderationswerkzeuge und ein umfangreiches internes Premium-System.","KyroX is a comprehensive, free Discord bot that provides various tools and functions to efficiently manage, moderate, and expand Discord servers. Core functions include server management, automations, tickets, backups, moderation tools, and an extensive internal premium system.")}</p><p>{t("Die Bedienung erfolgt primär über Discord Slash Commands, Buttons, Select Menus, Modals und Components V2. Diese zentrale Richtlinienseite bündelt alle rechtlichen und regulatorischen Vorgaben für die Nutzung aller KyroX-Funktionen innerhalb von Discord.","Operation is primarily via Discord Slash Commands, Buttons, Select Menus, Modals, and Components V2. This central policy page bundles all legal and regulatory requirements for using all KyroX features within Discord.")}</p></Section>
        <Section id="geltungsbereich" lang={lang}><p className="mb-4">{t("Diese Richtlinien gelten für die Nutzung des KyroX Discord-Bots und aller über KyroX innerhalb von Discord bereitgestellten Funktionen und Dienste. Dazu gehören interne technische Systeme, soweit sie für den Betrieb des Bots erforderlich sind.","These policies apply to the use of the KyroX Discord bot and all functions and services provided by KyroX within Discord. This includes internal technical systems as far as they are necessary for the operation of the bot.")}</p><RuleList title={t("Dazu gehören insbesondere:","This includes in particular:")} items={L([["Slash Commands", "Slash Commands"], ["Discord Buttons", "Discord Buttons"], ["Select Menus", "Select Menus"], ["Modals", "Modals"], ["Components V2", "Components V2"], ["Server-Konfiguration", "Server Configuration"], ["Moderation", "Moderation"], ["Sicherheit", "Security"], ["Tickets", "Tickets"], ["Ticket-Transcripts", "Ticket Transcripts"], ["Backups", "Backups"], ["Logging", "Logging"], ["Welcome", "Welcome"], ["Goodbye", "Goodbye"], ["Level-System", "Level System"], ["Counting", "Counting"], ["Embeds", "Embeds"], ["Team-Verwaltung", "Team Management"], ["User Premium", "User Premium"], ["Server Premium", "Server Premium"], ["Server Credits", "Server Credits"], ["Premium Gift-Codes", "Premium Gift Codes"], ["Events", "Events"], ["Event Premium", "Event Premium"], ["Event Gift-Codes", "Event Gift Codes"], ["Event-Rabatte", "Event Discounts"]])} /><RuleList title={t("Die Regeln gelten für:","The rules apply to:")} items={L([["Nutzer", "Users"], ["Server-Owner", "Server Owners"], ["Administratoren", "Administrators"], ["Moderatoren", "Moderators"], ["Teammitglieder", "Team Members"], ["Personen, die KyroX Funktionen verwenden", "Persons using KyroX features"]])} /></Section>
        <Section id="begriffsbestimmungen" lang={lang}><RuleList title={t("Innerhalb dieser Richtlinien werden folgende Begriffe verwendet:","The following terms are used within these policies:")} items={L([["Nutzer: Jede Person, die mit KyroX über Discord interagiert oder dessen Funktionen nutzt.", "User: Any person who interacts with KyroX via Discord or uses its functions."],["Server-Owner: Der tatsächliche Eigentümer eines Discord-Servers.", "Server Owner: The actual owner of a Discord server."],["Administrator: Ein Mitglied mit administrativen Rechten auf einem Server.", "Administrator: A member with administrative rights on a server."],["Premium: Eine zusätzliche interne Funktionsstufe von KyroX, die keinen Echtgeldwert besitzt.", "Premium: An additional internal functional tier of KyroX that has no real money value."],["Credits: Interne virtuelle Einheit (Server Credits) innerhalb des KyroX-Bots ohne Echtgeldwert.", "Credits: Internal virtual unit (Server Credits) within the KyroX bot with no real money value."],["Event: Ein zeitlich begrenztes Angebot mit besonderen internen Vorteilen innerhalb von KyroX.", "Event: A time-limited offer with special internal benefits within KyroX."]])} /></Section>
        <Section id="voraussetzungen" lang={lang}><p className="mb-4">{t("Für die Nutzung vieler Funktionen von KyroX wird ein gültiges Discord-Konto vorausgesetzt. Je nach Funktion können zusätzlich folgende Voraussetzungen erfüllt sein:","A valid Discord account is required to use many KyroX functions. Depending on the function, the following additional requirements may need to be met:")}</p><RuleList items={L([["Mitgliedschaft auf einem Discord Server", "Membership on a Discord Server"], ["bestimmte Rollen", "specific roles"], ["Manage Server", "Manage Server"], ["Administrator", "Administrator"], ["Server Owner", "Server Owner"]])} /><p className="mt-4">{t("Für die Nutzung von KyroX gelten zusätzlich die jeweils anwendbaren Voraussetzungen und Altersanforderungen der Discord-Plattform.","The applicable requirements and age restrictions of the Discord platform also apply to the use of KyroX.")}</p></Section>
        <Section id="verhaeltnis-zu-discord" lang={lang}><p className="mb-4">{t("KyroX ist ein unabhängiger Dienst, der die API und Dienste von Discord verwendet. Sofern keine ausdrückliche Partnerschaft besteht, ist KyroX nicht:","KyroX is an independent service that uses the API and services of Discord. Unless an explicit partnership exists, KyroX is not:")}</p><RuleList items={L([["Discord selbst", "Discord itself"], ["Teil von Discord", "Part of Discord"], ["offiziell von Discord betrieben", "officially operated by Discord"], ["offiziell von Discord unterstützt", "officially supported by Discord"]])} /><p className="mt-4 mb-4">{t("Änderungen durch Discord können die Funktionen von KyroX unmittelbar beeinflussen. Beispiele hierfür sind:","Changes made by Discord can directly affect the functions of KyroX. Examples of this include:")}</p><RuleList items={L([["API Änderungen", "API changes"], ["Rate Limits", "Rate Limits"], ["Permission Änderungen", "Permission changes"], ["Discord Ausfälle", "Discord outages"], ["entfernte Discord Funktionen", "removed Discord features"]])} /></Section>
        <Section id="discord-nutzerzuordnung" lang={lang}><p className="mb-4">{t("KyroX identifiziert Nutzer über Discord-bezogene Daten. Dazu können gehören:","KyroX identifies users via Discord-related data. This can include:")}</p><RuleList items={L([["Discord User ID", "Discord User ID"], ["Discord Guild ID", "Discord Guild ID"], ["Channel ID", "Channel ID"], ["Role ID", "Role ID"], ["Message ID", "Message ID"], ["Benutzername", "Username"], ["Servername", "Server name"], ["Avatar, sofern für eine Funktion benötigt", "Avatar, if required for a function"]])} /><p className="mt-4">{t("Diese Daten werden verwendet, um Bot-Einstellungen, Premium-Status und weitere Funktionen dem jeweiligen Nutzer oder Server korrekt zuzuordnen.","This data is used to correctly map bot settings, premium status, and other functions to the respective user or server.")}</p></Section>
        <Section id="bot-verfuegbarkeit" lang={lang}><p className="mb-4">{t("KyroX bemüht sich um eine möglichst zuverlässige Bereitstellung des Bots. Eine jederzeit unterbrechungsfreie oder fehlerfreie Verfügbarkeit kann jedoch nicht gewährleistet werden.","KyroX strives to provide the bot as reliably as possible. However, uninterrupted or error-free availability at all times cannot be guaranteed.")}</p><p>{t("Die Verfügbarkeit von KyroX ist direkt abhängig von der Discord-Plattform. Schränkungen oder Ausfälle bei Discord führen unweigerlich zu Einschränkungen beim Bot.","The availability of KyroX is directly dependent on the Discord platform. Restrictions or outages on Discord inevitably lead to restrictions on the bot.")}</p></Section>
        <Section id="aenderungen-an-kyrox" lang={lang}><p className="mb-4">{t("KyroX kann Bot-Funktionen und Dienste jederzeit anpassen. Dies umfasst das Recht, Funktionen:","KyroX can adjust bot functions and services at any time. This includes the right to:")}</p><RuleList items={L([["hinzuzufügen", "add"], ["zu verändern", "change"], ["zu verbessern", "improve"], ["zu ersetzen", "replace"], ["einzuschränken", "restrict"], ["zu entfernen", "remove"]])} /><p className="mt-4">{t("Es besteht kein Anspruch darauf, dass jede Funktion dauerhaft unverändert bestehen bleibt.","There is no guarantee that every function will remain permanently unchanged.")}</p></Section>
        <Section id="sprache-kommunikation" lang={lang}><p className="mb-4">{t("Die primäre Kommunikation zwischen KyroX und den Nutzern erfolgt über die von Discord bereitgestellten Interaktionsmöglichkeiten. Die Sprache des Bots ist an die Server-Einstellungen oder Nutzer-Einstellungen angepasst, soweit unterstützt.","Primary communication between KyroX and users occurs via the interaction options provided by Discord. The bot's language is adapted to server or user settings where supported.")}</p><p>{t("Supportanfragen und rechtliche Hinweise werden in der Regel in Deutsch oder Englisch abgewickelt.","Support requests and legal information are usually handled in German or English.")}</p></Section>
        <Section id="kostenlose-premium-funktionen" lang={lang}><p className="mb-4">{t("KyroX bietet sowohl kostenlose Grundfunktionen als auch erweiterte Premium-Funktionen. Premium ist ein kostenloses internes Zusatzsystem und erfordert kein Echtgeld. Welche Funktionen kostenlos nutzbar sind und welche Premium voraussetzen, kann vom System festgelegt und jederzeit angepasst werden.","KyroX offers both basic free functions and advanced premium functions. Premium is a free internal add-on system and does not require real money. Which functions are free to use and which require premium can be defined by the system and adjusted at any time.")}</p><p>{t("Es besteht kein Anspruch auf dauerhaft kostenlose Nutzung spezifischer Module.","There is no right to permanent free use of specific modules.")}</p></Section>

        <CategoryDivider title={t("NUTZUNGSBEDINGUNGEN","TERMS OF USE")} />
        <Section id="allgemeine-nutzungsbedingungen" lang={lang}><p className="mb-4">{t("Durch die Nutzung des KyroX Discord-Bots akzeptierst du diese Nutzungsbedingungen sowie alle zugehörigen Richtlinien. KyroX bietet Funktionen zur Serververwaltung, Moderation, Automatisierung und Erweiterung von Discord-Servern.","By using the KyroX Discord bot, you accept these terms of use and all associated policies. KyroX offers functions for server management, moderation, automation, and expansion of Discord servers.")}</p><p className="mb-4">{t("Die Nutzung des Dienstes erfolgt auf Basis der technischen Möglichkeiten von Discord. Der Nutzer ist für die korrekte Konfiguration und die Vergabe von Berechtigungen auf seinem Server verantwortlich.","Use of the service is based on the technical possibilities of Discord. The user is responsible for the correct configuration and assignment of permissions on their server.")}</p><InfoBox lang={lang} type="info" title={t("Wichtig","Important")}>{t("Diese Nutzungsbedingungen gelten für alle Nutzer, Server-Owner, Administratoren, Moderatoren und sonstigen Personen, die KyroX verwenden oder auf KyroX-Ressourcen zugreifen.","These terms of use apply to all users, server owners, administrators, moderators, and other persons who use KyroX or access KyroX resources.")}</InfoBox></Section>
        <Section id="commands-interactions" lang={lang}><p className="mb-4">{t("KyroX wird hauptsächlich über Discord Commands und Interactions bedient. Dazu gehören:","KyroX is mainly operated via Discord Commands and Interactions. These include:")}</p><RuleList items={L([["Slash Commands", "Slash Commands"], ["Buttons", "Buttons"], ["Select Menus", "Select Menus"], ["Modals", "Modals"], ["Components", "Components"], ["Components V2", "Components V2"]])} /><p className="mt-4">{t("Nutzer dürfen diese Systeme nicht manipulieren oder verwenden, um Berechtigungsprüfungen zu umgehen. KyroX kann Berechtigungen beim tatsächlichen Ausführen einer Aktion erneut prüfen.","Users may not manipulate these systems or use them to bypass permission checks. KyroX can re-check permissions when an action is actually executed.")}</p></Section>
        <Section id="zulaessige-nutzung" lang={lang}><p className="mb-4">{t("KyroX darf ausschließlich für die legitime Verwaltung und Erweiterung von Discord-Servern genutzt werden. Beispiele für zulässige Nutzungsbereiche sind:","KyroX may only be used for the legitimate management and expansion of Discord servers. Examples of permitted usage areas include:")}</p><RuleList items={L([["Discord Serververwaltung", "Discord Server Management"], ["Community Management", "Community Management"], ["Moderation", "Moderation"], ["Support über Tickets", "Support via Tickets"], ["Automatisierungen", "Automations"], ["Backups", "Backups"], ["Logging", "Logging"], ["Level-System", "Level System"], ["Counting", "Counting"], ["Teamverwaltung", "Team Management"], ["Embeds", "Embeds"], ["Welcome/Goodbye", "Welcome/Goodbye"], ["Premium Funktionen", "Premium Functions"]])} /></Section>
        <Section id="verbotene-nutzung" lang={lang}><p className="mb-4">{t("Die Nutzung von KyroX zum Zwecke des Missbrauchs, der Umgehung von Beschränkungen oder der Schädigung Dritter ist strengstens untersagt. Verboten sind insbesondere:","The use of KyroX for the purpose of abuse, circumventing restrictions, or harming third parties is strictly prohibited. The following are particularly forbidden:")}</p><RuleList items={L([["Exploits", "Exploits"], ["Bug Abuse", "Bug Abuse"], ["absichtliche Manipulation von Commands", "intentional manipulation of Commands"], ["Credits duplizieren", "duplicating Credits"], ["Premium unberechtigt erhalten", "obtaining Premium unauthorized"], ["Premium-Limits umgehen", "bypassing Premium limits"], ["Event-Cooldowns umgehen", "bypassing Event cooldowns"], ["Event-Belohnungen mehrfach beanspruchen", "claiming Event rewards multiple times"], ["Rabatte mehrfach verwenden", "using discounts multiple times"], ["Gift Codes manipulieren", "manipulating Gift Codes"], ["Gift Codes mehrfach einlösen", "redeeming Gift Codes multiple times"], ["Server-Owner-Prüfungen umgehen", "bypassing Server Owner checks"], ["Interactions manipulieren", "manipulating Interactions"], ["API-Missbrauch", "API abuse"], ["Spam über Bot-Commands", "Spam via Bot Commands"], ["Flooding", "Flooding"], ["absichtliche Überlastung des Bots", "intentional overloading of the Bot"], ["Rate Limits umgehen", "bypassing Rate Limits"], ["unbefugter Zugriff", "unauthorized access"], ["gestohlene Accounts", "stolen accounts"], ["betrügerische Nutzung", "fraudulent use"], ["Sicherheitsmechanismen umgehen", "bypassing security mechanisms"]])} /><InfoBox lang={lang} type="error" title={t("Achtung","Attention")}>{t("Wenn ein Nutzer einen Fehler entdeckt, darf dieser nicht bewusst ausgenutzt werden. Jeder Missbrauch kann zum Ausschluss führen.","If a user discovers an error, it may not be intentionally exploited. Any abuse can lead to exclusion.")}</InfoBox></Section>
        <Section id="pflichten-nutzer" lang={lang}><p className="mb-4">{t("Nutzer sind verpflichtet, die Regeln von Discord und die vorliegenden KyroX-Richtlinien einzuhalten. Die Konfiguration von KyroX auf einem Server muss so erfolgen, dass keine anderen Nutzer geschädigt, belästigt oder getäuscht werden.","Users are obliged to comply with the rules of Discord and the present KyroX policies. The configuration of KyroX on a server must be done in such a way that no other users are harmed, harassed, or deceived.")}</p><p>{t("Sicherheitsrelevante Einstellungen, wie Moderationsmodule oder Berechtigungen, müssen sachgemäß und mit der nötigen Sorgfalt konfiguriert werden.","Security-relevant settings, such as moderation modules or permissions, must be configured properly and with the necessary care.")}</p></Section>
        <Section id="server-owner-administratoren" lang={lang}><p className="mb-4">{t("Server-Owner und berechtigte Administratoren verwalten KyroX direkt über Discord-Funktionen und Commands. Je nach Modul können sie Einstellungen vornehmen für:","Server Owners and authorized administrators manage KyroX directly via Discord functions and commands. Depending on the module, they can make settings for:")}</p><RuleList items={L([["Rollen", "Roles"], ["Channels", "Channels"], ["Moderation", "Moderation"], ["Sicherheitsfunktionen", "Security functions"], ["Tickets", "Tickets"], ["Logs", "Logs"], ["Backups", "Backups"], ["Embeds", "Embeds"], ["Welcome / Goodbye", "Welcome / Goodbye"], ["Level-System", "Level System"], ["Counting", "Counting"], ["Team-Verwaltung", "Team Management"], ["Premium-Angebote", "Premium Offers"], ["Server Credits", "Server Credits"], ["weitere Bot-Module", "other Bot modules"]])} /><p className="mt-4">{t("Bestimmte kritische Funktionen dürfen ausschließlich dem tatsächlichen Server-Owner zur Verfügung stehen.","Certain critical functions may only be available to the actual Server Owner.")}</p></Section>
        <Section id="server-konfiguration-kyrox" lang={lang}><p className="mb-4">{t("Einstellungen, die über KyroX-Commands vorgenommen werden, werden gespeichert, um den Dienst auf dem Server aufrechtzuerhalten. Diese Daten sind an die Guild ID gebunden und können von berechtigten Personen verwaltet werden.","Settings made via KyroX commands are saved to maintain the service on the server. This data is linked to the Guild ID and can be managed by authorized persons.")}</p><p>{t("Fehlkonfigurationen, die zu Fehlfunktionen des Bots führen, liegen im Verantwortungsbereich der Server-Administration.","Misconfigurations leading to malfunctions of the bot are the responsibility of the server administration.")}</p></Section>
        <Section id="bot-berechtigungen-rollen" lang={lang}><p className="mb-4">{t("KyroX benötigt bestimmte Discord-Berechtigungen, um ordnungsgemäß zu funktionieren (z. B. Nachrichten senden, Mitglieder kicken/bannen, Rollen verwalten). Die Hierarchie der Rollen auf dem Discord-Server muss so gestaltet sein, dass die Bot-Rolle über den Rollen steht, die er verwalten soll.","KyroX requires certain Discord permissions to function properly (e.g., send messages, kick/ban members, manage roles). The hierarchy of roles on the Discord server must be designed so that the bot role is above the roles it is supposed to manage.")}</p><p>{t("Kann KyroX eine Aktion aufgrund fehlender Rechte oder einer ungünstigen Rollen-Hierarchie nicht ausführen, liegt dies nicht in der Verantwortung des Bot-Betreibers.","If KyroX cannot execute an action due to missing permissions or an unfavorable role hierarchy, this is not the responsibility of the bot operator.")}</p></Section>
        <Section id="missbrauch-exploits" lang={lang}><p className="mb-4">{t("Ein Nutzer darf technische Fehler oder Lücken im System nicht ausnutzen. Dies umfasst insbesondere den Versuch:","A user may not exploit technical errors or loopholes in the system. This includes in particular the attempt to:")}</p><RuleList items={L([["Premium mehrfach zu erhalten", "get Premium multiple times"], ["Credits zu duplizieren", "duplicate Credits"], ["Cooldowns zu umgehen", "bypass cooldowns"], ["Rabatte mehrfach zu nutzen", "use discounts multiple times"], ["Gift Codes mehrfach einzulösen", "redeem Gift Codes multiple times"], ["Owner-Prüfungen zu umgehen", "bypass Owner checks"]])} /><p className="mt-4">{t("Automatisierungsmissbrauch, das Umgehen von Rate-Limits und die Nutzung gestohlener Accounts sind ebenfalls untersagt.","Automation abuse, bypassing rate limits, and using stolen accounts are also prohibited.")}</p></Section>
        <Section id="automatisierungsmissbrauch" lang={lang}><p className="mb-4">{t("KyroX nutzt Automatisierungen (z. B. Level-System, Auto-Moderation). Es ist untersagt, diese Automatisierungen durch Makros, Skripte oder andere externe Tools künstlich auszulösen, um unfaire Vorteile (z. B. XP-Farming) zu erlangen.","KyroX uses automations (e.g., Level System, Auto-Moderation). It is prohibited to artificially trigger these automations via macros, scripts, or other external tools to gain unfair advantages (e.g., XP farming).")}</p><p>{t("Ein solcher Automatisierungsmissbrauch kann zum Ausschluss vom Bot oder zur Löschung unrechtmäßig erlangter Daten führen.","Such automation abuse can lead to exclusion from the bot or the deletion of illegally obtained data.")}</p></Section>
        <Section id="spam-ueberlastung" lang={lang}><p className="mb-4">{t("Das absichtliche Spammen von KyroX-Commands, das Auslösen massenhafter Interactions gleichzeitig oder das Flooding von Ticket-Systemen ist untersagt.","Intentionally spamming KyroX commands, triggering mass interactions simultaneously, or flooding ticket systems is prohibited.")}</p><p>{t("Solche Handlungen dienen lediglich der Überlastung der Bot-Infrastruktur und können zu sofortigen Sperren führen.","Such actions only serve to overload the bot infrastructure and can lead to immediate bans.")}</p></Section>
        <Section id="sperrungen-massnahmen" lang={lang}><p className="mb-4">{t("Bei Missbrauch oder Verstößen gegen diese Richtlinien können seitens KyroX angemessene Maßnahmen ergriffen werden. Beispiele für solche Maßnahmen:","In the event of abuse or violations of these policies, appropriate measures may be taken by KyroX. Examples of such measures:")}</p><RuleList items={L([["Einschränkung bestimmter Bot-Funktionen", "Restriction of certain bot functions"], ["Event-Funktionen sperren", "Block event functions"], ["unrechtmäßig erhaltene Vorteile korrigieren", "Correct illegally obtained advantages"], ["Credits korrigieren", "Correct credits"], ["unrechtmäßig erhaltenes Premium korrigieren", "Correct illegally obtained premium"], ["Gift-Funktionen sperren", "Block gift functions"], ["Nutzer (Blacklist) oder Server von KyroX ausschließen", "Exclude users (blacklist) or servers from KyroX"]])} /></Section>

        <CategoryDivider title={t("PREMIUM & CREDITS","PREMIUM & CREDITS")} />
        <Section id="user-premium" lang={lang}><p className="mb-4">{t("KyroX kann personenbezogenes User Premium bereitstellen. Premium ist eine interne Funktionsstufe und erfordert kein Echtgeld. Premium kann beispielsweise stammen aus:","KyroX can provide personal User Premium. Premium is an internal functional tier and does not require real money. Premium can for example come from:")}</p><RuleList items={L([["regulärer Aktivierung", "regular activation"], ["Gift Code", "Gift Code"], ["Event Gift Code", "Event Gift Code"], ["offiziellen KyroX Aktionen", "official KyroX promotions"]])} /><p className="mt-4">{t("Temporäres Premium besitzt eine Laufzeit und ein Ablaufdatum und wird nach Ablauf deaktiviert. Lifetime Premium besitzt grundsätzlich kein reguläres zeitliches Ablaufdatum.","Temporary Premium has a duration and an expiration date and is deactivated after expiry. Lifetime Premium generally has no regular time-based expiration date.")}</p></Section>
        <Section id="server-premium" lang={lang}><p className="mb-4">{t("Server Premium bezieht sich auf einen spezifischen Discord-Server und schaltet erweiterte Bot-Funktionen für diesen frei. Server Premium gehört zum jeweiligen Server, und bestimmte Freischaltungen dürfen nur durch den Server-Owner durchgeführt werden.","Server Premium refers to a specific Discord server and unlocks advanced bot features for it. Server Premium belongs to the respective server, and certain unlocks may only be performed by the Server Owner.")}</p><InfoBox lang={lang} type="info">{t("Wenn ein Premium-Angebot deaktiviert wird, bedeutet das nicht automatisch, dass bereits bestehendes Premium sofort gelöscht wird. Die Deaktivierung verhindert lediglich den Erwerb neuer Premium-Stufen.","If a premium offer is deactivated, it does not automatically mean that existing premium is immediately deleted. Deactivation only prevents the acquisition of new premium tiers.")}</InfoBox></Section>
        <Section id="monthly-server-premium" lang={lang}><p className="mb-4">{t("Das Monthly Server Premium ist ein zeitlich begrenztes Modell, das erweiterte Funktionen für einen Discord-Server für die Dauer eines Monats freischaltet. Es kann über interne KyroX-Funktionen verlängert werden, um aufrechterhalten zu bleiben. KyroX verlangt dafür kein Echtgeld.","Monthly Server Premium is a time-limited model that unlocks advanced features for a Discord server for the duration of one month. It can be extended via internal KyroX functions to remain active. KyroX does not charge real money for this.")}</p><p>{t("Nach Ablauf des Monats werden die Premium-Vorteile automatisch deaktiviert, sofern keine Verlängerung über interne Funktionen erfolgt.","After the month expires, the premium benefits are automatically deactivated unless an extension is made via internal functions.")}</p></Section>
        <Section id="lifetime-server-premium" lang={lang}><p className="mb-4">{t("Das Lifetime Server Premium ist ein internes Modell, das erweiterte Funktionen für einen Discord-Server auf unbestimmte Zeit freischaltet. Es wird dafür kein Echtgeld verlangt.","Lifetime Server Premium is an internal model that unlocks advanced features for a Discord server indefinitely. No real money is charged for this.")}</p><p>{t("Es unterliegt keinem regulären zeitlichen Ablauf, kann aber bei schwerwiegenden Verstößen gegen die Richtlinien entzogen werden.","It is not subject to regular time-based expiration but can be revoked in the event of serious violations of the policies.")}</p></Section>
        <Section id="server-credits" lang={lang}><p className="mb-4">{t("Server Credits sind eine interne KyroX Einheit. Sie sind kein gesetzliches Zahlungsmittel, besitzen keinen garantierten realen Geldwert und sind grundsätzlich für vorgesehene KyroX Bot-Funktionen bestimmt. KyroX verkauft Server Credits nicht gegen echtes Geld.","Server Credits are an internal KyroX unit. They are not legal tender, have no guaranteed real money value, and are primarily intended for designated KyroX bot functions. KyroX does not sell Server Credits for real money.")}</p><RuleList title={t("Für Server Credits gelten folgende Regeln:","The following rules apply to Server Credits:")} items={L([["kein gesetzliches Zahlungsmittel", "no legal tender"], ["kein garantierter Geldwert", "no guaranteed money value"], ["grundsätzlich serverbezogen", "primarily server-related"], ["nur für KyroX Funktionen nutzbar", "only usable for KyroX functions"], ["Manipulation und Duplizierung verboten", "manipulation and duplication prohibited"]])} /><p className="mt-4">{t("Server Credits werden nur dem tatsächlichen Server-Owner angezeigt, sofern das System dies vorsieht.","Server Credits are only displayed to the actual Server Owner if the system provides for this.")}</p></Section>
        <Section id="premium-gift-codes" lang={lang}><p className="mb-4">{t("KyroX stellt Premium Gift-Codes zur Verfügung, die über Bot-Commands gegen Premium-Laufzeiten eingetauscht werden können. Gift-Codes können folgende Eigenschaften aufweisen:","KyroX provides Premium Gift Codes that can be exchanged for Premium durations via bot commands. Gift Codes can have the following properties:")}</p><RuleList items={L([["Premium Dauer", "Premium Duration"], ["Zielnutzer", "Target User"], ["Erstellungszeitpunkt", "Creation Time"], ["Einlösestatus", "Redemption Status"], ["Quelle", "Source"], ["Event-Zuordnung", "Event Assignment"]])} /><p className="mt-4 mb-4">{t("Grundsätzlich gilt für Gift-Codes:","The following generally applies to Gift Codes:")}</p><RuleList items={L([["einmalige Einlösung", "single redemption"], ["User-Bindung, sofern vorhanden", "User binding, if applicable"], ["nicht übertragbar", "non-transferable"], ["nach Einlösung als verwendet markiert", "marked as used after redemption"]])} /><InfoBox lang={lang} type="warning">{t("Ein Gift Code darf technische Premium-Grenzen, wie die bestehende 12-Monats-Prüfung des Gift-Systems, nicht umgehen.","A Gift Code may not bypass technical premium limits, such as the existing 12-month check of the Gift system.")}</InfoBox></Section>
        <Section id="premium-laufzeiten" lang={lang}><p className="mb-4">{t("Die Laufzeit von Premium richtet sich nach der jeweiligen Quelle der Aktivierung. Temporäres Premium besitzt ein festes Aktivierungs- und Ablaufdatum. Die maximale Laufzeit kann durch systeminterne Grenzen, wie beispielsweise eine 12-Monats-Prüfung, begrenzt sein.","The duration of Premium depends on the respective source of activation. Temporary Premium has a fixed activation and expiration date. The maximum duration can be limited by internal system limits, such as a 12-month check.")}</p><p>{t("Lifetime Premium unterliegt keinem regulären zeitlichen Ablauf.","Lifetime Premium is not subject to regular time-based expiration.")}</p></Section>
        <Section id="premium-ablauf" lang={lang}><p className="mb-4">{t("Wenn temporäres Premium abläuft, werden die entsprechenden Premium-Vorteile automatisch deaktiviert. Es erfolgt keine automatische Verlängerung, sofern nicht explizit ein solcher Prozess im System vorgesehen ist.","When temporary Premium expires, the corresponding Premium benefits are automatically deactivated. There is no automatic renewal unless such a process is explicitly provided in the system.")}</p><p>{t("Bereits während der Premium-Laufzeit getätigte Konfigurationen, die über die Standardfunktionen hinausgehen, können nach Ablauf deaktiviert oder zurückgesetzt werden.","Configurations made during the Premium period that go beyond the standard functions can be deactivated or reset after expiry.")}</p></Section>
        <Section id="beanspruchung-premium" lang={lang}><p className="mb-4">{t("Premium kann auf verschiedene Arten beansprucht werden:","Premium can be claimed in several ways:")}</p><RuleList items={L([["Direkte Aktivierung über Bot-Commands", "Direct activation via Bot Commands"], ["Einlösung eines Gift-Codes", "Redemption of a Gift Code"], ["Empfang eines Event Gift-Codes", "Receipt of an Event Gift Code"], ["Manuelle Zuweisung durch das KyroX-Team bei Aktionen", "Manual assignment by the KyroX team during promotions"]])} /><p className="mt-4">{t("Voraussetzung für die Beanspruchung ist stets ein gültiges Discord-Konto.","A valid Discord account is always required to claim Premium.")}</p></Section>
        <Section id="uebertragbarkeit-premium" lang={lang}><p className="mb-4">{t("User Premium ist an die Discord User ID gebunden und nicht auf andere Nutzer übertragbar. Server Premium ist an die Guild ID gebunden und nicht auf andere Server übertragbar.","User Premium is tied to the Discord User ID and is not transferable to other users. Server Premium is tied to the Guild ID and is not transferable to other servers.")}</p><p>{t("Eine Übertragung bei Kontoverlust oder Serverlöschung wird seitens KyroX nicht zugesichert, kann aber im Einzelfall über den Support geprüft werden.","Transfer in the event of account loss or server deletion is not guaranteed by KyroX but can be reviewed on a case-by-case basis via support.")}</p></Section>
        <Section id="missbrauch-premium" lang={lang}><p className="mb-4">{t("Der Versuch, das Premium-System zu manipulieren, ist strengstens untersagt. Dazu gehört:","Attempts to manipulate the Premium system are strictly prohibited. This includes:")}</p><RuleList items={L([["Nutzung von Exploits zur unberechtigten Freischaltung", "Using exploits for unauthorized activation"], ["Umgehung der 12-Monats-Prüfung", "Bypassing the 12-month check"], ["Manipulation von Bot-Interactions", "Manipulating Bot Interactions"], ["Mehrere gleichzeitige Premium-Abos auf einem Server durch Exploits", "Multiple concurrent Premium subs on one server via exploits"]])} /><p className="mt-4">{t("Erkannter Missbrauch führt zur sofortigen Sperrung und Ungültigmachung des Premiums.","Detected abuse leads to immediate blocking and invalidation of Premium.")}</p></Section>
        <Section id="credits-manipulation" lang={lang}><p className="mb-4">{t("Server Credits dürfen nicht durch Bugs, externe Tools oder Manipulationen an Bot-Commands vermehrt werden. Jede Form von Credits-Duplikation ist ein schwerwiegender Verstoß gegen diese Richtlinien.","Server Credits may not be increased through bugs, external tools, or manipulations of Bot Commands. Any form of Credit duplication is a serious violation of these policies.")}</p><p>{t("Unrechtmäßig erlangte Credits werden ohne Vorankündigung auf den rechtmäßigen Stand korrigiert.","Illegally obtained Credits will be corrected to the lawful status without prior notice.")}</p></Section>
        <Section id="rueckzahlung-rueckerstattung" lang={lang}><p className="mb-4">{t("Da KyroX ein kostenloser Discord-Service ist und keine Echtgeldzahlungen für Premium oder Server Credits verlangt, bestehen keine Echtgeld-Rückerstattungsansprüche. Server Credits besitzen keinen Geldwert und können nicht in Echtgeld ausgezahlt werden.","Since KyroX is a free Discord service and does not charge real money for Premium or Server Credits, there are no real money refund claims. Server Credits have no monetary value and cannot be paid out in real money.")}</p><p>{t("Unrechtmäßig erlangte interne Vorteile können ohne finanzielle Entschädigung zurückgesetzt werden.","Illegally obtained internal benefits can be reset without financial compensation.")}</p></Section>

        <CategoryDivider title={t("EVENTS & ANGEBOTE","EVENTS & OFFERS")} />
        <Section id="event-richtlinien" lang={lang}><p>{t("KyroX kann zeitlich begrenzte Events durchführen, die besondere interne Vorteile offerieren. Die aktuell in KyroX über Bot-Commands angezeigten Event-Bedingungen sind stets maßgeblich. Events können kostenloses Premium, Premium Gift-Codes, interne Server Credit-Rabatte oder andere Vorteile umfassen.","KyroX can conduct time-limited events offering special internal benefits. The event conditions currently displayed in KyroX via Bot Commands are always decisive. Events can include free Premium, Premium Gift Codes, internal Server Credit discounts, or other benefits.")}</p></Section>
        <Section id="event-premium" lang={lang}><p className="mb-4">{t("Events können kostenloses User Premium ermöglichen. Wenn das bestehende System dafür einen Premium Gift Code erzeugt, wird dieser ausgestellt und muss entsprechend den Gift-Code-Regeln eingelöst werden.","Events can enable free User Premium. If the existing system generates a Premium Gift Code for this, it will be issued and must be redeemed according to the Gift Code rules.")}</p><p>{t("Die bestehende 12-Monats-Prüfung des Gift-Systems wird hierbei berücksichtigt. Es wird kein direktes Premium vergeben, wenn das System technisch einen Gift-Code erzeugt.","The existing 12-month check of the Gift System is taken into account. Direct Premium is not granted if the system technically generates a Gift Code.")}</p></Section>
        <Section id="event-gift-codes" lang={lang}><p className="mb-4">{t("Im Rahmen von Events können spezielle Gift-Codes erzeugt werden. Diese unterliegen den allgemeinen Regeln für Gift-Codes, können jedoch zusätzliche Event-spezifische Zuordnungen oder Laufzeiten besitzen.","Within the framework of events, special Gift Codes can be generated. These are subject to the general rules for Gift Codes but may have additional event-specific assignments or durations.")}</p><p>{t("Auch hier gilt: Technische Grenzen wie die 12-Monats-Prüfung können nicht umgangen werden.","Here too, technical limits such as the 12-month check cannot be bypassed.")}</p></Section>
        <Section id="event-rabatte" lang={lang}><p>{t("Im Rahmen zeitlich begrenzter Events kann KyroX besondere Rabatte auf Server-Premium-Angebote bereitstellen. Der Begriff 'Rabatt' bezieht sich bei KyroX ausschließlich auf interne Server Credits (z.B. weniger Server Credits erforderlich) und beinhaltet kein Echtgeld. Diese Rabatte müssen über Bot-Commands beansprucht werden und gelten nur während des aktiven Events.","As part of time-limited events, KyroX can offer special discounts on Server Premium offers. The term 'discount' at KyroX refers exclusively to internal Server Credits (e.g., fewer Server Credits required) and does not involve real money. These discounts must be claimed via Bot Commands and are only valid during the active event.")}</p></Section>
        <Section id="globale-event-rabatte" lang={lang}><RuleList title={t("Für Event-Rabatte gilt ein globales Prinzip:","A global principle applies to Event Discounts:")} items={L([["nur Server-Owner", "Server Owners only"], ["Rabatt gehört global zum Discord-User", "Discount belongs globally to the Discord User"], ["gilt für Server, auf denen dieser User Owner ist", "applies to servers where this user is Owner"], ["Rabatt kann nur einmal verwendet werden", "Discount can only be used once"], ["entweder Monthly ODER Lifetime", "either Monthly OR Lifetime"], ["nicht für beide Modelle gleichzeitig", "not for both models simultaneously"], ["erfolgreiche Verwendung verbraucht den Rabatt global", "successful usage consumes the discount globally"]])} /><InfoBox lang={lang} type="event" title={t("Beispiel","Example")}>{t("User A besitzt Server 1, Server 2 und Server 3. User A verwendet seinen Event-Rabatt auf Server 1 für einen Monthly-Premium-Kauf. Danach steht derselbe Rabatt auch auf Server 2 und Server 3 nicht mehr zur Verfügung.","User A owns Server 1, Server 2, and Server 3. User A uses their Event Discount on Server 1 for a Monthly Premium purchase. After that, the same discount is no longer available on Server 2 and Server 3.")}</InfoBox></Section>
        <Section id="event-cooldowns" lang={lang}><p>{t("Wenn ein tatsächlich genutzter Event-Vorteil eine Sperre startet, wird ein entsprechender Cooldown im System hinterlegt. Beispielsweise kann das System eine 6-Monats-Sperre vorsehen. Es wird nicht durch das bloße Öffnen von Commands ein Cooldown gestartet, sondern erst durch die tatsächliche Nutzung eines Vorteils.","If an actually used Event benefit starts a lock, a corresponding cooldown is stored in the system. For example, the system may provide a 6-month lock. Opening commands does not start a cooldown; it is only triggered by the actual use of a benefit.")}</p></Section>
        <Section id="sonderregeln-events" lang={lang}><p className="mb-4">{t("Sonderregeln, wie beim Summer End Event, können von der 6-Monats-Prüfung abweichen und stattdessen die bestehende 12-Monats-Premium-Prüfung verwenden, sofern sie im System entsprechend implementiert sind.","Special rules, such as for the Summer End Event, may deviate from the 6-month check and instead use the existing 12-month Premium check, provided they are implemented accordingly in the system.")}</p><p>{t("Solche Abweichungen werden im Bot zum Zeitpunkt des Events kommuniziert.","Such deviations are communicated in the bot at the time of the event.")}</p></Section>
        <Section id="ablauf-events" lang={lang}><p className="mb-4">{t("Nach Ende eines Events sind neue Claims und neue Rabatt-Nutzungen nicht mehr möglich. Ungenutzte Event-Rabatte können verfallen.","After the end of an event, new claims and new discount usages are no longer possible. Unused Event Discounts may expire.")}</p><InfoBox lang={lang} type="warning">{t("Event-Rabatte dürfen nicht dauerhaft nach dem Event verwendbar bleiben. Wenn ein Rabatt am 26.08 endet, darf er beispielsweise am 27.08 nicht mehr verwendet werden.","Event Discounts may not remain usable permanently after the event. If a discount ends on 26.08, it cannot be used on 27.08, for example.")}</InfoBox><p className="mt-4">{t("Bereits ordnungsgemäß erhaltenes Premium besitzt seine eigene Laufzeit und verschwindet nicht automatisch mit dem Event-Ende.","Premium that has already been properly obtained has its own duration and does not automatically disappear when the event ends.")}</p></Section>
        <Section id="verfall-event-vorteile" lang={lang}><p>{t("Alle Vorteile, die bis zum Ende des Events nicht erfolgreich über die entsprechenden Bot-Commands beansprucht wurden, verfallen ersatzlos. Ein nachträglicher Claim ist technisch nicht möglich und wird auch nicht manuell gewährt.","All benefits that have not been successfully claimed via the appropriate Bot Commands by the end of the event expire without replacement. A subsequent claim is technically impossible and will not be granted manually.")}</p></Section>
        <Section id="spooky-deals" lang={lang}><p>{t("Die Spooky Deals sind ein jährliches Event im Zeitraum vom 31.10 bis zum 07.11. In diesem Zeitraum können besondere Rabatte auf Server Premium oder kostenlose Gift-Codes beansprucht werden.","The Spooky Deals are an annual event from 31.10 to 07.11. During this period, special discounts on Server Premium or free Gift Codes can be claimed.")}</p></Section>
        <Section id="christmas-deals" lang={lang}><p>{t("Die Christmas Deals finden jährlich vom 24.12 bis zum 31.12 statt. Angeboten werden in der Regel vergünstigte Lifetime- oder Monthly-Premium-Optionen für Server (in internen Server Credits).","The Christmas Deals take place annually from 24.12 to 31.12. They usually offer discounted Lifetime or Monthly Premium options for servers (in internal Server Credits).")}</p></Section>
        <Section id="anniversary-rewards" lang={lang}><p>{t("Vom 04.01 bis zum 10.01 jährlich finden die Anniversary Rewards statt, mit denen der Geburtstag von KyroX gefeiert wird. Nutzer können hierbei spezielle Event-Gift-Codes beanspruchen.","From 04.01 to 10.01 annually, the Anniversary Rewards take place, celebrating KyroX's birthday. Users can claim special Event Gift Codes.")}</p></Section>
        <Section id="kyrox-day-offers" lang={lang}><p>{t("Am 15.05 bis zum 16.05 jährlich finden die KyroX Day Offers statt. Ein kurzes Event mit stark limitierten Angeboten oder Rabatten.","On 15.05 to 16.05 annually, the KyroX Day Offers take place. A short event with highly limited offers or discounts.")}</p></Section>
        <Section id="summer-end-event" lang={lang}><p>{t("Das Summer End Event läuft vom 19.08 bis zum 26.08. Es besitzt oft Sonderregeln, wie die Nutzung der 12-Monats-Premium-Prüfung statt der regulären 6-Monats-Sperre, und bietet umfangreiche End-of-Summer-Vorteile.","The Summer End Event runs from 19.08 to 26.08. It often features special rules, such as using the 12-month Premium check instead of the regular 6-month lock, and offers extensive End-of-Summer benefits.")}</p></Section>

        <CategoryDivider title={t("SERVER & BOT-FUNKTIONEN","SERVER & BOT FEATURES")} />
        <Section id="moderation-sicherheit" lang={lang}><p className="mb-4">{t("KyroX stellt verschiedene Funktionen zur Moderation und Sicherung von Discord-Servern bereit. Dazu gehören:","KyroX provides various functions for moderating and securing Discord servers. These include:")}</p><RuleList items={L([["Warn", "Warn"], ["Timeout", "Timeout"], ["Mute", "Mute"], ["Kick", "Kick"], ["Ban", "Ban"], ["Anti-Spam", "Anti-Spam"], ["Anti-Raid", "Anti-Raid"], ["Auto-Moderation", "Auto-Moderation"], ["Logging", "Logging"]])} /><p className="mt-4">{t("Automatisierte Systeme können abhängig sein von Discord Permissions, der Rollen-Hierarchie, der Serverkonfiguration, der Discord API und technischen Fehlern. Server-Owner sind für die korrekte Konfiguration verantwortlich.","Automated systems can depend on Discord Permissions, Role Hierarchy, Server Configuration, Discord API, and technical errors. Server Owners are responsible for correct configuration.")}</p></Section>
        <Section id="auto-moderation" lang={lang}><p className="mb-4">{t("Die Auto-Moderation von KyroX erkennt automatisch Verstöße wie Spam, unzulässige Wörter oder massenhaftes Erwähnen von Nutzern und greift konfigurierbar ein.","KyroX's Auto-Moderation automatically detects violations such as spam, disallowed words, or mass mentions of users and intervenes in a configurable manner.")}</p><p>{t("Da automatische Erkennungssysteme fehleranfällig sein können (False Positives), sollte die Auto-Moderation sinnvoll konfiguriert und regelmäßig von den Administratoren überprüft werden.","Since automatic detection systems can be prone to errors (False Positives), Auto-Moderation should be configured sensibly and checked regularly by administrators.")}</p></Section>
        <Section id="ticket-system" lang={lang}><p className="mb-4">{t("KyroX bietet ein vollwertiges Ticket-System für den Support und die Verwaltung auf Discord-Servern. Dazu gehören:","KyroX offers a full-fledged Ticket System for support and management on Discord servers. This includes:")}</p><RuleList items={L([["Ticket-Erstellung über Buttons/Panels", "Ticket creation via Buttons/Panels"], ["Ticket-Kategorien", "Ticket Categories"], ["Team-Zuweisung", "Team Assignment"], ["Ticket-Schließung", "Ticket Closing"], ["Logs", "Logs"], ["Transcripts", "Transcripts"], ["Berechtigungen", "Permissions"]])} /><p className="mt-4">{t("Die Konfiguration obliegt den Server-Ownern und Administratoren.","Configuration is the responsibility of the Server Owners and administrators.")}</p></Section>
        <Section id="ticket-kategorien-zuweisung" lang={lang}><p className="mb-4">{t("Tickets können in verschiedene Kategorien unterteilt werden (z.B. Allgemeiner Support, Bug-Report, Bewerbung). Das Team kann einzelnen Mitgliedern Tickets zuweisen, um Zuständigkeiten klar zu regeln.","Tickets can be divided into different categories (e.g., General Support, Bug Report, Application). The team can assign tickets to individual members to clarify responsibilities.")}</p><p>{t("Dies erfordert eine korrekte Vergabe von Bot-Berechtigungen für die jeweiligen Team-Rollen.","This requires correct allocation of Bot Permissions for the respective team roles.")}</p></Section>
        <Section id="ticket-transcripts" lang={lang}><p className="mb-4">{t("Transcripts dienen der Nachvollziehbarkeit geschlossener Tickets. Je nach Funktion können sie folgende Informationen enthalten:","Transcripts serve to trace closed tickets. Depending on the function, they can contain the following information:")}</p><RuleList items={L([["Nachrichten", "Messages"], ["Nutzernamen", "Usernames"], ["Avatare", "Avatars"], ["Zeitstempel", "Timestamps"], ["Attachments", "Attachments"], ["Embeds", "Embeds"], ["Bot-Nachrichten", "Bot Messages"], ["Components V2 Inhalte", "Components V2 Content"], ["Ticketinformationen", "Ticket Information"]])} /><p className="mt-4">{t("Sie dienen ausschließlich der Dokumentation.","They serve exclusively for documentation.")}</p></Section>
        <Section id="backups" lang={lang}><p className="mb-4">{t("KyroX kann Backups von Discord-Servern erstellen (z. B. Channels, Rollen, Einstellungen). Es wird jedoch keine absolute Garantie für eine vollständige Wiederherstellung übernommen.","KyroX can create backups of Discord servers (e.g., Channels, Roles, Settings). However, no absolute guarantee is given for a complete restoration.")}</p><p>{t("Wiederherstellungen können beispielsweise durch die Discord API, fehlende Berechtigungen, geänderte Discord-Funktionen, inzwischen entfernte Ressourcen oder technische Änderungen beeinflusst werden.","Restorations can be influenced, for example, by the Discord API, missing permissions, changed Discord functions, removed resources, or technical changes.")}</p></Section>
        <Section id="wiederherstellung-backups" lang={lang}><p className="mb-4">{t("Die Wiederherstellung eines Backups überschreibt aktuelle Einstellungen. Es liegt in der Verantwortung des Server-Owners, sicherzustellen, dass das richtige Backup ausgewählt wird.","Restoring a backup overwrites current settings. It is the responsibility of the Server Owner to ensure that the correct backup is selected.")}</p><p>{t("Durch KyroX verursachte Datenverluste infolge fehlgeschlagener Backups werden nicht entschädigt, da der Prozess stark von externen Discord-Faktoren abhängt.","Data loss caused by KyroX as a result of failed backups is not compensated, as the process depends heavily on external Discord factors.")}</p></Section>
        <Section id="automatisierungen" lang={lang}><p className="mb-4">{t("KyroX verfügt über verschiedene automatisierte Systeme. Beispiele hierfür sind:","KyroX has various automated systems. Examples of this are:")}</p><RuleList items={L([["Level System", "Level System"], ["Counting", "Counting"], ["Welcome", "Welcome"], ["Goodbye", "Goodbye"], ["Moderation", "Moderation"], ["Premium-Ablauf", "Premium Expiration"], ["Event-Erkennung", "Event Detection"], ["Rollen", "Roles"], ["Tickets", "Tickets"], ["Logs", "Logs"], ["Backups", "Backups"]])} /><p className="mt-4">{t("Automatisierungen können durch technische Abhängigkeiten wie fehlende Rechte, Bot-Ausfälle, Discord-Ausfälle oder API-Änderungen beeinträchtigt werden.","Automations can be affected by technical dependencies such as missing rights, bot outages, Discord outages, or API changes.")}</p></Section>
        <Section id="logging" lang={lang}><p className="mb-4">{t("KyroX bietet umfangreiche Logging-Funktionen, um Aktivitäten auf dem Discord-Server nachzuverfolgen. Dazu können Moderationsaktionen, Nutzungsänderungen, Ticket-Aktivitäten und weitere serverrelevante Ereignisse protokolliert werden.","KyroX offers extensive logging functions to track activities on the Discord server. This can include moderation actions, role changes, ticket activities, and other server-relevant events.")}</p><p>{t("Die Protokollierung erfordert eine korrekte Konfiguration der Berechtigungen und Ziel-Channels durch die Server-Administration.","Logging requires correct configuration of permissions and target channels by the server administration.")}</p></Section>
        <Section id="level-system" lang={lang}><p className="mb-4">{t("Das Level-System belohnt Nutzer für Aktivität im Chat mit Erfahrungspunkten (XP) und Levels. Es können Rollen-Rewards für bestimmte Level konfiguriert werden.","The Level System rewards users for chat activity with Experience Points (XP) and Levels. Role rewards can be configured for specific levels.")}</p><p>{t("Das systematische Ausnutzen von XP-Farming (z. B. durch Spammen in ignorierten Channels) kann zum Reset des Levels führen.","Systematic exploitation of XP farming (e.g., by spamming in ignored channels) can lead to a level reset.")}</p></Section>
        <Section id="counting" lang={lang}><p className="mb-4">{t("Das Counting-Modul ermöglicht es Nutzern, in einem bestimmten Channel gemeinsam hochzuzählen. Der Bot überprüft dabei, ob die nächste Zahl korrekt ist.","The Counting module allows users to count up together in a specific channel. The bot checks whether the next number is correct.")}</p><p>{t("Falsche Eingaben, Spam oder das Zerstören des Countings können zu Konsequenzen führen, die vom Server-Team konfiguriert werden können.","Incorrect entries, spam, or ruining the counting can lead to consequences that can be configured by the server team.")}</p></Section>
        <Section id="welcome-goodbye" lang={lang}><p className="mb-4">{t("KyroX kann automatisierte Nachrichten senden, wenn ein Nutzer dem Server beitritt (Welcome) oder diesen verlässt (Goodbye). Diese Nachrichten können über Embeds angepasst werden.","KyroX can send automated messages when a user joins the server (Welcome) or leaves it (Goodbye). These messages can be customized via Embeds.")}</p><p>{t("Bei hohen Member-Zu- oder Abgängen kann es zu Verzögerungen kommen, um Discord Rate-Limits nicht zu verletzen.","In the event of high member joins or leaves, there may be delays so as not to violate Discord Rate Limits.")}</p></Section>
        <Section id="embeds-team-verwaltung" lang={lang}><p className="mb-4">{t("KyroX erlaubt das Erstellen und Senden von benutzerdefinierten Embeds. Zudem können über das Team-Modul spezifische Bot-Berechtigungen an Server-Mitglieder zugewiesen werden, ohne ihnen Discord-Administratorrechte geben zu müssen.","KyroX allows the creation and sending of custom Embeds. In addition, the Team module can be used to assign specific Bot Permissions to server members without having to give them Discord administrator rights.")}</p><p>{t("Die Vergabe dieser Rechte liegt beim Server-Owner und sollte mit Bedacht erfolgen.","The granting of these rights lies with the Server Owner and should be done with care.")}</p></Section>

        <CategoryDivider title={t("DATENSCHUTZ","PRIVACY")} />
        <Section id="datenschutz" lang={lang}><p className="mb-4">{t("Informationen zur Verarbeitung personenbezogener und technischer Daten bei der Nutzung des KyroX Discord-Bots. Dieser Bereich erläutert, welche Daten erhoben, zu welchem Zweck sie verwendet und wie sie geschützt werden.","Information on the processing of personal and technical data when using the KyroX Discord bot. This section explains which data is collected, for what purpose it is used, and how it is protected.")}</p><InfoBox lang={lang} type="security" title={t("Wichtig","Important")}>{t("KyroX verarbeitet technische Daten, soweit diese für die Bereitstellung der Bot-Funktionen erforderlich sind. Eine detaillierte Übersicht befindet sich in den nachfolgenden Abschnitten.","KyroX processes technical data insofar as it is necessary for the provision of the bot functions. A detailed overview can be found in the following sections.")}</InfoBox></Section>
        <Section id="verarbeitete-discord-daten" lang={lang}><p className="mb-4">{t("KyroX verarbeitet folgende Kategorien von Discord-Daten, soweit diese für die Funktion erforderlich sind:","KyroX processes the following categories of Discord data insofar as they are necessary for the function:")}</p><RuleList items={L([["Discord User ID", "Discord User ID"], ["Discord Guild ID", "Discord Guild ID"], ["Channel ID", "Channel ID"], ["Role ID", "Role ID"], ["Message ID", "Message ID"], ["Benutzername", "Username"], ["Servername", "Server Name"], ["Avatar (sofern für eine Funktion benötigt)", "Avatar (if required for a function)"], ["Serverinformationen", "Server Information"], ["Server-Konfiguration", "Server Configuration"], ["Premium-Daten", "Premium Data"], ["Server-Credits", "Server Credits"], ["Event-Claims", "Event Claims"], ["Gift-Code-Daten", "Gift Code Data"], ["Ticket-Daten", "Ticket Data"], ["Transcript-Inhalte", "Transcript Content"], ["Logs", "Logs"], ["Backup-Daten", "Backup Data"]])} /></Section>
        <Section id="zwecke-datenverarbeitung" lang={lang}><p className="mb-4">{t("Die Verarbeitung der Daten dient folgenden Zwecken:","The processing of the data serves the following purposes:")}</p><RuleList items={L([["Bereitstellung des Bots", "Provision of the bot"], ["Zuordnung von Nutzern", "Mapping of users"], ["Serverkonfiguration", "Server configuration"], ["Premium-Verwaltung", "Premium management"], ["Credits", "Credits"], ["Events", "Events"], ["Gift Codes", "Gift Codes"], ["Tickets", "Tickets"], ["Transcripts", "Transcripts"], ["Moderation", "Moderation"], ["Sicherheit", "Security"], ["Logging", "Logging"], ["Backups", "Backups"]])} /></Section>
        <Section id="server-konfigurationsdaten" lang={lang}><p className="mb-4">{t("Einstellungen, die von Server-Ownern oder Administratoren in KyroX vorgenommen werden (wie Moderationsregeln, Ticket-Kategorien, Level-Einstellungen etc.), werden gespeichert, um den Bot auf dem Server aufrechtzuerhalten.","Settings made by Server Owners or administrators in KyroX (such as moderation rules, ticket categories, level settings, etc.) are saved to maintain the bot on the server.")}</p><p>{t("Diese Daten sind an die Guild ID gebunden und werden entsprechend der Regelungen zur Beendigung der Nutzung behandelt.","This data is linked to the Guild ID and is treated in accordance with the regulations on termination of use.")}</p></Section>
        <Section id="ticket-transcript-daten" lang={lang}><p className="mb-4">{t("Wenn das Ticket-System genutzt wird, werden relevante Ticket-Informationen und Nachrichteninhalte für Transcripts gespeichert. Dies umfasst Nachrichten, Nutzernamen, Zeitstempel und ggf. Attachments.","When the Ticket System is used, relevant ticket information and message content are saved for transcripts. This includes messages, usernames, timestamps, and, if applicable, attachments.")}</p><p>{t("Diese Daten dienen ausschließlich der Dokumentation und Nachvollziehbarkeit von Support-Anliegen und können von den Server-Administratoren verwaltet werden.","This data serves exclusively to document and trace support requests and can be managed by the server administrators.")}</p></Section>
        <Section id="speicherungen-loeschung" lang={lang}><p className="mb-4">{t("Daten werden gespeichert, solange der entsprechende Dienst auf einem Server aktiv genutzt wird oder KyroX für die Erfüllung der genannten Zwecke benötigt wird.","Data is stored as long as the corresponding service is actively used on a server or as long as KyroX is needed to fulfill the mentioned purposes.")}</p><p className="mb-4">{t("Spezifische Löschfristen werden entsprechend den rechtlichen Anforderungen und den technischen Notwendigkeiten festgelegt. Wenn keine konkrete Frist bekannt ist, gilt die Speicherdauer bis zur Beendigung der Nutzung oder bis zur Geltendmachung eines Löschanspruchs.","Specific deletion deadlines are determined in accordance with legal requirements and technical necessities. If no specific deadline is known, the storage period applies until use is terminated or a deletion claim is asserted.")}</p><InfoBox lang={lang} type="info">{t("Event-Cooldowns sind technische Sperren und keine automatischen Datenschutz-Aufbewahrungsfristen.","Event cooldowns are technical locks and not automatic privacy retention periods.")}</InfoBox></Section>
        <Section id="weitergabe-drittanbieter" lang={lang}><p className="mb-4">{t("KyroX ist abhängig von externen Plattformen wie Discord und deren technischen Diensten. Daten werden an Discord übermittelt, um die Funktionen auszuführen.","KyroX depends on external platforms like Discord and their technical services. Data is transmitted to Discord to execute the functions.")}</p><p>{t("Weitere Drittanbieter (wie Hosting- oder Datenbankanbieter) werden genutzt, um den Dienst bereitzustellen. Es werden keine Daten zu Analysezwecken an unbekannte Dritte weitergegeben.","Other third parties (such as hosting or database providers) are used to provide the service. No data is passed on to unknown third parties for analysis purposes.")}</p></Section>
        <Section id="sicherheit-daten" lang={lang}><p className="mb-4">{t("KyroX bemüht sich, angemessene technische und organisatorische Maßnahmen zu treffen, um die verarbeiteten Daten vor unbefugtem Zugriff, Verlust oder Zerstörung zu schützen.","KyroX endeavors to take appropriate technical and organizational measures to protect the processed data from unauthorized access, loss, or destruction.")}</p><p>{t("Dennoch kann bei internetbasierten Diensten eine absolute Sicherheit nicht garantiert werden.","Nevertheless, absolute security cannot be guaranteed for internet-based services.")}</p></Section>
        <Section id="bot-interne-datenverarbeitung" lang={lang}><p className="mb-4">{t("Zur Gewährleistung schneller Bot-Antworten werden bestimmte Daten (wie User IDs, Premium-Status, Cooldowns) im Arbeitsspeicher (Cache) oder in internen Datenbanken zwischengespeichert.","To ensure fast bot responses, certain data (such as User IDs, Premium status, cooldowns) is cached in the working memory (cache) or in internal databases.")}</p><p>{t("Diese Daten werden nicht an Dritte weitergegeben und dienen ausschließlich der technischen Funktionalität der Commands und Automatisierungen.","This data is not passed on to third parties and serves exclusively the technical functionality of the commands and automations.")}</p></Section>
        <Section id="rechte-datenschutzanfragen" lang={lang}><p className="mb-4">{t("Nutzer haben das Recht, sich über die Verarbeitung ihrer Daten zu informieren und ggf. Auskunft, Berichtigung oder Löschung zu verlangen.","Users have the right to inform themselves about the processing of their data and, if necessary, to demand information, correction, or deletion.")}</p><p className="mb-4">{t("Datenschutzanfragen können über den offiziellen KyroX Discord Support Server gestellt werden. Die Anwendbarkeit spezifischer rechtlicher Ansprüche hängt vom Betreiberland ab.","Privacy requests can be made via the official KyroX Discord Support Server. The applicability of specific legal claims depends on the country of the operator.")}</p><InfoBox lang={lang} type="security">{t("Betreiber: KyroX™ Official", "Operator: KyroX™ Official")}<br/>{t("Datenschutz-Kontakt: Über den offiziellen Discord Support Server", "Privacy Contact: Via the official Discord Support Server")}</InfoBox></Section>

        <CategoryDivider title={t("DIENST & RECHTLICHES","SERVICE & LEGAL")} />
        <Section id="haftung" lang={lang}><p className="mb-4">{t("KyroX ist ein technischer Dienst. Trotz angemessener Sorgfalt können technische Fehler auftreten. Der Dienst ist auf die Verfügbarkeit der Discord-Plattform angewiesen; Ausfälle oder Änderungen durch Discord können den Betrieb beeinflussen.","KyroX is a technical service. Despite reasonable care, technical errors may occur. The service relies on the availability of the Discord platform; outages or changes by Discord can affect operations.")}</p><p className="mb-4">{t("Nutzer sind für die Serverkonfigurationen und die Vergabe von Berechtigungen selbst verantwortlich. Eine vollständige pauschale Haftungsfreistellung wird nicht gewährt, jedoch werden gesetzlich zwingende Haftlungen nicht ausgeschlossen.","Users are responsible for server configurations and the allocation of permissions themselves. A complete general liability exemption is not granted, but legally mandatory liabilities are not excluded.")}</p><RuleList title={t("Haftungsansprüche bestehen insbesondere bei:","Liability claims exist in particular for:")} items={L([["Vorsatz", "Intent"], ["grober Fahrlässigkeit", "Gross negligence"], ["Verletzung von Leben, Körper oder Gesundheit", "Breach of life, body, or health"], ["gesetzlich zwingender Haftung", "Legally mandatory liability"]])} /></Section>
        <Section id="beendigung-aenderungen-richtlinien" lang={lang}><p className="mb-4">{t("Nutzer können die Nutzung von KyroX jederzeit beenden. Server-Owner können KyroX von ihrem Server entfernen. Die Behandlung gespeicherter Daten richtet sich nach den Datenschutzbestimmungen. Spezifische Löschfristen werden nicht zugesichert, sofern keine rechtlichen Notwendigkeiten bestehen.","Users can stop using KyroX at any time. Server Owners can remove KyroX from their server. The handling of stored data is governed by privacy regulations. Specific deletion deadlines are not guaranteed unless legally required.")}</p><p>{t("Diese Richtlinien können aktualisiert werden, wenn sich beispielsweise KyroX Funktionen, technische Systeme, Sicherheitsanforderungen oder rechtliche Anforderungen ändern. Das Aktualisierungsdatum ist oben auf der Seite sichtbar. Bei wichtigen Änderungen kann eine angemessene Information der Nutzer über verfügbare Kommunikationswege erfolgen.","These policies may be updated if, for example, KyroX functions, technical systems, security requirements, or legal requirements change. The update date is visible at the top of the page. In the event of important changes, reasonable information may be provided to users via available communication channels.")}</p></Section>
        <Section id="kontakt-support" lang={lang}><div className="bg-[#0A0E15] border border-white/[0.07] rounded-[12px] p-4 flex items-center gap-3"><MessageSquare className="text-[#10B981]"/><div><p className="text-sm font-semibold text-[#F1F5F9]">KyroX Support</p><p className="text-xs text-[#718096]">discord.gg/JFaDGaFkk5</p></div><a href="https://discord.gg/JFaDGaFkk5" target="_blank" className="ml-auto"><ExternalLink size={16}/></a></div></Section>

        <CategoryDivider title={t("KOSTENLOSER SERVICE & PREMIUM","FREE SERVICE & PREMIUM")} />
        <Section id="kostenloser-dienst" lang={lang}><p className="mb-4">{t("KyroX wird grundsätzlich kostenlos bereitgestellt. Für die Nutzung des Bots wird kein allgemeiner Mitgliedsbeitrag verlangt. KyroX verlangt aktuell kein echtes Geld für interne Premium-Funktionen oder Server Credits.","KyroX is basically provided free of charge. No general membership fee is required to use the bot. KyroX currently does not charge real money for internal Premium functions or Server Credits.")}</p><p>{t("Premium bedeutet innerhalb von KyroX eine zusätzliche interne Funktionsstufe und nicht automatisch ein kostenpflichtiges Produkt.","Within KyroX, Premium means an additional internal functional level and not automatically a paid product.")}</p></Section>
        <Section id="keine-echtgeld-abonnements" lang={lang}><p className="mb-4">{t("Monthly Premium bezeichnet eine zeitlich begrenzte Premium-Laufzeit innerhalb von KyroX. Der Begriff 'Monthly' bedeutet NICHT automatisch:","Monthly Premium refers to a time-limited Premium duration within KyroX. The term 'Monthly' does NOT automatically mean:")}</p><RuleList items={L([["kostenpflichtiges Abonnement", "paid subscription"], ["automatische Abbuchung", "automatic deduction"], ["monatliche Geldzahlung", "monthly money payment"], ["Vertrag mit wiederkehrender Zahlung", "contract with recurring payment"]])} /><p className="mt-4">{t("KyroX verlangt dafür aktuell kein echtes Geld.","KyroX currently does not charge real money for this.")}</p></Section>
        <Section id="lifetime-premium" lang={lang}><p className="mb-4">{t("Lifetime Premium bezeichnet eine Premium-Stufe ohne reguläres zeitliches Ablaufdatum innerhalb des KyroX-Systems. Es wird dafür aktuell kein echtes Geld verlangt.","Lifetime Premium refers to a Premium tier without a regular time-based expiration date within the KyroX system. No real money is currently charged for this.")}</p><p>{t("'Lifetime' bedeutet die Laufzeit des jeweiligen KyroX-Premiumstatus und ist keine Garantie dafür, dass der gesamte KyroX-Dienst unbegrenzt für immer betrieben wird.","'Lifetime' means the duration of the respective KyroX Premium status and is not a guarantee that the entire KyroX service will be operated indefinitely forever.")}</p></Section>
        <Section id="server-credits-ohne-echtgeldwert" lang={lang}><RuleList title={t("Server Credits:", "Server Credits:")} items={L([["werden innerhalb von KyroX genutzt", "are used within KyroX"], ["besitzen keinen garantierten Echtgeldwert", "have no guaranteed real money value"], ["können nicht als Geld ausgezahlt werden", "cannot be paid out as money"], ["stellen keine Kryptowährung dar", "do not represent a cryptocurrency"], ["stellen kein Bankguthaben dar", "do not represent bank credit"], ["stellen kein gesetzliches Zahlungsmittel dar", "do not represent legal tender"]])} /><p className="mt-4">{t("KyroX verkauft Server Credits aktuell nicht gegen echtes Geld.","KyroX currently does not sell Server Credits for real money.")}</p></Section>
        <Section id="kein-handel-credits" lang={lang}><p className="mb-4">{t("Der inoffizielle Handel mit Server Credits ist untersagt. Nutzer dürfen Server Credits nicht:","Unofficial trading of Server Credits is prohibited. Users may not:")}</p><RuleList items={L([["gegen echtes Geld verkaufen", "sell for real money"], ["gegen externe Güter tauschen", "trade for external goods"], ["über Drittanbieter-Marktplätze anbieten", "offer via third-party marketplaces"], ["gegen andere digitale Werte handeln", "trade for other digital values"]])} /><p className="mt-4">{t("Dies gilt, sofern KyroX dafür keine offizielle Funktion vorsieht.","This applies unless KyroX provides an official function for this.")}</p></Section>
        <Section id="kein-verkauf-premium" lang={lang}><p className="mb-4">{t("User dürfen KyroX Premium nicht eigenständig gegen echtes Geld verkaufen. Untersagt sind beispielsweise:","Users may not independently sell KyroX Premium for real money. Prohibited examples include:")}</p><RuleList items={L([["Verkauf eines Premium-Status", "Sale of a Premium status"], ["Verkauf von Premium-Gift-Codes", "Sale of Premium Gift Codes"], ["Verkauf von Event-Vorteilen", "Sale of Event benefits"], ["Verkauf von Event-Rabatten", "Sale of Event discounts"]])} /><p className="mt-4">{t("Dies gilt, wenn KyroX hierfür keine offizielle Funktion bereitstellt.","This applies if KyroX does not provide an official function for this.")}</p></Section>
        <Section id="keine-automatischen-zahlungen" lang={lang}><p>{t("KyroX führt aktuell keine automatischen Echtgeld-Abbuchungen durch. Monthly Premium verlängert sich nicht automatisch über eine Geldzahlung. Keine Kreditkarten oder Bankdaten erforderlich.","KyroX currently does not make automatic real money deductions. Monthly Premium does not renew automatically via a money payment. No credit cards or bank details required.")}</p></Section>
        <Section id="keine-zahlungsdaten" lang={lang}><p className="mb-4">{t("Da KyroX aktuell keine Echtgeldzahlungen anbietet, benötigt KyroX für seine Premium- und Credits-Funktionen grundsätzlich keine Zahlungsdaten wie:","Since KyroX currently does not offer real money payments, KyroX generally does not require payment data for its Premium and Credits functions, such as:")}</p><RuleList items={L([["Kreditkartennummer", "Credit card number"], ["Bankkonto", "Bank account"], ["PayPal-Konto", "PayPal account"], ["Rechnungsadresse", "Billing address"]])} /><p className="mt-4">{t("Es wird nicht behauptet, dass solche Daten verarbeitet werden.","It is not claimed that such data is processed.")}</p></Section>
        <Section id="premium-internes-vorteilssystem" lang={lang}><p className="mb-4">{t("Premium ist ein internes KyroX-System für zusätzliche Funktionen oder Berechtigungen. Premium kann beispielsweise vergeben werden durch:","Premium is an internal KyroX system for additional functions or permissions. Premium can be awarded, for example, through:")}</p><RuleList items={L([["Gift-Codes", "Gift Codes"], ["Events", "Events"], ["interne KyroX-Funktionen", "internal KyroX functions"], ["berechtigte Administrationsvorgänge", "authorized administrative actions"]])} /><p className="mt-4">{t("Keine Echtgeld-Beziehung daraus ableiten.","No real money relationship should be derived from this.")}</p></Section>
        <Section id="premium-status" lang={lang}><p className="mb-4">{t("Ein Premium-Status kann technisch gespeichert werden mit:","A Premium status can be technically saved with:")}</p><RuleList items={L([["Nutzerzuordnung", "User mapping"], ["Typ", "Type"], ["Aktivierungszeit", "Activation time"], ["Ablaufzeit", "Expiration time"], ["Quelle", "Source"]])} /><p className="mt-4">{t("Nur tatsächlich verwendete Daten werden beschrieben.","Only actually used data is described.")}</p></Section>
        <Section id="premium-verlaengerung" lang={lang}><p>{t("Temporäres Premium kann durch legitime KyroX-Funktionen verlängert werden. Eine Verlängerung muss die vorhandenen Limits berücksichtigen. Manipulative oder technische Umgehungen sind untersagt.","Temporary Premium can be extended through legitimate KyroX functions. An extension must take existing limits into account. Manipulative or technical bypasses are prohibited.")}</p></Section>
        <Section id="12-monats-premium-grenze" lang={lang}><p>{t("Wenn das bestehende Gift-System maximal 12 Monate temporäres Premium vorsieht, gilt diese Begrenzung. Ein Gift-Code oder Event-Gift darf diese Grenze nicht technisch umgehen. Lifetime Premium davon getrennt behandeln.","If the existing Gift system allows a maximum of 12 months of temporary Premium, this limit applies. A Gift Code or Event Gift may not technically bypass this limit. Lifetime Premium is treated separately.")}</p></Section>

        <CategoryDivider title="GIFTS" />
        <Section id="premium-gift-erstellung" lang={lang}><p>{t("KyroX kann Premium-Gifts erzeugen. Je nach System können diese personalisiert, zeitlich begrenzt und einmalig einlösbar sein.","KyroX can generate Premium Gifts. Depending on the system, these can be personalized, time-limited, and redeemable once.")}</p></Section>
        <Section id="premium-gift-einloesung" lang={lang}><p>{t("Ein gültiger Gift-Code kann nur über die vorgesehenen KyroX-Funktionen eingelöst werden. Manipulierte oder manuell veränderte Codes sind ungültig.","A valid Gift Code can only be redeemed via the designated KyroX functions. Manipulated or manually altered codes are invalid.")}</p></Section>
        <Section id="gift-code-bindung" lang={lang}><p>{t("Wenn ein Gift-Code einem User zugeordnet ist, darf nur dieser User ihn einlösen. Keine Übertragung an andere Nutzer, sofern das System dies nicht vorsieht.","If a Gift Code is assigned to a user, only this user may redeem it. No transfer to other users unless the system provides for this.")}</p></Section>
        <Section id="verbrauchte-gift-codes" lang={lang}><p>{t("Ein erfolgreich eingelöster Gift-Code gilt als verwendet. Er darf nicht erneut eingesetzt werden.","A successfully redeemed Gift Code is considered used. It cannot be used again.")}</p></Section>
        <Section id="ungueltige-gift-codes" lang={lang}><p className="mb-4">{t("KyroX kann Codes ablehnen, wenn sie:","KyroX can reject codes if they:")}</p><RuleList items={L([["nicht existieren", "do not exist"], ["bereits verwendet wurden", "have already been used"], ["abgelaufen sind", "have expired"], ["einem anderen User gehören", "belong to another user"], ["technisch ungültig sind", "are technically invalid"]])} /></Section>
        <Section id="gift-code-missbrauch" lang={lang}><p className="mb-4">{t("Untersagt sind:","The following are prohibited:")}</p><RuleList items={L([["Brute-Force-Versuche", "Brute-force attempts"], ["automatisiertes Raten von Codes", "automated guessing of codes"], ["massenhafte Redemption-Versuche", "mass redemption attempts"], ["Manipulation von Code-Daten", "Manipulation of code data"], ["Weitergabe personenbezogener Codes", "Sharing of personalized codes"]])} /></Section>
        <Section id="event-gift-codes-detail" lang={lang}><p>{t("Event-Premium kann über einen Gift-Code bereitgestellt werden. Der Code wird innerhalb des Event-Zeitraums beansprucht. Das Premium wird erst durch das normale Gift-System aktiviert.","Event Premium can be provided via a Gift Code. The code is claimed within the Event period. The Premium is only activated by the normal Gift system.")}</p></Section>
        <Section id="event-gift-event-ende" lang={lang}><p>{t("Wenn ein Event-Gift-Code erfolgreich erzeugt wurde, bedeutet das Event-Ende nicht automatisch, dass bereits erzeugtes Premium sofort verschwindet. Die weitere Gültigkeit richtet sich nach der Gift-Code-Logik.","If an Event Gift Code has been successfully generated, the end of the event does not automatically mean that the Premium already generated disappears immediately. Further validity depends on the Gift Code logic.")}</p></Section>

        <CategoryDivider title={t("EVENTS & RABATTE","EVENTS & DISCOUNTS")} />
        <Section id="event-belohnungen" lang={lang}><p>{t("Event-Belohnungen sind freiwillige KyroX-Vorteile. Es besteht kein allgemeiner Anspruch darauf, dass jedes Event wiederholt wird, jedes Event dieselben Vorteile besitzt, oder jeder Nutzer jede Belohnung erhält.","Event Rewards are voluntary KyroX benefits. There is no general claim that every event will be repeated, that every event has the same benefits, or that every user receives every reward.")}</p></Section>
        <Section id="event-zeitraeume" lang={lang}><p>{t("Event-Vorteile sind nur in den jeweils angezeigten Zeiträumen verfügbar. Außerhalb des Zeitraums können Claims, Rabatte und neue Event-Gifts deaktiviert sein.","Event benefits are only available in the respectively displayed periods. Outside the period, claims, discounts, and new Event Gifts can be deactivated.")}</p></Section>
        <Section id="event-rabatte-ohne-echtgeld" lang={lang}><p>{t("Der Begriff 'Rabatt' bezieht sich bei KyroX auf interne Server-Credits. Beispiel: 35 % Rabatt bedeutet: weniger Server Credits erforderlich. NICHT: 35 % Rabatt auf einen Echtgeldpreis.","The term 'discount' at KyroX refers to internal Server Credits. Example: 35% discount means: fewer Server Credits required. NOT: 35% discount on a real money price.")}</p></Section>
        <Section id="monthly-event-rabatt" lang={lang}><p>{t("Ein Event kann die erforderlichen Server Credits für Monthly Server Premium reduzieren. Dies ist eine interne KyroX-Funktion.","An event can reduce the required Server Credits for Monthly Server Premium. This is an internal KyroX function.")}</p></Section>
        <Section id="lifetime-event-rabatt" lang={lang}><p>{t("Dasselbe gilt für Lifetime. Rabatt reduziert ausschließlich interne Credits. Kein Echtgeldbezug.","The same applies to Lifetime. Discount exclusively reduces internal Credits. No real money connection.")}</p></Section>
        <Section id="einmalige-rabattnutzung" lang={lang}><p>{t("Ein beanspruchter Event-Rabatt kann nur einmal verwendet werden. Entweder Monthly ODER Lifetime.","A claimed Event Discount can only be used once. Either Monthly OR Lifetime.")}</p></Section>
        <Section id="globaler-event-rabatt" lang={lang}><p>{t("Wenn ein User Owner mehrerer Server ist und den Rabatt auf einem verwendet, ist er auf den anderen Servern ebenfalls verbraucht (User-globales Prinzip).","If a user is Owner of multiple servers and uses the discount on one, it is also consumed on the other servers (User-global principle).")}</p></Section>
        <Section id="rabatt-claim" lang={lang}><p>{t("Der Rabatt muss zuerst bewusst über die vorgesehene KyroX-Funktion beansprucht werden. Er wird nicht automatisch aktiviert, sofern das bestehende System das so vorsieht.","The discount must first be consciously claimed via the designated KyroX function. It is not activated automatically, provided the existing system provides for this.")}</p></Section>
        <Section id="rabatt-aktivierung" lang={lang}><p>{t("Nach Claim kann ein Rabatt als beansprucht, aktiv und noch nicht verwendet gespeichert werden.","After claiming, a discount can be saved as claimed, active, and not yet used.")}</p></Section>
        <Section id="rabatt-verbrauch" lang={lang}><p>{t("Der Rabatt gilt erst dann als verbraucht, wenn eine gültige rabattierte Premium-Aktion erfolgreich abgeschlossen wurde.","The discount is only considered consumed when a valid discounted Premium action has been successfully completed.")}</p></Section>
        <Section id="rabatt-bei-fehler" lang={lang}><p>{t("Wenn eine Aktion technisch fehlschlägt, soll ein Rabatt nicht als verbraucht gelten, sofern die eigentliche Premium-Aktivierung nicht erfolgreich war.","If an action fails technically, a discount should not be considered consumed, provided the actual Premium activation was not successful.")}</p></Section>
        <Section id="rabatt-ablauf" lang={lang}><p>{t("Ein nicht verwendeter Rabatt verfällt mit Ende des Events, wenn dies der bestehenden Event-Logik entspricht.","An unused discount expires at the end of the event if this corresponds to the existing event logic.")}</p></Section>
        <Section id="event-cooldown-detail" lang={lang}><p>{t("Bestimmte Event-Vorteile können eine 6-Monats-Sperre auslösen. Die Sperre betrifft Event-Vorteile, nicht normale Bot-Nutzung.","Certain Event benefits can trigger a 6-month lock. The lock affects Event benefits, not normal bot usage.")}</p></Section>
        <Section id="cooldown-startpunkt" lang={lang}><p>{t("Wenn technisch so vorgesehen, startet der Cooldown erst nach erfolgreicher Nutzung eines Event-Vorteils. Nicht bereits beim Öffnen von /premium.","If technically provided, the cooldown starts only after successful use of an Event benefit. Not already when opening /premium.")}</p></Section>
        <Section id="summer-end-event-detail" lang={lang}><InfoBox lang={lang} type="event" title="Summer End Event">{t("Summer End Event (19.08 bis 26.08). Mögliche Vorteile: 1 Monat Premium Gift, 35 % Rabatt auf Monthly in Server Credits, 15 % Rabatt auf Lifetime in Server Credits. Kein Echtgeld.","Summer End Event (19.08 to 26.08). Possible benefits: 1 month Premium Gift, 35% discount on Monthly in Server Credits, 15% discount on Lifetime in Server Credits. No real money.")}</InfoBox></Section>
        <Section id="summer-end-sonderregel" lang={lang}><p>{t("Wenn vorgesehen: Beim kostenlosen Summer-End-Premium gilt keine normale 6-Monats-Prüfung. Stattdessen greift die bestehende 12-Monats-Premium-Prüfung des Gift-Systems.","If provided: The free Summer End Premium does not require the normal 6-month check. Instead, the existing 12-month Premium check of the Gift system applies.")}</p></Section>
        <Section id="spooky-deals-detail" lang={lang}><InfoBox lang={lang} type="event" title="Spooky Deals">{t("31.10 bis 07.11. 1 Monat Premium. Monthly Credit-Rabatt 40 %. Lifetime Credit-Rabatt 25 %. Nur wenn diese Werte weiterhin aktuell sind.","31.10 to 07.11. 1 month Premium. Monthly Credit discount 40%. Lifetime Credit discount 25%. Only if these values are still current.")}</InfoBox></Section>
        <Section id="christmas-deals-detail" lang={lang}><InfoBox lang={lang} type="event" title="Christmas Deals">{t("24.12 bis 31.12. 3 Monate Premium. Monthly Credit-Rabatt 50 %. Lifetime Credit-Rabatt 35 %.","24.12 to 31.12. 3 months Premium. Monthly Credit discount 50%. Lifetime Credit discount 35%.")}</InfoBox></Section>
        <Section id="anniversary-rewards-detail" lang={lang}><InfoBox lang={lang} type="event" title="Anniversary Rewards">{t("04.01 bis 10.01. 3 Monate Premium. Monthly Credit-Rabatt 50 %. Lifetime Credit-Rabatt 30 %.","04.01 to 10.01. 3 months Premium. Monthly Credit discount 50%. Lifetime Credit discount 30%.")}</InfoBox></Section>
        <Section id="kyrox-day-offers-detail" lang={lang}><InfoBox lang={lang} type="event" title="KyroX Day Offers">{t("15.05 bis 16.05. 4 Monate Premium. Monthly Credit-Rabatt 35 %. Lifetime Credit-Rabatt 15 %.","15.05 to 16.05. 4 months Premium. Monthly Credit discount 35%. Lifetime Credit discount 15%.")}</InfoBox></Section>
        <Section id="kein-anspruch-event-wiederholung" lang={lang}><p>{t("Auch wenn Events jährlich geplant sind: Keine rechtliche Garantie, dass jedes Event dauerhaft jedes Jahr stattfinden muss. KyroX kann Event-Pläne ändern.","Even if events are planned annually: No legal guarantee that every event must take place permanently every year. KyroX can change event plans.")}</p></Section>

        <CategoryDivider title={t("SERVER-OWNER & CREDITS","SERVER-OWNER & CREDITS")} />
        <Section id="server-owner-pruefung" lang={lang}><p>{t("Server-Premium-Funktionen können an den tatsächlichen Discord-Server-Owner gebunden sein. Berechtigungen werden anhand der Discord-Serverdaten geprüft.","Server Premium functions can be tied to the actual Discord Server Owner. Permissions are checked based on the Discord server data.")}</p></Section>
        <Section id="owner-wechsel" lang={lang}><p>{t("Wenn ein Server den Owner wechselt, können bestimmte Owner-spezifische Funktionen danach nur dem neuen Server-Owner zur Verfügung stehen.","If a server changes owners, certain Owner-specific functions may then only be available to the new Server Owner.")}</p></Section>
        <Section id="admin-nicht-owner" lang={lang}><p>{t("Die Administrator-Berechtigung ist nicht automatisch gleichbedeutend mit dem Server-Owner-Status. Owner-exklusive Funktionen können weiterhin ausschließlich dem eigentlichen Owner vorbehalten sein.","Administrator permission is not automatically synonymous with Server Owner status. Owner-exclusive functions can still be reserved exclusively for the actual Owner.")}</p></Section>
        <Section id="server-premium-zuordnung" lang={lang}><p>{t("Server Premium ist grundsätzlich einem bestimmten Server zugeordnet. Nicht automatisch auf andere Server übertragbar.","Server Premium is basically assigned to a specific server. Not automatically transferable to other servers.")}</p></Section>
        <Section id="server-credits-zuordnung" lang={lang}><p>{t("Server Credits sind grundsätzlich serverbezogen. Credits von Server A sind nicht automatisch Credits von Server B.","Server Credits are basically server-related. Credits from Server A are not automatically Credits from Server B.")}</p></Section>
        <Section id="credit-aktionen" lang={lang}><p>{t("KyroX kann interne Aktionen bereitstellen, die Server Credits hinzufügen, entfernen, verwenden und protokollieren. Nur vorgesehene Funktionen nutzen.","KyroX can provide internal actions that add, remove, use, and log Server Credits. Only use designated functions.")}</p></Section>
        <Section id="credit-fehlerkorrektur" lang={lang}><p>{t("Wenn Credits durch einen eindeutigen technischen Fehler falsch berechnet wurden, kann der Zustand sachgerecht korrigiert werden.","If Credits were calculated incorrectly due to a clear technical error, the state can be properly corrected.")}</p></Section>
        <Section id="keine-auszahlung" lang={lang}><p>{t("Server Credits können nicht in echtes Geld ausgezahlt werden.","Server Credits cannot be paid out in real money.")}</p></Section>
        <Section id="keine-uebertragung" lang={lang}><p>{t("Credits dürfen nicht zwischen Servern oder Nutzern übertragen werden, sofern KyroX keine ausdrückliche Funktion dafür bereitstellt.","Credits may not be transferred between servers or users unless KyroX provides an explicit function for this.")}</p></Section>

        <CategoryDivider title={t("PREMIUM-TECHNIK","PREMIUM TECHNOLOGY")} />
        <Section id="premium-ohne-echtgeldwert" lang={lang}><p>{t("Premium hat keinen garantierten Echtgeldwert. Premium darf nicht als finanzielle Anlage, Guthaben oder Eigentumswert behandelt werden.","Premium has no guaranteed real money value. Premium may not be treated as a financial investment, credit, or property value.")}</p></Section>
        <Section id="kostenlose-funktionen-aenderung" lang={lang}><p>{t("Da KyroX kostenlos bereitgestellt wird, kann der Umfang kostenloser Funktionen weiterentwickelt werden. Keine Garantie, dass jede Funktion unverändert bestehen bleibt.","Since KyroX is provided free of charge, the scope of free functions can be further developed. No guarantee that every function will remain unchanged.")}</p></Section>
        <Section id="keine-garantierte-premium-funktion" lang={lang}><p>{t("Ein Premium-Status kann zusätzliche Funktionen freischalten. Nicht garantieren, dass jede einzelne Premium-Funktion dauerhaft unverändert besteht.","A Premium status can unlock additional functions. It is not guaranteed that every single Premium function will remain permanently unchanged.")}</p></Section>
        <Section id="technische-premium-ausfaelle" lang={lang}><p>{t("Wenn ein Premium-Status technisch vorübergehend nicht korrekt erkannt wird, kann dies als technischer Fehler behandelt und geprüft werden.","If a Premium status is temporarily not recognized correctly technically, this can be treated as a technical error and examined.")}</p></Section>
        <Section id="premium-ablauf-detail" lang={lang}><p>{t("Temporäres Premium endet automatisch nach dem gespeicherten Ablaufdatum.","Temporary Premium ends automatically after the stored expiration date.")}</p></Section>
        <Section id="lifetime-ohne-expiresat" lang={lang}><p>{t("Lifetime Premium besitzt grundsätzlich kein reguläres Ablaufdatum, sofern dies der aktuellen KyroX-Logik entspricht.","Lifetime Premium basically has no regular expiration date, provided this corresponds to the current KyroX logic.")}</p></Section>
        <Section id="kein-automatisches-credit-abo" lang={lang}><p>{t("Auch bei Monthly Premium erfolgt keine automatische wiederkehrende Credits-Abbuchung, sofern ein solches System nicht ausdrücklich existiert.","Even with Monthly Premium, there is no automatic recurring Credit deduction unless such a system explicitly exists.")}</p></Section>
        <Section id="manuelle-premium-aktivierung" lang={lang}><p>{t("Premium kann nur über vorgesehene KyroX-Funktionen aktiviert werden.","Premium can only be activated via designated KyroX functions.")}</p></Section>
        <Section id="keine-premium-selbstmanipulation" lang={lang}><p>{t("Nutzer dürfen nicht versuchen, lokale Dateien, Requests oder Interactions so zu manipulieren, dass Premium unberechtigt aktiviert wird.","Users may not attempt to manipulate local files, requests, or interactions in such a way that Premium is activated unauthorized.")}</p></Section>
        <Section id="premium-rollen" lang={lang}><p>{t("Falls Premium mit Discord-Rollen verbunden ist, können die Rollen von Bot-Berechtigungen und Server-Konfiguration abhängen.","If Premium is linked to Discord Roles, the roles can depend on Bot Permissions and Server Configuration.")}</p></Section>

        <CategoryDivider title={t("ROLLEN & SERVERKONFIGURATION","ROLES & SERVER CONFIG")} />
        <Section id="rollen-hierarchie-detail" lang={lang}><p>{t("KyroX kann Rollen nur verwalten, wenn seine eigene Bot-Rolle technisch hoch genug positioniert ist.","KyroX can only manage roles if its own Bot Role is positioned high enough technically.")}</p></Section>
        <Section id="geloeschte-rollen" lang={lang}><p>{t("Wird eine konfigurierte Rolle gelöscht, kann die zugehörige KyroX-Funktion nicht mehr korrekt arbeiten, bis sie neu konfiguriert wird.","If a configured role is deleted, the associated KyroX function can no longer work correctly until it is reconfigured.")}</p></Section>
        <Section id="geloeschte-channels" lang={lang}><p>{t("Dasselbe gilt für konfigurierte Channels. Wird ein Channel gelöscht, können Logs, Tickets oder Welcome-Nachrichten nicht mehr gesendet werden.","The same applies to configured channels. If a channel is deleted, logs, tickets, or welcome messages can no longer be sent.")}</p></Section>
        <Section id="server-loeschung-bot-entfernung" lang={lang}><p>{t("Wenn KyroX von einem Server entfernt wird, stehen Bot-Funktionen dort nicht mehr zur Verfügung.","If KyroX is removed from a server, Bot functions are no longer available there.")}</p></Section>
        <Section id="erneutes-hinzufuegen" lang={lang}><p>{t("Wird KyroX später erneut hinzugefügt, können abhängig von der Speicherung bestehende Konfigurationen noch vorhanden oder neu einzurichten sein. Keine Garantie, sofern Speicherverhalten nicht eindeutig ist.","If KyroX is added again later, existing configurations may still be present or need to be set up again depending on the storage. No guarantee unless storage behavior is clear.")}</p></Section>

        <CategoryDivider title={t("VERFÜGBARKEIT & DISCORD","AVAILABILITY & DISCORD")} />
        <Section id="discord-ausfaelle" lang={lang}><p>{t("KyroX ist technisch von Discord abhängig. Bei Discord-Störungen können Funktionen eingeschränkt sein.","KyroX is technically dependent on Discord. In the event of Discord disruptions, functions may be restricted.")}</p></Section>
        <Section id="discord-api-aenderungen" lang={lang}><p>{t("Änderungen an Discord APIs können Anpassungen an KyroX notwendig machen.","Changes to Discord APIs may make adjustments to KyroX necessary.")}</p></Section>
        <Section id="bot-restarts" lang={lang}><p>{t("Bei Wartung oder technischen Neustarts kann KyroX kurzzeitig nicht verfügbar sein.","During maintenance or technical restarts, KyroX may be temporarily unavailable.")}</p></Section>
        <Section id="wartungsarbeiten" lang={lang}><p>{t("KyroX darf technische Wartung durchführen.","KyroX may carry out technical maintenance.")}</p></Section>
        <Section id="sicherheitsabschaltungen" lang={lang}><p>{t("Bei Sicherheitsproblemen können bestimmte Funktionen vorübergehend deaktiviert werden.","In the event of security problems, certain functions can be temporarily deactivated.")}</p></Section>
        <Section id="missbrauchsschutz" lang={lang}><p className="mb-4">{t("KyroX kann technische Schutzmaßnahmen verwenden gegen:","KyroX can use technical protective measures against:")}</p><RuleList items={L([["Spam", "Spam"], ["Flooding", "Flooding"], ["Exploit-Versuche", "Exploit attempts"], ["massenhafte Interactions", "mass Interactions"], ["unberechtigte Nutzung", "unauthorized use"]])} /></Section>
        <Section id="fehlermeldungen" lang={lang}><p>{t("Technische Fehlermeldungen dienen der Diagnose. Nutzer sollen sensible interne Informationen nicht gezielt ausnutzen.","Technical error messages serve diagnosis. Users should not intentionally exploit sensitive internal information.")}</p></Section>

        <CategoryDivider title={t("SUPPORT & ABSCHLUSS","SUPPORT & CONCLUSION")} />
        <Section id="support-detail" lang={lang}><div className="bg-[#0A0E15] border border-white/[0.07] rounded-[16px] p-6 flex items-center gap-4"><div className="w-12 h-12 rounded-[12px] bg-[rgba(16, 185, 129,0.10)] border border-[rgba(16, 185, 129,0.20)] flex items-center justify-center"><Headphones className="text-[#10B981]"/></div><div><p className="font-bold text-[#F1F5F9]">KyroX Support & Community</p><p className="text-sm text-[#718096]">discord.gg/JFaDGaFkk5</p></div><a href="https://discord.gg/JFaDGaFkk5" target="_blank" className="ml-auto w-9 h-9 rounded-full bg-[#141D2B] border border-white/[0.07] flex items-center justify-center"><ExternalLink size={14}/></a></div></Section>
        <Section id="betreiber" lang={lang}><div className="inline-flex flex-col bg-[#141D2B] border border-white/[0.07] rounded-[12px] px-5 py-3"><span className="text-[10px] tracking-widest uppercase text-[#718096]">{t("Betreiber","Operator")}</span><span className="font-bold text-[#F1F5F9]">KyroX™ Official</span></div></Section>
        <Section id="abschliessende-grundregel" lang={lang}><p className="mb-4">{t("KyroX ist ein kostenloser Discord-Service. Die angebotenen Premium-, Credits-, Gift- und Event-Systeme sind interne Funktionen von KyroX und stellen keine Echtgeld-Produkte dar.","KyroX is a free Discord service. The offered Premium, Credits, Gift, and Event systems are internal functions of KyroX and do not represent real money products.")}</p><p className="mb-4">{t("Nutzer verpflichten sich, KyroX ausschließlich über die vorgesehenen Funktionen und im Rahmen dieser Richtlinien zu verwenden. Missbrauch, Manipulation oder die Umgehung technischer Begrenzungen ist nicht gestattet.","Users undertake to use KyroX exclusively via the designated functions and within the framework of these policies. Abuse, manipulation, or the circumvention of technical limits is not permitted.")}</p><p className="mb-4">{t("Bei Fragen steht der offizielle KyroX Support zur Verfügung: https://discord.gg/JFaDGaFkk5","If you have questions, the official KyroX Support is available: https://discord.gg/JFaDGaFkk5")}</p><p className="font-semibold text-[#F1F5F9]">{t("Betreiber: KyroX™ Official", "Operator: KyroX™ Official")}</p></Section>
      </div>
    </>
  );
}

function CategoryDivider({ title }) {
  return (
    <div className="pt-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-5 bg-[#10B981] rounded-full"></div>
        <h2 className="text-[13px] font-extrabold tracking-[0.2em] uppercase text-[#10B981]">{title}</h2>
      </div>
      <div className="h-px bg-white/[0.07] w-full"></div>
    </div>
  );
}

function Section({ id, lang, children }) {
  const [copied, setCopied] = useState(false);
  const data = useMemo(() => {
    let idx = 0;
    for (const cat of TOC_CATEGORIES) {
      const f = cat.items.findIndex(x => x.id === id);
      if (f !== -1) return { cat, item: cat.items[f], globalIdx: idx + f + 1 };
      idx += cat.items.length;
    }
    return null;
  }, [id]);
  
  if (!data) return null;
  const { cat, item, globalIdx } = data;
  const t = (de, en) => (lang === "de" ? de : en);

  const copy = () => {
    navigator.clipboard.writeText(`${location.origin}${location.pathname}#${id}`);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id={id} className="scroll-mt-[100px] group relative">
      <div className="flex items-start gap-5">
        {/* Editorial Left Column */}
        <div className="hidden md:flex flex-col items-end w-[60px] shrink-0 pt-2 text-right">
          <span className="text-[40px] font-black leading-none tracking-tighter text-[#141D2B] group-hover:text-[#10B981]/20 transition-colors">{item.num}</span>
          <span className="text-[9px] font-bold tracking-widest uppercase text-white/[0.07] mt-2 group-hover:text-[#718096] transition-colors">{t(cat.title_de, cat.title_en).slice(0, 12)}</span>
        </div>
        
        {/* Main Content Column */}
        <div className="flex-1 min-w-0">
          {/* Mobile Header Stack */}
          <div className="flex items-center gap-2 mb-2 md:hidden">
            <span className="text-xs font-mono font-bold text-[#10B981] bg-[rgba(16, 185, 129,0.10)] border border-[rgba(16, 185, 129,0.20)] rounded px-1.5 py-0.5">{item.num}</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#10B981]/70">{t(cat.title_de, cat.title_en)}</span>
            <span className="text-[10px] font-mono text-[#718096] ml-auto">{globalIdx}/150</span>
          </div>
          
          <div className="flex items-start justify-between gap-3 mb-5">
            <h3 className="text-[22px] md:text-[28px] font-bold leading-tight tracking-tight text-[#F1F5F9]">{t(item.title_de, item.title_en)}</h3>
            <button onClick={copy} className="shrink-0 w-9 h-9 rounded-full bg-[#141D2B] border border-white/[0.07] group-hover:border-[#10B981]/30 flex items-center justify-center text-[#718096] hover:text-[#10B981] opacity-0 group-hover:opacity-100 transition-all mt-1">
              {copied ? <Check size={16} className="text-[#35C985]" /> : <Link2 size={16} />}
            </button>
          </div>
          
          <div className="bg-[#0E1520] border border-white/[0.07] rounded-[14px] p-6 md:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-colors duration-200 group-hover:border-white/[0.12]">
            <div className="text-[15px] leading-[1.8] text-[#A6B1C3] space-y-4">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RuleList({ title, items }) {
  return (
    <div className="my-3">
      {title && <p className="text-[14px] font-semibold text-[#F1F5F9] mb-2.5">{title}</p>}
      <div className="grid md:grid-cols-2 gap-[1px] bg-white/[0.07] border border-white/[0.07] rounded-[12px] overflow-hidden">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2.5 bg-[#0A0E15] px-4 py-3 text-[13px] text-[#A6B1C3] hover:bg-[#141D2B] transition-colors">
            <CheckCircle size={15} className="text-[#10B981] mt-0.5 shrink-0" />
            <span className="leading-snug">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoBox({ children, type = "info", title, lang }) {
  const t = (de, en) => (lang ? (lang === "de" ? de : en) : de);
  let style = "border-[#10B981] bg-[rgba(16, 185, 129,0.08)] text-[#2DD4BF]";
  let Icon = Info;
  let def = t("Information", "Information");
  
  if (type === "warning") { style = "border-[#F5B942] bg-[rgba(245,185,66,0.08)] text-[#F5B942]"; Icon = AlertTriangle; def = t("Wichtiger Hinweis", "Important"); }
  if (type === "error") { style = "border-[#F05252] bg-[rgba(240,82,82,0.08)] text-[#F05252]"; Icon = Ban; def = t("Nicht erlaubt", "Not allowed"); }
  if (type === "security") { style = "border-[#10B981] bg-[rgba(16, 185, 129,0.08)] text-[#2DD4BF]"; Icon = Shield; def = t("Datenschutz", "Privacy"); }
  if (type === "event") { style = "border-[#35C985] bg-[rgba(53,201,133,0.08)] text-[#35C985]"; Icon = Calendar; def = t("Event-Regel", "Event Rule"); }
  
  return (
    <div className={`border-l-[3px] rounded-r-[12px] p-4 flex gap-3 my-4 ${style}`}>
      <Icon size={18} className="shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-[11px] font-bold tracking-widest uppercase opacity-90 mb-1.5">{title || def}</p>
        <div className="text-[14px] leading-relaxed text-[#A6B1C3]">{children}</div>
      </div>
    </div>
  );
}
