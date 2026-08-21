"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Scale, Shield, Lock, User, Users, Server, Crown, Gift, CreditCard, Coins,
  Ticket, FileText, Database, AlertTriangle, Info, CheckCircle, Ban, Calendar,
  Clock, ExternalLink, Settings, Bot, MessageSquare, Archive, Gavel, Headphones,
  Menu, X, ChevronRight, Search, Percent, Languages
} from "lucide-react";

const InfinityIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 16c5 0 5-8 10-8a3 3 0 1 1 0 6c-5 0-5-8-10-8a3 3 0 1 0 0 6"/>
  </svg>
);

const TOC_CATEGORIES = [
  {
    title_de: "ALLGEMEINES", title_en: "GENERAL",
    items: [
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
    ]
  },
  {
    title_de: "NUTZUNGSBEDINGUNGEN", title_en: "TERMS OF USE",
    items: [
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
    ]
  },
  {
    title_de: "PREMIUM & CREDITS", title_en: "PREMIUM & CREDITS",
    items: [
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
    ]
  },
  {
    title_de: "EVENTS & ANGEBOTE", title_en: "EVENTS & OFFERS",
    items: [
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
    ]
  },
  {
    title_de: "SERVER & BOT-FUNKTIONEN", title_en: "SERVER & BOT FEATURES",
    items: [
      { id: "moderation-sicherheit", num: "50", title_de: "Moderation & Sicherheit", title_en: "Moderation & Security" },
      { id: "auto-moderation", num: "51", title_de: "Auto-Moderation", title_en: "Auto-Moderation" },
      { id: "ticket-system", num: "52", title_de: "Ticket-System", title_en: "Ticket System" },
      { id: "ticket-kategorien-zuweisung", num: "53", title_de: "Ticket-Kategorien und Zuweisung", title_en: "Ticket Categories & Assignment" },
      { id: "ticket-transcripts", num: "54", title_de: "Ticket-Transcripts", title_en: "Ticket Transcripts" },
      { id: "backups", num: "55", title_de: "Backups", title_en: "Backups" },
      { id: "wiederherstellung-backups", num: "56", title_de: "Wiederherstellung von Backups", title_en: "Backup Restoration" },
      { id: "automatisierungen", num: "57", title_de: "Automatisierungen", title_en: "Automations" },
      { id: "logging", num: "58", title_de: "Logging", title_en: "Logging" },
      { id: "level-system", num: "59", title_de: "Level-System", title_en: "Level System" },
      { id: "counting", num: "60", title_de: "Counting", title_en: "Counting" },
      { id: "welcome-goodbye", num: "61", title_de: "Welcome & Goodbye", title_en: "Welcome & Goodbye" },
      { id: "embeds-team-verwaltung", num: "62", title_de: "Embeds und Team Verwaltung", title_en: "Embeds & Team Management" },
    ]
  },
  {
    title_de: "DATENSCHUTZ", title_en: "PRIVACY",
    items: [
      { id: "datenschutz", num: "63", title_de: "Datenschutz", title_en: "Privacy" },
      { id: "verarbeitete-discord-daten", num: "64", title_de: "Verarbeitete Discord-Daten", title_en: "Processed Discord Data" },
      { id: "zwecke-datenverarbeitung", num: "65", title_de: "Zwecke der Datenverarbeitung", title_en: "Purposes of Data Processing" },
      { id: "server-konfigurationsdaten", num: "66", title_de: "Server- und Konfigurationsdaten", title_en: "Server & Configuration Data" },
      { id: "ticket-transcript-daten", num: "67", title_de: "Ticket- & Transcript-Daten", title_en: "Ticket & Transcript Data" },
      { id: "speicherungen-loeschung", num: "68", title_de: "Speicherungen & Löschung", title_en: "Storage & Deletion" },
      { id: "weitergabe-drittanbieter", num: "69", title_de: "Weitergabe & Drittanbieter", title_en: "Sharing & Third Parties" },
      { id: "sicherheit-daten", num: "70", title_de: "Sicherheit von Daten", title_en: "Data Security" },
      { id: "bot-interne-datenverarbeitung", num: "71", title_de: "Bot-Interne Datenverarbeitung", title_en: "Bot-Internal Data Processing" },
      { id: "rechte-datenschutzanfragen", num: "72", title_de: "Rechte & Datenschutzanfragen", title_en: "Rights & Privacy Requests" },
    ]
  },
  {
    title_de: "DIENST & RECHTLICHES", title_en: "SERVICE & LEGAL",
    items: [
      { id: "haftung", num: "73", title_de: "Haftung", title_en: "Liability" },
      { id: "beendigung-aenderungen-richtlinien", num: "74", title_de: "Beendigung & Änderungen der Richtlinien", title_en: "Termination & Policy Changes" },
      { id: "kontakt-support", num: "75", title_de: "Kontakt & Support", title_en: "Contact & Support" },
    ]
  },
  {
    title_de: "KOSTENLOSER SERVICE & PREMIUM", title_en: "FREE SERVICE & PREMIUM",
    items: [
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
    ]
  },
  {
    title_de: "GIFTS", title_en: "GIFTS",
    items: [
      { id: "premium-gift-erstellung", num: "88", title_de: "Premium-Gift Erstellung", title_en: "Premium Gift Creation" },
      { id: "premium-gift-einloesung", num: "89", title_de: "Premium-Gift Einlösung", title_en: "Premium Gift Redemption" },
      { id: "gift-code-bindung", num: "90", title_de: "Gift-Code Bindung", title_en: "Gift Code Binding" },
      { id: "verbrauchte-gift-codes", num: "91", title_de: "Verbrauchte Gift-Codes", title_en: "Consumed Gift Codes" },
      { id: "ungueltige-gift-codes", num: "92", title_de: "Ungültige Gift-Codes", title_en: "Invalid Gift Codes" },
      { id: "gift-code-missbrauch", num: "93", title_de: "Gift-Code-Missbrauch", title_en: "Gift Code Abuse" },
      { id: "event-gift-codes-detail", num: "94", title_de: "Event-Gift-Codes", title_en: "Event Gift Codes" },
      { id: "event-gift-event-ende", num: "95", title_de: "Event-Gift und Event-Ende", title_en: "Event Gift & Event End" },
    ]
  },
  {
    title_de: "EVENTS & RABATTE", title_en: "EVENTS & DISCOUNTS",
    items: [
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
    ]
  },
  {
    title_de: "SERVER-OWNER & CREDITS", title_en: "SERVER-OWNER & CREDITS",
    items: [
      { id: "server-owner-pruefung", num: "117", title_de: "Server-Owner-Prüfung", title_en: "Server-Owner Check" },
      { id: "owner-wechsel", num: "118", title_de: "Owner-Wechsel", title_en: "Owner Change" },
      { id: "admin-nicht-owner", num: "119", title_de: "Administrator ist nicht automatisch Owner", title_en: "Administrator is not automatically Owner" },
      { id: "server-premium-zuordnung", num: "120", title_de: "Server Premium Zuordnung", title_en: "Server Premium Assignment" },
      { id: "server-credits-zuordnung", num: "121", title_de: "Server Credits Zuordnung", title_en: "Server Credits Assignment" },
      { id: "credit-aktionen", num: "122", title_de: "Credit-Aktionen", title_en: "Credit Actions" },
      { id: "credit-fehlerkorrektur", num: "123", title_de: "Credit-Fehlerkorrektur", title_en: "Credit Error Correction" },
      { id: "keine-auszahlung", num: "124", title_de: "Keine Auszahlung", title_en: "No Payout" },
      { id: "keine-uebertragung", num: "125", title_de: "Keine Übertragung", title_en: "No Transfer" },
    ]
  },
  {
    title_de: "PREMIUM-TECHNIK", title_en: "PREMIUM TECHNOLOGY",
    items: [
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
    ]
  },
  {
    title_de: "ROLLEN & SERVERKONFIGURATION", title_en: "ROLES & SERVER CONFIG",
    items: [
      { id: "rollen-hierarchie-detail", num: "136", title_de: "Rollen-Hierarchie", title_en: "Role Hierarchy" },
      { id: "geloeschte-rollen", num: "137", title_de: "Gelöschte Rollen", title_en: "Deleted Roles" },
      { id: "geloeschte-channels", num: "138", title_de: "Gelöschte Channels", title_en: "Deleted Channels" },
      { id: "server-loeschung-bot-entfernung", num: "139", title_de: "Server-Löschung oder Bot-Entfernung", title_en: "Server Deletion or Bot Removal" },
      { id: "erneutes-hinzufuegen", num: "140", title_de: "Erneutes Hinzufügen", title_en: "Re-adding" },
    ]
  },
  {
    title_de: "VERFÜGBARKEIT & DISCORD", title_en: "AVAILABILITY & DISCORD",
    items: [
      { id: "discord-ausfaelle", num: "141", title_de: "Discord-Ausfälle", title_en: "Discord Outages" },
      { id: "discord-api-aenderungen", num: "142", title_de: "Discord-API-Änderungen", title_en: "Discord API Changes" },
      { id: "bot-restarts", num: "143", title_de: "Bot-Restarts", title_en: "Bot Restarts" },
      { id: "wartungsarbeiten", num: "144", title_de: "Wartungsarbeiten", title_en: "Maintenance Work" },
      { id: "sicherheitsabschaltungen", num: "145", title_de: "Sicherheitsabschaltungen", title_en: "Security Shutdowns" },
      { id: "missbrauchsschutz", num: "146", title_de: "Missbrauchsschutz", title_en: "Abuse Protection" },
      { id: "fehlermeldungen", num: "147", title_de: "Fehlermeldungen", title_en: "Error Messages" },
    ]
  },
  {
    title_de: "SUPPORT & ABSCHLUSS", title_en: "SUPPORT & CONCLUSION",
    items: [
      { id: "support-detail", num: "148", title_de: "Support", title_en: "Support" },
      { id: "betreiber", num: "149", title_de: "Betreiber", title_en: "Operator" },
      { id: "abschliessende-grundregel", num: "150", title_de: "Abschließende Grundregel", title_en: "Concluding Basic Rule" },
    ]
  }
];

export default function Page() {
  const [activeSection, setActiveSection] = useState("ueber-kyrox");
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState("de");

  const t = (de, en) => (lang === "de" ? de : en);
  const L = (arr) => arr.map(([de, en]) => t(de, en));

  const allTocItems = useMemo(() => TOC_CATEGORIES.flatMap(cat => cat.items), []);

  const filteredTocCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return TOC_CATEGORIES;
    
    return TOC_CATEGORIES.map(category => {
      const filteredItems = category.items.filter(item =>
        t(item.title_de, item.title_en).toLowerCase().includes(query) || item.num.includes(query)
      );
      return { ...category, items: filteredItems };
    }).filter(category => category.items.length > 0);
  }, [searchQuery, lang]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isTocOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e) => {
        if (e.key === "Escape") setIsTocOpen(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isTocOpen]);

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
      setIsTocOpen(false);
      history.replaceState(null, "", `#${id}`);
    }
  };

  const scrollbarHideClasses = "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-slate-300 font-sans selection:bg-blue-500/30 selection:text-white">
      
      {isTocOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsTocOpen(false)}
        />
      )}

      <div 
        id="mobile-toc"
        role="dialog"
        aria-modal="true"
        aria-label="Inhaltsverzeichnis"
        className={`fixed top-0 left-0 h-full w-[90vw] max-w-[340px] bg-[#0d0f13] border-r border-[#1e2028] z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl ${isTocOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#1e2028]">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Menu size={20} className="text-blue-500" />
            {t("Inhaltsverzeichnis", "Table of Contents")}
          </h3>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === "de" ? "en" : "de")} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded-md border border-[#1e2028]">
              <Languages size={14} className="text-blue-500" />
              {lang === "de" ? "EN" : "DE"}
            </button>
            <button onClick={() => setIsTocOpen(false)} className="text-slate-400 hover:text-white transition-colors p-2" aria-label="Inhaltsverzeichnis schließen">
              <X size={22} />
            </button>
          </div>
        </div>
        <div className="p-4 border-b border-[#1e2028]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder={t("Abschnitt suchen...", "Search section...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0b0e] border border-[#1e2028] rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
        <nav className={`p-3 overflow-y-auto flex-1 ${scrollbarHideClasses}`}>
          {filteredTocCategories.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-6">{t("Keine Ergebnisse.", "No results.")}</p>
          ) : (
            filteredTocCategories.map((category) => (
              <div key={category.title_de} className="mb-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-2">{t(category.title_de, category.title_en)}</h4>
                <ul className="space-y-0.5">
                  {category.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleTocClick(e, item.id)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                          activeSection === item.id
                            ? "bg-blue-500/10 text-blue-400 font-medium"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className={`text-xs font-mono ${activeSection === item.id ? "text-blue-500" : "text-slate-600"}`}>{item.num}</span>
                        <span className="whitespace-normal break-words">{t(item.title_de, item.title_en)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </nav>
      </div>

      <header className="relative border-b border-[#1e2028] w-full overflow-hidden bg-gradient-to-b from-[#101827] via-[#0b111b] to-[#080a0e]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative w-full px-4 sm:px-8 md:px-12 lg:px-16 py-10 md:py-14 lg:py-16">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            
            <div className="relative mb-5">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-110"></div>
              <div className="relative w-[60px] h-[60px] md:w-[72px] md:h-[72px] rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_10px_35px_rgba(59,130,246,0.25)] border border-blue-400/30">
                <Scale className="w-7 h-7 md:w-9 md:h-9 text-white" />
              </div>
            </div>
            
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-4 rounded-md bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase">
              <CheckCircle size={12} />
              {t("KYROX · RICHTLINIEN", "KYROX · POLICIES")}
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3 leading-[1.1]">
              {t("Richtlinien & Rechtliches", "Policies & Legal")}
            </h1>
            
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500/80 to-transparent rounded-full mb-5"></div>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 max-w-[720px]">
              {t(
                "Alle wichtigen Nutzungsbedingungen, Datenschutzinformationen und Regeln für die Nutzung des KyroX Discord-Bots und seiner Funktionen an einem zentralen Ort.",
                "All important terms of use, privacy information, and rules for using the KyroX Discord bot and its functions in one central place."
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-[#0f1117] border border-[#1e2028] rounded-lg px-3 py-1.5">
                <FileText size={12} className="text-blue-400" />
                <span>{t("150 KyroX Richtlinien", "150 KyroX Policies")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-[#0f1117] border border-[#1e2028] rounded-lg px-3 py-1.5">
                <Bot size={12} className="text-blue-400" />
                <span>{t("Kostenloser Discord Service", "Free Discord Service")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-[#0f1117] border border-[#1e2028] rounded-lg px-3 py-1.5">
                <Shield size={12} className="text-blue-400" />
                <span>{t("Offizielle KyroX Richtlinie", "Official KyroX Policy")}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-md sm:max-w-none sm:justify-center">
              <div className="flex items-center gap-3 bg-[#0f1117] border border-[#1e2028] rounded-xl px-5 py-3 transition-colors hover:border-blue-500/40 w-full sm:w-auto justify-center sm:justify-start">
                <Clock size={18} className="text-blue-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">{t("Letzte Aktualisierung", "Last Updated")}</p>
                  <p className="text-sm font-semibold text-white">21.08.2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#0f1117] border border-[#1e2028] rounded-xl px-5 py-3 transition-colors hover:border-blue-500/40 w-full sm:w-auto justify-center sm:justify-start">
                <Calendar size={18} className="text-blue-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">{t("Gültig ab", "Valid From")}</p>
                  <p className="text-sm font-semibold text-white">21.08.2026</p>
                </div>
              </div>
              <button onClick={() => setLang(lang === "de" ? "en" : "de")} className="flex items-center gap-3 bg-[#0f1117] border border-[#1e2028] rounded-xl px-5 py-3 transition-colors hover:border-blue-500/40 w-full sm:w-auto justify-center sm:justify-start">
                <Languages size={18} className="text-blue-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">{t("Sprache", "Language")}</p>
                  <p className="text-sm font-semibold text-white">{lang === "de" ? "English" : "Deutsch"}</p>
                </div>
              </button>
            </div>

          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
      </header>

      <div className="lg:hidden sticky top-0 z-30 bg-[#0a0b0e]/95 backdrop-blur-xl border-b border-[#1e2028]/50">
        <button 
          onClick={() => setIsTocOpen(true)}
          className="w-full flex items-center justify-between px-5 py-4 text-slate-200 font-medium min-h-[52px] active:bg-white/5 transition-colors"
          aria-expanded={isTocOpen}
          aria-controls="mobile-toc"
          aria-label="Inhaltsverzeichnis öffnen"
        >
          <span className="flex items-center gap-3">
            <Menu size={22} className="text-blue-500" />
            <span className="text-base">{t("Inhaltsverzeichnis", "Table of Contents")}</span>
          </span>
          <ChevronRight size={22} className="text-slate-500" />
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)] w-full">
        
        <aside className="hidden lg:flex flex-col sticky top-0 h-screen border-r border-[#1e2028] bg-[#0a0b0e]">
          <div className="p-6 border-b border-[#1e2028]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2.5 mb-1">
                <FileText size={16} className="text-blue-500" />
                {t("KyroX Richtlinien", "KyroX Policies")}
              </h3>
              <button onClick={() => setLang(lang === "de" ? "en" : "de")} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded-md border border-[#1e2028]">
                <Languages size={14} className="text-blue-500" />
                {lang === "de" ? "EN" : "DE"}
              </button>
            </div>
            <p className="text-xs text-slate-500 ml-[26px]">{t("150 KyroX Richtlinien", "150 KyroX Policies")}</p>
          </div>
          <div className="p-4 border-b border-[#1e2028]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder={t("Abschnitt suchen...", "Search section...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#11131a] border border-[#1e2028] rounded-lg pl-10 pr-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>
          <nav className={`p-3 overflow-y-auto flex-1 ${scrollbarHideClasses}`}>
            {filteredTocCategories.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-6">{t("Keine Ergebnisse gefunden.", "No results found.")}</p>
            ) : (
              filteredTocCategories.map((category) => (
                <div key={category.title_de} className="mb-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-4 mb-2">{t(category.title_de, category.title_en)}</h4>
                  <ul className="space-y-0.5">
                    {category.items.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => handleTocClick(e, item.id)}
                          className={`flex items-center gap-3 px-4 py-2 text-sm transition-all border-l-2 ${
                            activeSection === item.id
                              ? "border-blue-500 text-blue-400 bg-blue-500/[0.07] font-medium"
                              : "border-transparent text-slate-500 hover:text-slate-200 hover:bg-white/[0.03]"
                          }`}
                        >
                          <span className={`text-xs font-mono ${activeSection === item.id ? "text-blue-500" : "text-slate-600"}`}>{item.num}</span>
                          <span className="whitespace-normal break-words">{t(item.title_de, item.title_en)}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </nav>
        </aside>

        <main className="px-5 sm:px-8 md:px-12 xl:px-14 2xl:px-16 py-12 md:py-16 lg:py-20 min-w-0 w-full">
          <article className="max-w-[1000px]">
            
            <div className="space-y-20 md:space-y-24 lg:space-y-28">

              {/* ALLGEMEINES */}
              <CategoryDivider title={t("ALLGEMEINES", "GENERAL")} />

              <Section id="ueber-kyrox" num="01" title={t("Über KyroX", "About KyroX")} icon={Bot}>
                <p className="mb-5 leading-[1.75]">
                  {t(
                    "KyroX ist ein umfassender, kostenloser Discord-Bot, der verschiedene Werkzeuge und Funktionen zur Verfügung stellt, um Discord-Server effizient zu verwalten, zu moderieren und zu erweitern. Zu den Kernfunktionen gehören Server-Management, Automatisierungen, Tickets, Backups, Moderationswerkzeuge und ein umfangreiches internes Premium-System.",
                    "KyroX is a comprehensive, free Discord bot that provides various tools and functions to efficiently manage, moderate, and expand Discord servers. Core functions include server management, automations, tickets, backups, moderation tools, and an extensive internal premium system."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Die Bedienung erfolgt primär über Discord Slash Commands, Buttons, Select Menus, Modals und Components V2. Diese zentrale Richtlinienseite bündelt alle rechtlichen und regulatorischen Vorgaben für die Nutzung aller KyroX-Funktionen innerhalb von Discord.",
                    "Operation is primarily via Discord Slash Commands, Buttons, Select Menus, Modals, and Components V2. This central policy page bundles all legal and regulatory requirements for using all KyroX features within Discord."
                  )}
                </p>
              </Section>

              <Section id="geltungsbereich" num="02" title={t("Geltungsbereich", "Scope")} icon={FileText}>
                <p className="mb-5 leading-[1.75]">
                  {t(
                    "Diese Richtlinien gelten für die Nutzung des KyroX Discord-Bots und aller über KyroX innerhalb von Discord bereitgestellten Funktionen und Dienste. Dazu gehören interne technische Systeme, soweit sie für den Betrieb des Bots erforderlich sind.",
                    "These policies apply to the use of the KyroX Discord bot and all functions and services provided by KyroX within Discord. This includes internal technical systems as far as they are necessary for the operation of the bot."
                  )}
                </p>
                <p className="mb-4 text-slate-400">{t("Dazu gehören insbesondere:", "This includes in particular:")}</p>
                <RuleList items={L([
                  ["Slash Commands", "Slash Commands"], ["Discord Buttons", "Discord Buttons"], ["Select Menus", "Select Menus"], ["Modals", "Modals"], ["Components V2", "Components V2"], ["Server-Konfiguration", "Server Configuration"], ["Moderation", "Moderation"], ["Sicherheit", "Security"], ["Tickets", "Tickets"], ["Ticket-Transcripts", "Ticket Transcripts"], ["Backups", "Backups"], ["Logging", "Logging"], ["Welcome", "Welcome"], ["Goodbye", "Goodbye"], ["Level-System", "Level System"], ["Counting", "Counting"], ["Embeds", "Embeds"], ["Team-Verwaltung", "Team Management"], ["User Premium", "User Premium"], ["Server Premium", "Server Premium"], ["Server Credits", "Server Credits"], ["Premium Gift-Codes", "Premium Gift Codes"], ["Events", "Events"], ["Event Premium", "Event Premium"], ["Event Gift-Codes", "Event Gift Codes"], ["Event-Rabatte", "Event Discounts"]
                ])} />
                <p className="mt-4 mb-4 text-slate-400">{t("Die Regeln gelten für:", "The rules apply to:")}</p>
                <RuleList items={L([
                  ["Nutzer", "Users"], ["Server-Owner", "Server Owners"], ["Administratoren", "Administrators"], ["Moderatoren", "Moderators"], ["Teammitglieder", "Team Members"], ["Personen, die KyroX Funktionen verwenden", "Persons using KyroX features"]
                ])} />
              </Section>

              <Section id="begriffsbestimmungen" num="03" title={t("Begriffsbestimmungen", "Definitions")} icon={FileText}>
                <p className="mb-4 leading-[1.75]">{t("Innerhalb dieser Richtlinien werden folgende Begriffe verwendet:", "The following terms are used within these policies:")}</p>
                <RuleList items={L([
                  ["Nutzer: Jede Person, die mit KyroX über Discord interagiert oder dessen Funktionen nutzt.", "User: Any person who interacts with KyroX via Discord or uses its functions."],
                  ["Server-Owner: Der tatsächliche Eigentümer eines Discord-Servers.", "Server Owner: The actual owner of a Discord server."],
                  ["Administrator: Ein Mitglied mit administrativen Rechten auf einem Server.", "Administrator: A member with administrative rights on a server."],
                  ["Premium: Eine zusätzliche interne Funktionsstufe von KyroX, die keinen Echtgeldwert besitzt.", "Premium: An additional internal functional tier of KyroX that has no real money value."],
                  ["Credits: Interne virtuelle Einheit (Server Credits) innerhalb des KyroX-Bots ohne Echtgeldwert.", "Credits: Internal virtual unit (Server Credits) within the KyroX bot with no real money value."],
                  ["Event: Ein zeitlich begrenztes Angebot mit besonderen internen Vorteilen innerhalb von KyroX.", "Event: A time-limited offer with special internal benefits within KyroX."]
                ])} />
              </Section>

              <Section id="voraussetzungen" num="04" title={t("Voraussetzungen", "Requirements")} icon={User}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Für die Nutzung vieler Funktionen von KyroX wird ein gültiges Discord-Konto vorausgesetzt. Je nach Funktion können zusätzlich folgende Voraussetzungen erfüllt sein:",
                    "A valid Discord account is required to use many KyroX functions. Depending on the function, the following additional requirements may need to be met:"
                  )}
                </p>
                <RuleList items={L([
                  ["Mitgliedschaft auf einem Discord Server", "Membership on a Discord Server"], ["bestimmte Rollen", "specific roles"], ["Manage Server", "Manage Server"], ["Administrator", "Administrator"], ["Server Owner", "Server Owner"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Für die Nutzung von KyroX gelten zusätzlich die jeweils anwendbaren Voraussetzungen und Altersanforderungen der Discord-Plattform.",
                    "The applicable requirements and age restrictions of the Discord platform also apply to the use of KyroX."
                  )}
                </p>
              </Section>

              <Section id="verhaeltnis-zu-discord" num="05" title={t("Verhältnis zu Discord", "Relationship to Discord")} icon={ExternalLink}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX ist ein unabhängiger Dienst, der die API und Dienste von Discord verwendet. Sofern keine ausdrückliche Partnerschaft besteht, ist KyroX nicht:",
                    "KyroX is an independent service that uses the API and services of Discord. Unless an explicit partnership exists, KyroX is not:"
                  )}
                </p>
                <RuleList items={L([
                  ["Discord selbst", "Discord itself"], ["Teil von Discord", "Part of Discord"], ["offiziell von Discord betrieben", "officially operated by Discord"], ["offiziell von Discord unterstützt", "officially supported by Discord"]
                ])} />
                <p className="mt-4 mb-4 leading-[1.75]">
                  {t(
                    "Änderungen durch Discord können die Funktionen von KyroX unmittelbar beeinflussen. Beispiele hierfür sind:",
                    "Changes made by Discord can directly affect the functions of KyroX. Examples of this include:"
                  )}
                </p>
                <RuleList items={L([
                  ["API Änderungen", "API changes"], ["Rate Limits", "Rate Limits"], ["Permission Änderungen", "Permission changes"], ["Discord Ausfälle", "Discord outages"], ["entfernte Discord Funktionen", "removed Discord features"]
                ])} />
              </Section>

              <Section id="discord-nutzerzuordnung" num="06" title={t("Discord Nutzerzuordnung", "Discord User Mapping")} icon={User}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX identifiziert Nutzer über Discord-bezogene Daten. Dazu können gehören:",
                    "KyroX identifies users via Discord-related data. This can include:"
                  )}
                </p>
                <RuleList items={L([
                  ["Discord User ID", "Discord User ID"], ["Discord Guild ID", "Discord Guild ID"], ["Channel ID", "Channel ID"], ["Role ID", "Role ID"], ["Message ID", "Message ID"], ["Benutzername", "Username"], ["Servername", "Server name"], ["Avatar, sofern für eine Funktion benötigt", "Avatar, if required for a function"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Diese Daten werden verwendet, um Bot-Einstellungen, Premium-Status und weitere Funktionen dem jeweiligen Nutzer oder Server korrekt zuzuordnen.",
                    "This data is used to correctly map bot settings, premium status, and other functions to the respective user or server."
                  )}
                </p>
              </Section>

              <Section id="bot-verfuegbarkeit" num="07" title={t("Bot-Verfügbarkeit und Discord-Abhängigkeit", "Bot Availability & Discord Dependency")} icon={Server}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX bemüht sich um eine möglichst zuverlässige Bereitstellung des Bots. Eine jederzeit unterbrechungsfreie oder fehlerfreie Verfügbarkeit kann jedoch nicht gewährleistet werden.",
                    "KyroX strives to provide the bot as reliably as possible. However, uninterrupted or error-free availability at all times cannot be guaranteed."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Die Verfügbarkeit von KyroX ist direkt abhängig von der Discord-Plattform. Schränkungen oder Ausfälle bei Discord führen unweigerlich zu Einschränkungen beim Bot.",
                    "The availability of KyroX is directly dependent on the Discord platform. Restrictions or outages on Discord inevitably lead to restrictions on the bot."
                  )}
                </p>
              </Section>

              <Section id="aenderungen-an-kyrox" num="08" title={t("Änderungen an KyroX", "Changes to KyroX")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX kann Bot-Funktionen und Dienste jederzeit anpassen. Dies umfasst das Recht, Funktionen:",
                    "KyroX can adjust bot functions and services at any time. This includes the right to:"
                  )}
                </p>
                <RuleList items={L([
                  ["hinzuzufügen", "add"], ["zu verändern", "change"], ["zu verbessern", "improve"], ["zu ersetzen", "replace"], ["einzuschränken", "restrict"], ["zu entfernen", "remove"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Es besteht kein Anspruch darauf, dass jede Funktion dauerhaft unverändert bestehen bleibt.",
                    "There is no guarantee that every function will remain permanently unchanged."
                  )}
                </p>
              </Section>

              <Section id="sprache-kommunikation" num="09" title={t("Sprache und Kommunikation", "Language and Communication")} icon={MessageSquare}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Die primäre Kommunikation zwischen KyroX und den Nutzern erfolgt über die von Discord bereitgestellten Interaktionsmöglichkeiten. Die Sprache des Bots ist an die Server-Einstellungen oder Nutzer-Einstellungen angepasst, soweit unterstützt.",
                    "Primary communication between KyroX and users occurs via the interaction options provided by Discord. The bot's language is adapted to server or user settings where supported."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Supportanfragen und rechtliche Hinweise werden in der Regel in Deutsch oder Englisch abgewickelt.",
                    "Support requests and legal information are usually handled in German or English."
                  )}
                </p>
              </Section>

              <Section id="kostenlose-premium-funktionen" num="10" title={t("Kostenlose und Premium-Funktionen", "Free and Premium Features")} icon={CheckCircle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX bietet sowohl kostenlose Grundfunktionen als auch erweiterte Premium-Funktionen. Premium ist ein kostenloses internes Zusatzsystem und erfordert kein Echtgeld. Welche Funktionen kostenlos nutzbar sind und welche Premium voraussetzen, kann vom System festgelegt und jederzeit angepasst werden.",
                    "KyroX offers both basic free functions and advanced premium functions. Premium is a free internal add-on system and does not require real money. Which functions are free to use and which require premium can be defined by the system and adjusted at any time."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Es besteht kein Anspruch auf dauerhaft kostenlose Nutzung spezifischer Module.",
                    "There is no right to permanent free use of specific modules."
                  )}
                </p>
              </Section>

              {/* NUTZUNGSBEDINGUNGEN */}
              <CategoryDivider title={t("NUTZUNGSBEDINGUNGEN", "TERMS OF USE")} />

              <Section id="allgemeine-nutzungsbedingungen" num="11" title={t("Allgemeine Nutzungsbedingungen", "General Terms of Use")} icon={FileText}>
                <p className="mb-5 leading-[1.75]">
                  {t(
                    "Durch die Nutzung des KyroX Discord-Bots akzeptierst du diese Nutzungsbedingungen sowie alle zugehörigen Richtlinien. KyroX bietet Funktionen zur Serververwaltung, Moderation, Automatisierung und Erweiterung von Discord-Servern.",
                    "By using the KyroX Discord bot, you accept these terms of use and all associated policies. KyroX offers functions for server management, moderation, automation, and expansion of Discord servers."
                  )}
                </p>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Die Nutzung des Dienstes erfolgt auf Basis der technischen Möglichkeiten von Discord. Der Nutzer ist für die korrekte Konfiguration und die Vergabe von Berechtigungen auf seinem Server verantwortlich.",
                    "Use of the service is based on the technical possibilities of Discord. The user is responsible for the correct configuration and assignment of permissions on their server."
                  )}
                </p>
                <InfoBox title={t("Wichtig", "Important")} icon={Info}>
                  {t(
                    "Diese Nutzungsbedingungen gelten für alle Nutzer, Server-Owner, Administratoren, Moderatoren und sonstigen Personen, die KyroX verwenden oder auf KyroX-Ressourcen zugreifen.",
                    "These terms of use apply to all users, server owners, administrators, moderators, and other persons who use KyroX or access KyroX resources."
                  )}
                </InfoBox>
              </Section>

              <Section id="commands-interactions" num="12" title={t("Discord Commands und Interactions", "Discord Commands and Interactions")} icon={Bot}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX wird hauptsächlich über Discord Commands und Interactions bedient. Dazu gehören:",
                    "KyroX is mainly operated via Discord Commands and Interactions. These include:"
                  )}
                </p>
                <RuleList items={L([
                  ["Slash Commands", "Slash Commands"], ["Buttons", "Buttons"], ["Select Menus", "Select Menus"], ["Modals", "Modals"], ["Components", "Components"], ["Components V2", "Components V2"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Nutzer dürfen diese Systeme nicht manipulieren oder verwenden, um Berechtigungsprüfungen zu umgehen. KyroX kann Berechtigungen beim tatsächlichen Ausführen einer Aktion erneut prüfen.",
                    "Users may not manipulate these systems or use them to bypass permission checks. KyroX can re-check permissions when an action is actually executed."
                  )}
                </p>
              </Section>

              <Section id="zulaessige-nutzung" num="13" title={t("Zulässige Nutzung", "Permitted Use")} icon={CheckCircle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX darf ausschließlich für die legitime Verwaltung und Erweiterung von Discord-Servern genutzt werden. Beispiele für zulässige Nutzungsbereiche sind:",
                    "KyroX may only be used for the legitimate management and expansion of Discord servers. Examples of permitted usage areas include:"
                  )}
                </p>
                <RuleList items={L([
                  ["Discord Serververwaltung", "Discord Server Management"], ["Community Management", "Community Management"], ["Moderation", "Moderation"], ["Support über Tickets", "Support via Tickets"], ["Automatisierungen", "Automations"], ["Backups", "Backups"], ["Logging", "Logging"], ["Level-System", "Level System"], ["Counting", "Counting"], ["Teamverwaltung", "Team Management"], ["Embeds", "Embeds"], ["Welcome/Goodbye", "Welcome/Goodbye"], ["Premium Funktionen", "Premium Functions"]
                ])} />
              </Section>

              <Section id="verbotene-nutzung" num="14" title={t("Verbotene Nutzung", "Prohibited Use")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Die Nutzung von KyroX zum Zwecke des Missbrauchs, der Umgehung von Beschränkungen oder der Schädigung Dritter ist strengstens untersagt. Verboten sind insbesondere:",
                    "The use of KyroX for the purpose of abuse, circumventing restrictions, or harming third parties is strictly prohibited. The following are particularly forbidden:"
                  )}
                </p>
                <RuleList items={L([
                  ["Exploits", "Exploits"], ["Bug Abuse", "Bug Abuse"], ["absichtliche Manipulation von Commands", "intentional manipulation of Commands"], ["Credits duplizieren", "duplicating Credits"], ["Premium unberechtigt erhalten", "obtaining Premium unauthorized"], ["Premium-Limits umgehen", "bypassing Premium limits"], ["Event-Cooldowns umgehen", "bypassing Event cooldowns"], ["Event-Belohnungen mehrfach beanspruchen", "claiming Event rewards multiple times"], ["Rabatte mehrfach verwenden", "using discounts multiple times"], ["Gift Codes manipulieren", "manipulating Gift Codes"], ["Gift Codes mehrfach einlösen", "redeeming Gift Codes multiple times"], ["Server-Owner-Prüfungen umgehen", "bypassing Server Owner checks"], ["Interactions manipulieren", "manipulating Interactions"], ["API-Missbrauch", "API abuse"], ["Spam über Bot-Commands", "Spam via Bot Commands"], ["Flooding", "Flooding"], ["absichtliche Überlastung des Bots", "intentional overloading of the Bot"], ["Rate Limits umgehen", "bypassing Rate Limits"], ["unbefugter Zugriff", "unauthorized access"], ["gestohlene Accounts", "stolen accounts"], ["betrügerische Nutzung", "fraudulent use"], ["Sicherheitsmechanismen umgehen", "bypassing security mechanisms"]
                ])} />
                <InfoBox type="warning" title={t("Achtung", "Attention")}>
                  {t(
                    "Wenn ein Nutzer einen Fehler entdeckt, darf dieser nicht bewusst ausgenutzt werden. Jeder Missbrauch kann zum Ausschluss führen.",
                    "If a user discovers an error, it may not be intentionally exploited. Any abuse can lead to exclusion."
                  )}
                </InfoBox>
              </Section>

              <Section id="pflichten-nutzer" num="15" title={t("Pflichten der Nutzer", "User Obligations")} icon={Users}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Nutzer sind verpflichtet, die Regeln von Discord und die vorliegenden KyroX-Richtlinien einzuhalten. Die Konfiguration von KyroX auf einem Server muss so erfolgen, dass keine anderen Nutzer geschädigt, belästigt oder getäuscht werden.",
                    "Users are obliged to comply with the rules of Discord and the present KyroX policies. The configuration of KyroX on a server must be done in such a way that no other users are harmed, harassed, or deceived."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Sicherheitsrelevante Einstellungen, wie Moderationsmodule oder Berechtigungen, müssen sachgemäß und mit der nötigen Sorgfalt konfiguriert werden.",
                    "Security-relevant settings, such as moderation modules or permissions, must be configured properly and with the necessary care."
                  )}
                </p>
              </Section>

              <Section id="server-owner-administratoren" num="16" title={t("Server-Owner & Administratoren", "Server-Owner & Administrators")} icon={Crown}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Server-Owner und berechtigte Administratoren verwalten KyroX direkt über Discord-Funktionen und Commands. Je nach Modul können sie Einstellungen vornehmen für:",
                    "Server Owners and authorized administrators manage KyroX directly via Discord functions and commands. Depending on the module, they can make settings for:"
                  )}
                </p>
                <RuleList items={L([
                  ["Rollen", "Roles"], ["Channels", "Channels"], ["Moderation", "Moderation"], ["Sicherheitsfunktionen", "Security functions"], ["Tickets", "Tickets"], ["Logs", "Logs"], ["Backups", "Backups"], ["Embeds", "Embeds"], ["Welcome / Goodbye", "Welcome / Goodbye"], ["Level-System", "Level System"], ["Counting", "Counting"], ["Team-Verwaltung", "Team Management"], ["Premium-Angebote", "Premium Offers"], ["Server Credits", "Server Credits"], ["weitere Bot-Module", "other Bot modules"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Bestimmte kritische Funktionen dürfen ausschließlich dem tatsächlichen Server-Owner zur Verfügung stehen.",
                    "Certain critical functions may only be available to the actual Server Owner."
                  )}
                </p>
              </Section>

              <Section id="server-konfiguration-kyrox" num="17" title={t("Server-Konfiguration über KyroX", "Server Configuration via KyroX")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Einstellungen, die über KyroX-Commands vorgenommen werden, werden gespeichert, um den Dienst auf dem Server aufrechtzuerhalten. Diese Daten sind an die Guild ID gebunden und können von berechtigten Personen verwaltet werden.",
                    "Settings made via KyroX commands are saved to maintain the service on the server. This data is linked to the Guild ID and can be managed by authorized persons."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Fehlkonfigurationen, die zu Fehlfunktionen des Bots führen, liegen im Verantwortungsbereich der Server-Administration.",
                    "Misconfigurations leading to malfunctions of the bot are the responsibility of the server administration."
                  )}
                </p>
              </Section>

              <Section id="bot-berechtigungen-rollen" num="18" title={t("Bot-Berechtigungen und Rollen-Hierarchie", "Bot Permissions & Role Hierarchy")} icon={Shield}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX benötigt bestimmte Discord-Berechtigungen, um ordnungsgemäß zu funktionieren (z. B. Nachrichten senden, Mitglieder kicken/bannen, Rollen verwalten). Die Hierarchie der Rollen auf dem Discord-Server muss so gestaltet sein, dass die Bot-Rolle über den Rollen steht, die er verwalten soll.",
                    "KyroX requires certain Discord permissions to function properly (e.g., send messages, kick/ban members, manage roles). The hierarchy of roles on the Discord server must be designed so that the bot role is above the roles it is supposed to manage."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Kann KyroX eine Aktion aufgrund fehlender Rechte oder einer ungünstigen Rollen-Hierarchie nicht ausführen, liegt dies nicht in der Verantwortung des Bot-Betreibers.",
                    "If KyroX cannot execute an action due to missing permissions or an unfavorable role hierarchy, this is not the responsibility of the bot operator."
                  )}
                </p>
              </Section>

              <Section id="missbrauch-exploits" num="19" title={t("Missbrauch & Exploits", "Abuse & Exploits")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Ein Nutzer darf technische Fehler oder Lücken im System nicht ausnutzen. Dies umfasst insbesondere den Versuch:",
                    "A user may not exploit technical errors or loopholes in the system. This includes in particular the attempt to:"
                  )}
                </p>
                <RuleList items={L([
                  ["Premium mehrfach zu erhalten", "get Premium multiple times"], ["Credits zu duplizieren", "duplicate Credits"], ["Cooldowns zu umgehen", "bypass cooldowns"], ["Rabatte mehrfach zu nutzen", "use discounts multiple times"], ["Gift Codes mehrfach einzulösen", "redeem Gift Codes multiple times"], ["Owner-Prüfungen zu umgehen", "bypass Owner checks"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Automatisierungsmissbrauch, das Umgehen von Rate-Limits und die Nutzung gestohlener Accounts sind ebenfalls untersagt.",
                    "Automation abuse, bypassing rate limits, and using stolen accounts are also prohibited."
                  )}
                </p>
              </Section>

              <Section id="automatisierungsmissbrauch" num="20" title={t("Automatisierungsmissbrauch", "Automation Abuse")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX nutzt Automatisierungen (z. B. Level-System, Auto-Moderation). Es ist untersagt, diese Automatisierungen durch Makros, Skripte oder andere externe Tools künstlich auszulösen, um unfaire Vorteile (z. B. XP-Farming) zu erlangen.",
                    "KyroX uses automations (e.g., Level System, Auto-Moderation). It is prohibited to artificially trigger these automations via macros, scripts, or other external tools to gain unfair advantages (e.g., XP farming)."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Ein solcher Automatisierungsmissbrauch kann zum Ausschluss vom Bot oder zur Löschung unrechtmäßig erlangter Daten führen.",
                    "Such automation abuse can lead to exclusion from the bot or the deletion of illegally obtained data."
                  )}
                </p>
              </Section>

              <Section id="spam-ueberlastung" num="21" title={t("Spam und Überlastung", "Spam and Overload")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Das absichtliche Spammen von KyroX-Commands, das Auslösen massenhafter Interactions gleichzeitig oder das Flooding von Ticket-Systemen ist untersagt.",
                    "Intentionally spamming KyroX commands, triggering mass interactions simultaneously, or flooding ticket systems is prohibited."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Solche Handlungen dienen lediglich der Überlastung der Bot-Infrastruktur und können zu sofortigen Sperren führen.",
                    "Such actions only serve to overload the bot infrastructure and can lead to immediate bans."
                  )}
                </p>
              </Section>

              <Section id="sperrungen-massnahmen" num="22" title={t("Sperrungen & Maßnahmen", "Blocks & Measures")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Bei Missbrauch oder Verstößen gegen diese Richtlinien können seitens KyroX angemessene Maßnahmen ergriffen werden. Beispiele für solche Maßnahmen:",
                    "In the event of abuse or violations of these policies, appropriate measures may be taken by KyroX. Examples of such measures:"
                  )}
                </p>
                <RuleList items={L([
                  ["Einschränkung bestimmter Bot-Funktionen", "Restriction of certain bot functions"], ["Event-Funktionen sperren", "Block event functions"], ["unrechtmäßig erhaltene Vorteile korrigieren", "Correct illegally obtained advantages"], ["Credits korrigieren", "Correct credits"], ["unrechtmäßig erhaltenes Premium korrigieren", "Correct illegally obtained premium"], ["Gift-Funktionen sperren", "Block gift functions"], ["Nutzer (Blacklist) oder Server von KyroX ausschließen", "Exclude users (blacklist) or servers from KyroX"]
                ])} />
              </Section>

              {/* PREMIUM & CREDITS */}
              <CategoryDivider title={t("PREMIUM & CREDITS", "PREMIUM & CREDITS")} />

              <Section id="user-premium" num="23" title={t("User Premium", "User Premium")} icon={Crown}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX kann personenbezogenes User Premium bereitstellen. Premium ist eine interne Funktionsstufe und erfordert kein Echtgeld. Premium kann beispielsweise stammen aus:",
                    "KyroX can provide personal User Premium. Premium is an internal functional tier and does not require real money. Premium can for example come from:"
                  )}
                </p>
                <RuleList items={L([
                  ["regulärer Aktivierung", "regular activation"], ["Gift Code", "Gift Code"], ["Event Gift Code", "Event Gift Code"], ["offiziellen KyroX Aktionen", "official KyroX promotions"]
                ])} />
                <p className="mt-5 leading-[1.75]">
                  {t(
                    "Temporäres Premium besitzt eine Laufzeit und ein Ablaufdatum und wird nach Ablauf deaktiviert. Lifetime Premium besitzt grundsätzlich kein reguläres zeitliches Ablaufdatum.",
                    "Temporary Premium has a duration and an expiration date and is deactivated after expiry. Lifetime Premium generally has no regular time-based expiration date."
                  )}
                </p>
              </Section>

              <Section id="server-premium" num="24" title={t("Server Premium", "Server Premium")} icon={Server}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Server Premium bezieht sich auf einen spezifischen Discord-Server und schaltet erweiterte Bot-Funktionen für diesen frei. Server Premium gehört zum jeweiligen Server, und bestimmte Freischaltungen dürfen nur durch den Server-Owner durchgeführt werden.",
                    "Server Premium refers to a specific Discord server and unlocks advanced bot features for it. Server Premium belongs to the respective server, and certain unlocks may only be performed by the Server Owner."
                  )}
                </p>
                <InfoBox>
                  {t(
                    "Wenn ein Premium-Angebot deaktiviert wird, bedeutet das nicht automatisch, dass bereits bestehendes Premium sofort gelöscht wird. Die Deaktivierung verhindert lediglich den Erwerb neuer Premium-Stufen.",
                    "If a premium offer is deactivated, it does not automatically mean that existing premium is immediately deleted. Deactivation only prevents the acquisition of new premium tiers."
                  )}
                </InfoBox>
              </Section>

              <Section id="monthly-server-premium" num="25" title={t("Monthly Server Premium", "Monthly Server Premium")} icon={Clock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Das Monthly Server Premium ist ein zeitlich begrenztes Modell, das erweiterte Funktionen für einen Discord-Server für die Dauer eines Monats freischaltet. Es kann über interne KyroX-Funktionen verlängert werden, um aufrechterhalten zu bleiben. KyroX verlangt dafür kein Echtgeld.",
                    "Monthly Server Premium is a time-limited model that unlocks advanced features for a Discord server for the duration of one month. It can be extended via internal KyroX functions to remain active. KyroX does not charge real money for this."
                  )}
                </p>
                <div className="bg-[#0d0e12] border border-[#1e2028] rounded-xl p-5 text-center mb-4">
                  <Clock className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                  <p className="text-white font-semibold">{t("Monthly Server Premium", "Monthly Server Premium")}</p>
                </div>
                <p className="leading-[1.75]">
                  {t(
                    "Nach Ablauf des Monats werden die Premium-Vorteile automatisch deaktiviert, sofern keine Verlängerung über interne Funktionen erfolgt.",
                    "After the month expires, the premium benefits are automatically deactivated unless an extension is made via internal functions."
                  )}
                </p>
              </Section>

              <Section id="lifetime-server-premium" num="26" title={t("Lifetime Server Premium", "Lifetime Server Premium")} icon={InfinityIcon}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Das Lifetime Server Premium ist ein internes Modell, das erweiterte Funktionen für einen Discord-Server auf unbestimmte Zeit freischaltet. Es wird dafür kein Echtgeld verlangt.",
                    "Lifetime Server Premium is an internal model that unlocks advanced features for a Discord server indefinitely. No real money is charged for this."
                  )}
                </p>
                <div className="bg-[#0d0e12] border border-[#1e2028] rounded-xl p-5 text-center mb-4">
                  <InfinityIcon className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                  <p className="text-white font-semibold">{t("Lifetime Server Premium", "Lifetime Server Premium")}</p>
                </div>
                <p className="leading-[1.75]">
                  {t(
                    "Es unterliegt keinem regulären zeitlichen Ablauf, kann aber bei schwerwiegenden Verstößen gegen die Richtlinien entzogen werden.",
                    "It is not subject to regular time-based expiration but can be revoked in the event of serious violations of the policies."
                  )}
                </p>
              </Section>

              <Section id="server-credits" num="27" title={t("Server Credits", "Server Credits")} icon={Coins}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Server Credits sind eine interne KyroX Einheit. Sie sind kein gesetzliches Zahlungsmittel, besitzen keinen garantierten realen Geldwert und sind grundsätzlich für vorgesehene KyroX Bot-Funktionen bestimmt. KyroX verkauft Server Credits nicht gegen echtes Geld.",
                    "Server Credits are an internal KyroX unit. They are not legal tender, have no guaranteed real money value, and are primarily intended for designated KyroX bot functions. KyroX does not sell Server Credits for real money."
                  )}
                </p>
                <div className="bg-[#0d0e12] border border-[#1e2028] rounded-xl p-6 mb-4">
                  <p className="text-sm text-slate-400 mb-4">{t("Für Server Credits gelten folgende Regeln:", "The following rules apply to Server Credits:")}</p>
                  <RuleList items={L([
                    ["kein gesetzliches Zahlungsmittel", "no legal tender"], ["kein garantierter Geldwert", "no guaranteed money value"], ["grundsätzlich serverbezogen", "primarily server-related"], ["nur für KyroX Funktionen nutzbar", "only usable for KyroX functions"], ["Manipulation und Duplizierung verboten", "manipulation and duplication prohibited"]
                  ])} />
                </div>
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Server Credits werden nur dem tatsächlichen Server-Owner angezeigt, sofern das System dies vorsieht.",
                    "Server Credits are only displayed to the actual Server Owner if the system provides for this."
                  )}
                </p>
              </Section>

              <Section id="premium-gift-codes" num="28" title={t("Premium Gift-Codes", "Premium Gift Codes")} icon={Gift}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX stellt Premium Gift-Codes zur Verfügung, die über Bot-Commands gegen Premium-Laufzeiten eingetauscht werden können. Gift-Codes können folgende Eigenschaften aufweisen:",
                    "KyroX provides Premium Gift Codes that can be exchanged for Premium durations via bot commands. Gift Codes can have the following properties:"
                  )}
                </p>
                <RuleList items={L([
                  ["Premium Dauer", "Premium Duration"], ["Zielnutzer", "Target User"], ["Erstellungszeitpunkt", "Creation Time"], ["Einlösestatus", "Redemption Status"], ["Quelle", "Source"], ["Event-Zuordnung", "Event Assignment"]
                ])} />
                <p className="mt-4 mb-4 leading-[1.75]">{t("Grundsätzlich gilt für Gift-Codes:", "The following generally applies to Gift Codes:")}</p>
                <RuleList items={L([
                  ["einmalige Einlösung", "single redemption"], ["User-Bindung, sofern vorhanden", "User binding, if applicable"], ["nicht übertragbar", "non-transferable"], ["nach Einlösung als verwendet markiert", "marked as used after redemption"]
                ])} />
                <InfoBox type="warning">
                  {t(
                    "Ein Gift Code darf technische Premium-Grenzen, wie die bestehende 12-Monats-Prüfung des Gift-Systems, nicht umgehen.",
                    "A Gift Code may not bypass technical premium limits, such as the existing 12-month check of the Gift system."
                  )}
                </InfoBox>
              </Section>

              <Section id="premium-laufzeiten" num="29" title={t("Premium-Laufzeiten", "Premium Durations")} icon={Clock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Die Laufzeit von Premium richtet sich nach der jeweiligen Quelle der Aktivierung. Temporäres Premium besitzt ein festes Aktivierungs- und Ablaufdatum. Die maximale Laufzeit kann durch systeminterne Grenzen, wie beispielsweise eine 12-Monats-Prüfung, begrenzt sein.",
                    "The duration of Premium depends on the respective source of activation. Temporary Premium has a fixed activation and expiration date. The maximum duration can be limited by internal system limits, such as a 12-month check."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Lifetime Premium unterliegt keinem regulären zeitlichen Ablauf.",
                    "Lifetime Premium is not subject to regular time-based expiration."
                  )}
                </p>
              </Section>

              <Section id="premium-ablauf" num="30" title={t("Premium-Ablauf", "Premium Expiration")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn temporäres Premium abläuft, werden die entsprechenden Premium-Vorteile automatisch deaktiviert. Es erfolgt keine automatische Verlängerung, sofern nicht explizit ein solcher Prozess im System vorgesehen ist.",
                    "When temporary Premium expires, the corresponding Premium benefits are automatically deactivated. There is no automatic renewal unless such a process is explicitly provided in the system."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Bereits während der Premium-Laufzeit getätigte Konfigurationen, die über die Standardfunktionen hinausgehen, können nach Ablauf deaktiviert oder zurückgesetzt werden.",
                    "Configurations made during the Premium period that go beyond the standard functions can be deactivated or reset after expiry."
                  )}
                </p>
              </Section>

              <Section id="beanspruchung-premium" num="31" title={t("Beanspruchung von Premium", "Claiming Premium")} icon={Gift}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Premium kann auf verschiedene Arten beansprucht werden:",
                    "Premium can be claimed in several ways:"
                  )}
                </p>
                <RuleList items={L([
                  ["Direkte Aktivierung über Bot-Commands", "Direct activation via Bot Commands"], ["Einlösung eines Gift-Codes", "Redemption of a Gift Code"], ["Empfang eines Event Gift-Codes", "Receipt of an Event Gift Code"], ["Manuelle Zuweisung durch das KyroX-Team bei Aktionen", "Manual assignment by the KyroX team during promotions"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Voraussetzung für die Beanspruchung ist stets ein gültiges Discord-Konto.",
                    "A valid Discord account is always required to claim Premium."
                  )}
                </p>
              </Section>

              <Section id="uebertragbarkeit-premium" num="32" title={t("Übertragbarkeit von Premium", "Transferability of Premium")} icon={User}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "User Premium ist an die Discord User ID gebunden und nicht auf andere Nutzer übertragbar. Server Premium ist an die Guild ID gebunden und nicht auf andere Server übertragbar.",
                    "User Premium is tied to the Discord User ID and is not transferable to other users. Server Premium is tied to the Guild ID and is not transferable to other servers."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Eine Übertragung bei Kontoverlust oder Serverlöschung wird seitens KyroX nicht zugesichert, kann aber im Einzelfall über den Support geprüft werden.",
                    "Transfer in the event of account loss or server deletion is not guaranteed by KyroX but can be reviewed on a case-by-case basis via support."
                  )}
                </p>
              </Section>

              <Section id="missbrauch-premium" num="33" title={t("Missbrauch von Premium-Systemen", "Abuse of Premium Systems")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Der Versuch, das Premium-System zu manipulieren, ist strengstens untersagt. Dazu gehört:",
                    "Attempts to manipulate the Premium system are strictly prohibited. This includes:"
                  )}
                </p>
                <RuleList items={L([
                  ["Nutzung von Exploits zur unberechtigten Freischaltung", "Using exploits for unauthorized activation"], ["Umgehung der 12-Monats-Prüfung", "Bypassing the 12-month check"], ["Manipulation von Bot-Interactions", "Manipulating Bot Interactions"], ["Mehrere gleichzeitige Premium-Abos auf einem Server durch Exploits", "Multiple concurrent Premium subs on one server via exploits"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Erkannter Missbrauch führt zur sofortigen Sperrung und Ungültigmachung des Premiums.",
                    "Detected abuse leads to immediate blocking and invalidation of Premium."
                  )}
                </p>
              </Section>

              <Section id="credits-manipulation" num="34" title={t("Credits-Manipulation", "Credits Manipulation")} icon={Coins}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Server Credits dürfen nicht durch Bugs, externe Tools oder Manipulationen an Bot-Commands vermehrt werden. Jede Form von Credits-Duplikation ist ein schwerwiegender Verstoß gegen diese Richtlinien.",
                    "Server Credits may not be increased through bugs, external tools, or manipulations of Bot Commands. Any form of Credit duplication is a serious violation of these policies."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Unrechtmäßig erlangte Credits werden ohne Vorankündigung auf den rechtmäßigen Stand korrigiert.",
                    "Illegally obtained Credits will be corrected to the lawful status without prior notice."
                  )}
                </p>
              </Section>

              <Section id="rueckzahlung-rueckerstattung" num="35" title={t("Rückzahlung und Rückerstattung", "Repayment and Refunds")} icon={CreditCard}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Da KyroX ein kostenloser Discord-Service ist und keine Echtgeldzahlungen für Premium oder Server Credits verlangt, bestehen keine Echtgeld-Rückerstattungsansprüche. Server Credits besitzen keinen Geldwert und können nicht in Echtgeld ausgezahlt werden.",
                    "Since KyroX is a free Discord service and does not charge real money for Premium or Server Credits, there are no real money refund claims. Server Credits have no monetary value and cannot be paid out in real money."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Unrechtmäßig erlangte interne Vorteile können ohne finanzielle Entschädigung zurückgesetzt werden.",
                    "Illegally obtained internal benefits can be reset without financial compensation."
                  )}
                </p>
              </Section>

              {/* EVENTS & ANGEBOTE */}
              <CategoryDivider title={t("EVENTS & ANGEBOTE", "EVENTS & OFFERS")} />

              <Section id="event-richtlinien" num="36" title={t("Event-Richtlinien", "Event Policies")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX kann zeitlich begrenzte Events durchführen, die besondere interne Vorteile offerieren. Die aktuell in KyroX über Bot-Commands angezeigten Event-Bedingungen sind stets maßgeblich. Events können kostenloses Premium, Premium Gift-Codes, interne Server Credit-Rabatte oder andere Vorteile umfassen.",
                    "KyroX can conduct time-limited events offering special internal benefits. The event conditions currently displayed in KyroX via Bot Commands are always decisive. Events can include free Premium, Premium Gift Codes, internal Server Credit discounts, or other benefits."
                  )}
                </p>
              </Section>

              <Section id="event-premium" num="37" title={t("Event Premium", "Event Premium")} icon={Crown}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Events können kostenloses User Premium ermöglichen. Wenn das bestehende System dafür einen Premium Gift Code erzeugt, wird dieser ausgestellt und muss entsprechend den Gift-Code-Regeln eingelöst werden.",
                    "Events can enable free User Premium. If the existing system generates a Premium Gift Code for this, it will be issued and must be redeemed according to the Gift Code rules."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Die bestehende 12-Monats-Prüfung des Gift-Systems wird hierbei berücksichtigt. Es wird kein direktes Premium vergeben, wenn das System technisch einen Gift-Code erzeugt.",
                    "The existing 12-month check of the Gift System is taken into account. Direct Premium is not granted if the system technically generates a Gift Code."
                  )}
                </p>
              </Section>

              <Section id="event-gift-codes" num="38" title={t("Event Gift-Codes", "Event Gift Codes")} icon={Gift}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Im Rahmen von Events können spezielle Gift-Codes erzeugt werden. Diese unterliegen den allgemeinen Regeln für Gift-Codes, können jedoch zusätzliche Event-spezifische Zuordnungen oder Laufzeiten besitzen.",
                    "Within the framework of events, special Gift Codes can be generated. These are subject to the general rules for Gift Codes but may have additional event-specific assignments or durations."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Auch hier gilt: Technische Grenzen wie die 12-Monats-Prüfung können nicht umgangen werden.",
                    "Here too, technical limits such as the 12-month check cannot be bypassed."
                  )}
                </p>
              </Section>

              <Section id="event-rabatte" num="39" title={t("Event-Rabatte", "Event Discounts")} icon={CreditCard}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Im Rahmen zeitlich begrenzter Events kann KyroX besondere Rabatte auf Server-Premium-Angebote bereitstellen. Der Begriff \"Rabatt\" bezieht sich bei KyroX ausschließlich auf interne Server Credits (z.B. weniger Server Credits erforderlich) und beinhaltet kein Echtgeld. Diese Rabatte müssen über Bot-Commands beansprucht werden und gelten nur während des aktiven Events.",
                    "As part of time-limited events, KyroX can offer special discounts on Server Premium offers. The term \"discount\" at KyroX refers exclusively to internal Server Credits (e.g., fewer Server Credits required) and does not involve real money. These discounts must be claimed via Bot Commands and are only valid during the active event."
                  )}
                </p>
              </Section>

              <Section id="globale-event-rabatte" num="40" title={t("Globale Event-Rabatte", "Global Event Discounts")} icon={Server}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Für Event-Rabatte gilt ein globales Prinzip:",
                    "A global principle applies to Event Discounts:"
                  )}
                </p>
                <RuleList items={L([
                  ["nur Server-Owner", "Server Owners only"], ["Rabatt gehört global zum Discord-User", "Discount belongs globally to the Discord User"], ["gilt für Server, auf denen dieser User Owner ist", "applies to servers where this user is Owner"], ["Rabatt kann nur einmal verwendet werden", "Discount can only be used once"], ["entweder Monthly ODER Lifetime", "either Monthly OR Lifetime"], ["nicht für beide Modelle gleichzeitig", "not for both models simultaneously"], ["erfolgreiche Verwendung verbraucht den Rabatt global", "successful usage consumes the discount globally"]
                ])} />
                <div className="bg-[#0d0e12] border border-blue-500/20 rounded-xl p-6 mt-4">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Info size={18} className="text-blue-400" /> {t("Beispiel", "Example")}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t(
                      "User A besitzt Server 1, Server 2 und Server 3. User A verwendet seinen Event-Rabatt auf Server 1 für einen Monthly-Premium-Kauf. Danach steht derselbe Rabatt auch auf Server 2 und Server 3 nicht mehr zur Verfügung.",
                      "User A owns Server 1, Server 2, and Server 3. User A uses their Event Discount on Server 1 for a Monthly Premium purchase. After that, the same discount is no longer available on Server 2 and Server 3."
                    )}
                  </p>
                </div>
              </Section>

              <Section id="event-cooldowns" num="41" title={t("Event-Cooldowns", "Event Cooldowns")} icon={Clock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn ein tatsächlich genutzter Event-Vorteil eine Sperre startet, wird ein entsprechender Cooldown im System hinterlegt. Beispielsweise kann das System eine 6-Monats-Sperre vorsehen. Es wird nicht durch das bloße Öffnen von Commands ein Cooldown gestartet, sondern erst durch die tatsächliche Nutzung eines Vorteils.",
                    "If an actually used Event benefit starts a lock, a corresponding cooldown is stored in the system. For example, the system may provide a 6-month lock. Opening commands does not start a cooldown; it is only triggered by the actual use of a benefit."
                  )}
                </p>
              </Section>

              <Section id="sonderregeln-events" num="42" title={t("Sonderregeln für Events", "Special Rules for Events")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Sonderregeln, wie beim Summer End Event, können von der 6-Monats-Prüfung abweichen und stattdessen die bestehende 12-Monats-Premium-Prüfung verwenden, sofern sie im System entsprechend implementiert sind.",
                    "Special rules, such as for the Summer End Event, may deviate from the 6-month check and instead use the existing 12-month Premium check, provided they are implemented accordingly in the system."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Solche Abweichungen werden im Bot zum Zeitpunkt des Events kommuniziert.",
                    "Such deviations are communicated in the bot at the time of the event."
                  )}
                </p>
              </Section>

              <Section id="ablauf-events" num="43" title={t("Ablauf von Events", "Event Expiration")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Nach Ende eines Events sind neue Claims und neue Rabatt-Nutzungen nicht mehr möglich. Ungenutzte Event-Rabatte können verfallen.",
                    "After the end of an event, new claims and new discount usages are no longer possible. Unused Event Discounts may expire."
                  )}
                </p>
                <InfoBox type="warning">
                  {t(
                    "Event-Rabatte dürfen nicht dauerhaft nach dem Event verwendbar bleiben. Wenn ein Rabatt am 26.08 endet, darf er beispielsweise am 27.08 nicht mehr verwendet werden.",
                    "Event Discounts may not remain usable permanently after the event. If a discount ends on 26.08, it cannot be used on 27.08, for example."
                  )}
                </InfoBox>
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Bereits ordnungsgemäß erhaltenes Premium besitzt seine eigene Laufzeit und verschwindet nicht automatisch mit dem Event-Ende.",
                    "Premium that has already been properly obtained has its own duration and does not automatically disappear when the event ends."
                  )}
                </p>
              </Section>

              <Section id="verfall-event-vorteile" num="44" title={t("Verfall von Event-Vorteilen", "Expiration of Event Benefits")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Alle Vorteile, die bis zum Ende des Events nicht erfolgreich über die entsprechenden Bot-Commands beansprucht wurden, verfallen ersatzlos. Ein nachträglicher Claim ist technisch nicht möglich und wird auch nicht manuell gewährt.",
                    "All benefits that have not been successfully claimed via the appropriate Bot Commands by the end of the event expire without replacement. A subsequent claim is technically impossible and will not be granted manually."
                  )}
                </p>
              </Section>

              <Section id="spooky-deals" num="45" title={t("Spooky Deals", "Spooky Deals")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Die Spooky Deals sind ein jährliches Event im Zeitraum vom 31.10 bis zum 07.11. In diesem Zeitraum können besondere Rabatte auf Server Premium oder kostenlose Gift-Codes beansprucht werden.",
                    "The Spooky Deals are an annual event from 31.10 to 07.11. During this period, special discounts on Server Premium or free Gift Codes can be claimed."
                  )}
                </p>
              </Section>

              <Section id="christmas-deals" num="46" title={t("Christmas Deals", "Christmas Deals")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Die Christmas Deals finden jährlich vom 24.12 bis zum 31.12 statt. Angeboten werden in der Regel vergünstigte Lifetime- oder Monthly-Premium-Optionen für Server (in internen Server Credits).",
                    "The Christmas Deals take place annually from 24.12 to 31.12. They usually offer discounted Lifetime or Monthly Premium options for servers (in internal Server Credits)."
                  )}
                </p>
              </Section>

              <Section id="anniversary-rewards" num="47" title={t("Anniversary Rewards", "Anniversary Rewards")} icon={Gift}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Vom 04.01 bis zum 10.01 jährlich finden die Anniversary Rewards statt, mit denen der Geburtstag von KyroX gefeiert wird. Nutzer können hierbei spezielle Event-Gift-Codes beanspruchen.",
                    "From 04.01 to 10.01 annually, the Anniversary Rewards take place, celebrating KyroX's birthday. Users can claim special Event Gift Codes."
                  )}
                </p>
              </Section>

              <Section id="kyrox-day-offers" num="48" title={t("KyroX Day Offers", "KyroX Day Offers")} icon={CreditCard}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Am 15.05 bis zum 16.05 jährlich finden die KyroX Day Offers statt. Ein kurzes Event mit stark limitierten Angeboten oder Rabatten.",
                    "On 15.05 to 16.05 annually, the KyroX Day Offers take place. A short event with highly limited offers or discounts."
                  )}
                </p>
              </Section>

              <Section id="summer-end-event" num="49" title={t("Summer End Event", "Summer End Event")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Das Summer End Event läuft vom 19.08 bis zum 26.08. Es besitzt oft Sonderregeln, wie die Nutzung der 12-Monats-Premium-Prüfung statt der regulären 6-Monats-Sperre, und bietet umfangreiche End-of-Summer-Vorteile.",
                    "The Summer End Event runs from 19.08 to 26.08. It often features special rules, such as using the 12-month Premium check instead of the regular 6-month lock, and offers extensive End-of-Summer benefits."
                  )}
                </p>
              </Section>

              {/* SERVER & BOT-FUNKTIONEN */}
              <CategoryDivider title={t("SERVER & BOT-FUNKTIONEN", "SERVER & BOT FEATURES")} />

              <Section id="moderation-sicherheit" num="50" title={t("Moderation & Sicherheit", "Moderation & Security")} icon={Shield}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX stellt verschiedene Funktionen zur Moderation und Sicherung von Discord-Servern bereit. Dazu gehören:",
                    "KyroX provides various functions for moderating and securing Discord servers. These include:"
                  )}
                </p>
                <RuleList items={L([
                  ["Warn", "Warn"], ["Timeout", "Timeout"], ["Mute", "Mute"], ["Kick", "Kick"], ["Ban", "Ban"], ["Anti-Spam", "Anti-Spam"], ["Anti-Raid", "Anti-Raid"], ["Auto-Moderation", "Auto-Moderation"], ["Logging", "Logging"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Automatisierte Systeme können abhängig sein von Discord Permissions, der Rollen-Hierarchie, der Serverkonfiguration, der Discord API und technischen Fehlern. Server-Owner sind für die korrekte Konfiguration verantwortlich.",
                    "Automated systems can depend on Discord Permissions, Role Hierarchy, Server Configuration, Discord API, and technical errors. Server Owners are responsible for correct configuration."
                  )}
                </p>
              </Section>

              <Section id="auto-moderation" num="51" title={t("Auto-Moderation", "Auto-Moderation")} icon={Bot}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Die Auto-Moderation von KyroX erkennt automatisch Verstöße wie Spam, unzulässige Wörter oder massenhaftes Erwähnen von Nutzern und greift konfigurierbar ein.",
                    "KyroX's Auto-Moderation automatically detects violations such as spam, disallowed words, or mass mentions of users and intervenes in a configurable manner."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Da automatische Erkennungssysteme fehleranfällig sein können (False Positives), sollte die Auto-Moderation sinnvoll konfiguriert und regelmäßig von den Administratoren überprüft werden.",
                    "Since automatic detection systems can be prone to errors (False Positives), Auto-Moderation should be configured sensibly and checked regularly by administrators."
                  )}
                </p>
              </Section>

              <Section id="ticket-system" num="52" title={t("Ticket-System", "Ticket System")} icon={Ticket}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX bietet ein vollwertiges Ticket-System für den Support und die Verwaltung auf Discord-Servern. Dazu gehören:",
                    "KyroX offers a full-fledged Ticket System for support and management on Discord servers. This includes:"
                  )}
                </p>
                <RuleList items={L([
                  ["Ticket-Erstellung über Buttons/Panels", "Ticket creation via Buttons/Panels"], ["Ticket-Kategorien", "Ticket Categories"], ["Team-Zuweisung", "Team Assignment"], ["Ticket-Schließung", "Ticket Closing"], ["Logs", "Logs"], ["Transcripts", "Transcripts"], ["Berechtigungen", "Permissions"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Die Konfiguration obliegt den Server-Ownern und Administratoren.",
                    "Configuration is the responsibility of the Server Owners and administrators."
                  )}
                </p>
              </Section>

              <Section id="ticket-kategorien-zuweisung" num="53" title={t("Ticket-Kategorien und Zuweisung", "Ticket Categories and Assignment")} icon={Users}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Tickets können in verschiedene Kategorien unterteilt werden (z.B. Allgemeiner Support, Bug-Report, Bewerbung). Das Team kann einzelnen Mitgliedern Tickets zuweisen, um Zuständigkeiten klar zu regeln.",
                    "Tickets can be divided into different categories (e.g., General Support, Bug Report, Application). The team can assign tickets to individual members to clarify responsibilities."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Dies erfordert eine korrekte Vergabe von Bot-Berechtigungen für die jeweiligen Team-Rollen.",
                    "This requires correct allocation of Bot Permissions for the respective team roles."
                  )}
                </p>
              </Section>

              <Section id="ticket-transcripts" num="54" title={t("Ticket-Transcripts", "Ticket Transcripts")} icon={Archive}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Transcripts dienen der Nachvollziehbarkeit geschlossener Tickets. Je nach Funktion können sie folgende Informationen enthalten:",
                    "Transcripts serve to trace closed tickets. Depending on the function, they can contain the following information:"
                  )}
                </p>
                <RuleList items={L([
                  ["Nachrichten", "Messages"], ["Nutzernamen", "Usernames"], ["Avatare", "Avatars"], ["Zeitstempel", "Timestamps"], ["Attachments", "Attachments"], ["Embeds", "Embeds"], ["Bot-Nachrichten", "Bot Messages"], ["Components V2 Inhalte", "Components V2 Content"], ["Ticketinformationen", "Ticket Information"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Sie dienen ausschließlich der Dokumentation.",
                    "They serve exclusively for documentation."
                  )}
                </p>
              </Section>

              <Section id="backups" num="55" title={t("Backups", "Backups")} icon={Database}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX kann Backups von Discord-Servern erstellen (z. B. Channels, Rollen, Einstellungen). Es wird jedoch keine absolute Garantie für eine vollständige Wiederherstellung übernommen.",
                    "KyroX can create backups of Discord servers (e.g., Channels, Roles, Settings). However, no absolute guarantee is given for a complete restoration."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Wiederherstellungen können beispielsweise durch die Discord API, fehlende Berechtigungen, geänderte Discord-Funktionen, inzwischen entfernte Ressourcen oder technische Änderungen beeinflusst werden.",
                    "Restorations can be influenced, for example, by the Discord API, missing permissions, changed Discord functions, removed resources, or technical changes."
                  )}
                </p>
              </Section>

              <Section id="wiederherstellung-backups" num="56" title={t("Wiederherstellung von Backups", "Backup Restoration")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Die Wiederherstellung eines Backups überschreibt aktuelle Einstellungen. Es liegt in der Verantwortung des Server-Owners, sicherzustellen, dass das richtige Backup ausgewählt wird.",
                    "Restoring a backup overwrites current settings. It is the responsibility of the Server Owner to ensure that the correct backup is selected."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Durch KyroX verursachte Datenverluste infolge fehlgeschlagener Backups werden nicht entschädigt, da der Prozess stark von externen Discord-Faktoren abhängt.",
                    "Data loss caused by KyroX as a result of failed backups is not compensated, as the process depends heavily on external Discord factors."
                  )}
                </p>
              </Section>

              <Section id="automatisierungen" num="57" title={t("Automatisierungen", "Automations")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX verfügt über verschiedene automatisierte Systeme. Beispiele hierfür sind:",
                    "KyroX has various automated systems. Examples of this are:"
                  )}
                </p>
                <RuleList items={L([
                  ["Level System", "Level System"], ["Counting", "Counting"], ["Welcome", "Welcome"], ["Goodbye", "Goodbye"], ["Moderation", "Moderation"], ["Premium-Ablauf", "Premium Expiration"], ["Event-Erkennung", "Event Detection"], ["Rollen", "Roles"], ["Tickets", "Tickets"], ["Logs", "Logs"], ["Backups", "Backups"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Automatisierungen können durch technische Abhängigkeiten wie fehlende Rechte, Bot-Ausfälle, Discord-Ausfälle oder API-Änderungen beeinträchtigt werden.",
                    "Automations can be affected by technical dependencies such as missing rights, bot outages, Discord outages, or API changes."
                  )}
                </p>
              </Section>

              <Section id="logging" num="58" title={t("Logging", "Logging")} icon={FileText}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX bietet umfangreiche Logging-Funktionen, um Aktivitäten auf dem Discord-Server nachzuverfolgen. Dazu können Moderationsaktionen, Nutzungsänderungen, Ticket-Aktivitäten und weitere serverrelevante Ereignisse protokolliert werden.",
                    "KyroX offers extensive logging functions to track activities on the Discord server. This can include moderation actions, role changes, ticket activities, and other server-relevant events."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Die Protokollierung erfordert eine korrekte Konfiguration der Berechtigungen und Ziel-Channels durch die Server-Administration.",
                    "Logging requires correct configuration of permissions and target channels by the server administration."
                  )}
                </p>
              </Section>

              <Section id="level-system" num="59" title={t("Level-System", "Level System")} icon={Bot}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Das Level-System belohnt Nutzer für Aktivität im Chat mit Erfahrungspunkten (XP) und Levels. Es können Rollen-Rewards für bestimmte Level konfiguriert werden.",
                    "The Level System rewards users for chat activity with Experience Points (XP) and Levels. Role rewards can be configured for specific levels."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Das systematische Ausnutzen von XP-Farming (z. B. durch Spammen in ignorierten Channels) kann zum Reset des Levels führen.",
                    "Systematic exploitation of XP farming (e.g., by spamming in ignored channels) can lead to a level reset."
                  )}
                </p>
              </Section>

              <Section id="counting" num="60" title={t("Counting", "Counting")} icon={Bot}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Das Counting-Modul ermöglicht es Nutzern, in einem bestimmten Channel gemeinsam hochzuzählen. Der Bot überprüft dabei, ob die nächste Zahl korrekt ist.",
                    "The Counting module allows users to count up together in a specific channel. The bot checks whether the next number is correct."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Falsche Eingaben, Spam oder das Zerstören des Countings können zu Konsequenzen führen, die vom Server-Team konfiguriert werden können.",
                    "Incorrect entries, spam, or ruining the counting can lead to consequences that can be configured by the server team."
                  )}
                </p>
              </Section>

              <Section id="welcome-goodbye" num="61" title={t("Welcome & Goodbye", "Welcome & Goodbye")} icon={MessageSquare}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX kann automatisierte Nachrichten senden, wenn ein Nutzer dem Server beitritt (Welcome) oder diesen verlässt (Goodbye). Diese Nachrichten können über Embeds angepasst werden.",
                    "KyroX can send automated messages when a user joins the server (Welcome) or leaves it (Goodbye). These messages can be customized via Embeds."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Bei hohen Member-Zu- oder Abgängen kann es zu Verzögerungen kommen, um Discord Rate-Limits nicht zu verletzen.",
                    "In the event of high member joins or leaves, there may be delays so as not to violate Discord Rate Limits."
                  )}
                </p>
              </Section>

              <Section id="embeds-team-verwaltung" num="62" title={t("Embeds und Team Verwaltung", "Embeds and Team Management")} icon={Users}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX erlaubt das Erstellen und Senden von benutzerdefinierten Embeds. Zudem können über das Team-Modul spezifische Bot-Berechtigungen an Server-Mitglieder zugewiesen werden, ohne ihnen Discord-Administratorrechte geben zu müssen.",
                    "KyroX allows the creation and sending of custom Embeds. In addition, the Team module can be used to assign specific Bot Permissions to server members without having to give them Discord administrator rights."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Die Vergabe dieser Rechte liegt beim Server-Owner und sollte mit Bedacht erfolgen.",
                    "The granting of these rights lies with the Server Owner and should be done with care."
                  )}
                </p>
              </Section>

              {/* DATENSCHUTZ */}
              <CategoryDivider title={t("DATENSCHUTZ", "PRIVACY")} />

              <Section id="datenschutz" num="63" title={t("Datenschutz", "Privacy")} icon={Lock}>
                <p className="mb-5 leading-[1.75]">
                  {t(
                    "Informationen zur Verarbeitung personenbezogener und technischer Daten bei der Nutzung des KyroX Discord-Bots. Dieser Bereich erläutert, welche Daten erhoben, zu welchem Zweck sie verwendet und wie sie geschützt werden.",
                    "Information on the processing of personal and technical data when using the KyroX Discord bot. This section explains which data is collected, for what purpose it is used, and how it is protected."
                  )}
                </p>
                <InfoBox title={t("Wichtig", "Important")} icon={Info} type="security">
                  {t(
                    "KyroX verarbeitet technische Daten, soweit diese für die Bereitstellung der Bot-Funktionen erforderlich sind. Eine detaillierte Übersicht befindet sich in den nachfolgenden Abschnitten.",
                    "KyroX processes technical data insofar as it is necessary for the provision of the bot functions. A detailed overview can be found in the following sections."
                  )}
                </InfoBox>
              </Section>

              <Section id="verarbeitete-discord-daten" num="64" title={t("Verarbeitete Discord-Daten", "Processed Discord Data")} icon={Database}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX verarbeitet folgende Kategorien von Discord-Daten, soweit diese für die Funktion erforderlich sind:",
                    "KyroX processes the following categories of Discord data insofar as they are necessary for the function:"
                  )}
                </p>
                <RuleList items={L([
                  ["Discord User ID", "Discord User ID"], ["Discord Guild ID", "Discord Guild ID"], ["Channel ID", "Channel ID"], ["Role ID", "Role ID"], ["Message ID", "Message ID"], ["Benutzername", "Username"], ["Servername", "Server Name"], ["Avatar (sofern für eine Funktion benötigt)", "Avatar (if required for a function)"], ["Serverinformationen", "Server Information"], ["Server-Konfiguration", "Server Configuration"], ["Premium-Daten", "Premium Data"], ["Server-Credits", "Server Credits"], ["Event-Claims", "Event Claims"], ["Gift-Code-Daten", "Gift Code Data"], ["Ticket-Daten", "Ticket Data"], ["Transcript-Inhalte", "Transcript Content"], ["Logs", "Logs"], ["Backup-Daten", "Backup Data"]
                ])} />
              </Section>

              <Section id="zwecke-datenverarbeitung" num="65" title={t("Zwecke der Datenverarbeitung", "Purposes of Data Processing")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Die Verarbeitung der Daten dient folgenden Zwecken:",
                    "The processing of the data serves the following purposes:"
                  )}
                </p>
                <RuleList items={L([
                  ["Bereitstellung des Bots", "Provision of the bot"], ["Zuordnung von Nutzern", "Mapping of users"], ["Serverkonfiguration", "Server configuration"], ["Premium-Verwaltung", "Premium management"], ["Credits", "Credits"], ["Events", "Events"], ["Gift Codes", "Gift Codes"], ["Tickets", "Tickets"], ["Transcripts", "Transcripts"], ["Moderation", "Moderation"], ["Sicherheit", "Security"], ["Logging", "Logging"], ["Backups", "Backups"]
                ])} />
              </Section>

              <Section id="server-konfigurationsdaten" num="66" title={t("Server- und Konfigurationsdaten", "Server and Configuration Data")} icon={Server}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Einstellungen, die von Server-Ownern oder Administratoren in KyroX vorgenommen werden (wie Moderationsregeln, Ticket-Kategorien, Level-Einstellungen etc.), werden gespeichert, um den Bot auf dem Server aufrechtzuerhalten.",
                    "Settings made by Server Owners or administrators in KyroX (such as moderation rules, ticket categories, level settings, etc.) are saved to maintain the bot on the server."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Diese Daten sind an die Guild ID gebunden und werden entsprechend der Regelungen zur Beendigung der Nutzung behandelt.",
                    "This data is linked to the Guild ID and is treated in accordance with the regulations on termination of use."
                  )}
                </p>
              </Section>

              <Section id="ticket-transcript-daten" num="67" title={t("Ticket- & Transcript-Daten", "Ticket & Transcript Data")} icon={Ticket}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn das Ticket-System genutzt wird, werden relevante Ticket-Informationen und Nachrichteninhalte für Transcripts gespeichert. Dies umfasst Nachrichten, Nutzernamen, Zeitstempel und ggf. Attachments.",
                    "When the Ticket System is used, relevant ticket information and message content are saved for transcripts. This includes messages, usernames, timestamps, and, if applicable, attachments."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Diese Daten dienen ausschließlich der Dokumentation und Nachvollziehbarkeit von Support-Anliegen und können von den Server-Administratoren verwaltet werden.",
                    "This data serves exclusively to document and trace support requests and can be managed by the server administrators."
                  )}
                </p>
              </Section>

              <Section id="speicherungen-loeschung" num="68" title={t("Speicherungen & Löschung", "Storage & Deletion")} icon={Database}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Daten werden gespeichert, solange der entsprechende Dienst auf einem Server aktiv genutzt wird oder KyroX für die Erfüllung der genannten Zwecke benötigt wird.",
                    "Data is stored as long as the corresponding service is actively used on a server or as long as KyroX is needed to fulfill the mentioned purposes."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Spezifische Löschfristen werden entsprechend den rechtlichen Anforderungen und den technischen Notwendigkeiten festgelegt. Wenn keine konkrete Frist bekannt ist, gilt die Speicherdauer bis zur Beendigung der Nutzung oder bis zur Geltendmachung eines Löschanspruchs.",
                    "Specific deletion deadlines are determined in accordance with legal requirements and technical necessities. If no specific deadline is known, the storage period applies until use is terminated or a deletion claim is asserted."
                  )}
                </p>
                <InfoBox>
                  {t(
                    "Event-Cooldowns sind technische Sperren und keine automatischen Datenschutz-Aufbewahrungsfristen.",
                    "Event cooldowns are technical locks and not automatic privacy retention periods."
                  )}
                </InfoBox>
              </Section>

              <Section id="weitergabe-drittanbieter" num="69" title={t("Weitergabe & Drittanbieter", "Sharing & Third Parties")} icon={ExternalLink}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX ist abhängig von externen Plattformen wie Discord und deren technischen Diensten. Daten werden an Discord übermittelt, um die Funktionen auszuführen.",
                    "KyroX depends on external platforms like Discord and their technical services. Data is transmitted to Discord to execute the functions."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Weitere Drittanbieter (wie Hosting- oder Datenbankanbieter) werden genutzt, um den Dienst bereitzustellen. Es werden keine Daten zu Analysezwecken an unbekannte Dritte weitergegeben.",
                    "Other third parties (such as hosting or database providers) are used to provide the service. No data is passed on to unknown third parties for analysis purposes."
                  )}
                </p>
              </Section>

              <Section id="sicherheit-daten" num="70" title={t("Sicherheit von Daten", "Data Security")} icon={Shield}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX bemüht sich, angemessene technische und organisatorische Maßnahmen zu treffen, um die verarbeiteten Daten vor unbefugtem Zugriff, Verlust oder Zerstörung zu schützen.",
                    "KyroX endeavors to take appropriate technical and organizational measures to protect the processed data from unauthorized access, loss, or destruction."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Dennoch kann bei internetbasierten Diensten eine absolute Sicherheit nicht garantiert werden.",
                    "Nevertheless, absolute security cannot be guaranteed for internet-based services."
                  )}
                </p>
              </Section>

              <Section id="bot-interne-datenverarbeitung" num="71" title={t("Bot-Interne Datenverarbeitung", "Bot-Internal Data Processing")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Zur Gewährleistung schneller Bot-Antworten werden bestimmte Daten (wie User IDs, Premium-Status, Cooldowns) im Arbeitsspeicher (Cache) oder in internen Datenbanken zwischengespeichert.",
                    "To ensure fast bot responses, certain data (such as User IDs, Premium status, cooldowns) is cached in the working memory (cache) or in internal databases."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Diese Daten werden nicht an Dritte weitergegeben und dienen ausschließlich der technischen Funktionalität der Commands und Automatisierungen.",
                    "This data is not passed on to third parties and serves exclusively the technical functionality of the commands and automations."
                  )}
                </p>
              </Section>

              <Section id="rechte-datenschutzanfragen" num="72" title={t("Rechte & Datenschutzanfragen", "Rights & Privacy Requests")} icon={User}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Nutzer haben das Recht, sich über die Verarbeitung ihrer Daten zu informieren und ggf. Auskunft, Berichtigung oder Löschung zu verlangen.",
                    "Users have the right to inform themselves about the processing of their data and, if necessary, to demand information, correction, or deletion."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Datenschutzanfragen können über den offiziellen KyroX Discord Support Server gestellt werden. Die Anwendbarkeit spezifischer rechtlicher Ansprüche hängt vom Betreiberland ab.",
                    "Privacy requests can be made via the official KyroX Discord Support Server. The applicability of specific legal claims depends on the country of the operator."
                  )}
                </p>
                <InfoBox>
                  {t("Betreiber: KyroX™ Official", "Operator: KyroX™ Official")}<br/>
                  {t("Datenschutz-Kontakt: Über den offiziellen Discord Support Server", "Privacy Contact: Via the official Discord Support Server")}
                </InfoBox>
              </Section>

              {/* DIENST & RECHTLICHES */}
              <CategoryDivider title={t("DIENST & RECHTLICHES", "SERVICE & LEGAL")} />

              <Section id="haftung" num="73" title={t("Haftung", "Liability")} icon={Gavel}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX ist ein technischer Dienst. Trotz angemessener Sorgfalt können technische Fehler auftreten. Der Dienst ist auf die Verfügbarkeit der Discord-Plattform angewiesen; Ausfälle oder Änderungen durch Discord können den Betrieb beeinflussen.",
                    "KyroX is a technical service. Despite reasonable care, technical errors may occur. The service relies on the availability of the Discord platform; outages or changes by Discord can affect operations."
                  )}
                </p>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Nutzer sind für die Serverkonfigurationen und die Vergabe von Berechtigungen selbst verantwortlich. Eine vollständige pauschale Haftungsfreistellung wird nicht gewährt, jedoch werden gesetzlich zwingende Haftlungen nicht ausgeschlossen.",
                    "Users are responsible for server configurations and the allocation of permissions themselves. A complete general liability exemption is not granted, but legally mandatory liabilities are not excluded."
                  )}
                </p>
                <div className="bg-[#0d0e12] border border-blue-500/20 rounded-xl p-6">
                  <p className="text-sm text-slate-400 mb-3 font-medium">{t("Haftungsansprüche bestehen insbesondere bei:", "Liability claims exist in particular for:")}</p>
                  <RuleList items={L([
                    ["Vorsatz", "Intent"], ["grober Fahrlässigkeit", "Gross negligence"], ["Verletzung von Leben, Körper oder Gesundheit", "Breach of life, body, or health"], ["gesetzlich zwingender Haftung", "Legally mandatory liability"]
                  ])} />
                </div>
              </Section>

              <Section id="beendigung-aenderungen-richtlinien" num="74" title={t("Beendigung & Änderungen der Richtlinien", "Termination & Policy Changes")} icon={FileText}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Nutzer können die Nutzung von KyroX jederzeit beenden. Server-Owner können KyroX von ihrem Server entfernen. Die Behandlung gespeicherter Daten richtet sich nach den Datenschutzbestimmungen. Spezifische Löschfristen werden nicht zugesichert, sofern keine rechtlichen Notwendigkeiten bestehen.",
                    "Users can stop using KyroX at any time. Server Owners can remove KyroX from their server. The handling of stored data is governed by privacy regulations. Specific deletion deadlines are not guaranteed unless legally required."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Diese Richtlinien können aktualisiert werden, wenn sich beispielsweise KyroX Funktionen, technische Systeme, Sicherheitsanforderungen oder rechtliche Anforderungen ändern. Das Aktualisierungsdatum ist oben auf der Seite sichtbar. Bei wichtigen Änderungen kann eine angemessene Information der Nutzer über verfügbare Kommunikationswege erfolgen.",
                    "These policies may be updated if, for example, KyroX functions, technical systems, security requirements, or legal requirements change. The update date is visible at the top of the page. In the event of important changes, reasonable information may be provided to users via available communication channels."
                  )}
                </p>
              </Section>

              <Section id="kontakt-support" num="75" title={t("Kontakt & Support", "Contact & Support")} icon={MessageSquare}>
                <div className="bg-gradient-to-br from-[#11131a] to-[#0d0e12] border border-[#1e2028] rounded-2xl p-7 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Headphones className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{t("Fragen zu den Richtlinien?", "Questions about the policies?")}</h3>
                  </div>
                  <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed">
                    {t(
                      "Wenn du Fragen zur Nutzung von KyroX, diesen Richtlinien oder zum Datenschutz hast, kannst du dich jederzeit über unseren offiziellen Discord Support Server an uns wenden. Supportanfragen können über den offiziellen KyroX Discord-Server gestellt werden.",
                      "If you have questions about using KyroX, these policies, or privacy, you can reach out to us anytime via our official Discord Support Server. Support requests can be made via the official KyroX Discord server."
                    )}
                  </p>
                  
                  <div className="grid gap-4">
                    <a href="https://discord.gg/JFaDGaFkk5" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[#0a0b0e] border border-[#1e2028] rounded-xl p-5 hover:border-blue-500/50 hover:bg-[#11131a] transition-all group min-h-[56px]">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                        <MessageSquare className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors">{t("KyroX Support", "KyroX Support")}</p>
                        <p className="text-sm text-slate-500 transition-colors truncate">{t("Discord Support Server", "Discord Support Server")}</p>
                      </div>
                      <ExternalLink size={20} className="text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                    </a>
                  </div>

                  <div className="mt-7 pt-5 border-t border-[#1e2028] text-xs md:text-sm text-slate-500 flex flex-wrap gap-4">
                    <span>{t("Betreiber: KyroX™ Official", "Operator: KyroX™ Official")}</span>
                  </div>
                </div>
              </Section>

              {/* KOSTENLOSER SERVICE & PREMIUM */}
              <CategoryDivider title={t("KOSTENLOSER SERVICE & PREMIUM", "FREE SERVICE & PREMIUM")} />

              <Section id="kostenloser-dienst" num="76" title={t("Kostenloser Dienst", "Free Service")} icon={Gift}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX wird grundsätzlich kostenlos bereitgestellt. Für die Nutzung des Bots wird kein allgemeiner Mitgliedsbeitrag verlangt. KyroX verlangt aktuell kein echtes Geld für interne Premium-Funktionen oder Server Credits.",
                    "KyroX is basically provided free of charge. No general membership fee is required to use the bot. KyroX currently does not charge real money for internal Premium functions or Server Credits."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Premium bedeutet innerhalb von KyroX eine zusätzliche interne Funktionsstufe und nicht automatisch ein kostenpflichtiges Produkt.",
                    "Within KyroX, Premium means an additional internal functional level and not automatically a paid product."
                  )}
                </p>
              </Section>

              <Section id="keine-echtgeld-abonnements" num="77" title={t("Keine Echtgeld-Abonnements", "No Real Money Subscriptions")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Monthly Premium bezeichnet eine zeitlich begrenzte Premium-Laufzeit innerhalb von KyroX. Der Begriff \"Monthly\" bedeutet NICHT automatisch:",
                    "Monthly Premium refers to a time-limited Premium duration within KyroX. The term \"Monthly\" does NOT automatically mean:"
                  )}
                </p>
                <RuleList items={L([
                  ["kostenpflichtiges Abonnement", "paid subscription"], ["automatische Abbuchung", "automatic deduction"], ["monatliche Geldzahlung", "monthly money payment"], ["Vertrag mit wiederkehrender Zahlung", "contract with recurring payment"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "KyroX verlangt dafür aktuell kein echtes Geld.",
                    "KyroX currently does not charge real money for this."
                  )}
                </p>
              </Section>

              <Section id="lifetime-premium" num="78" title={t("Lifetime Premium", "Lifetime Premium")} icon={InfinityIcon}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Lifetime Premium bezeichnet eine Premium-Stufe ohne reguläres zeitliches Ablaufdatum innerhalb des KyroX-Systems. Es wird dafür aktuell kein echtes Geld verlangt.",
                    "Lifetime Premium refers to a Premium tier without a regular time-based expiration date within the KyroX system. No real money is currently charged for this."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "\"Lifetime\" bedeutet die Laufzeit des jeweiligen KyroX-Premiumstatus und ist keine Garantie dafür, dass der gesamte KyroX-Dienst unbegrenzt für immer betrieben wird.",
                    "\"Lifetime\" means the duration of the respective KyroX Premium status and is not a guarantee that the entire KyroX service will be operated indefinitely forever."
                  )}
                </p>
              </Section>

              <Section id="server-credits-ohne-echtgeldwert" num="79" title={t("Server Credits ohne Echtgeldwert", "Server Credits Without Real Money Value")} icon={Coins}>
                <p className="mb-4 leading-[1.75]">{t("Server Credits:", "Server Credits:")}</p>
                <RuleList items={L([
                  ["werden innerhalb von KyroX genutzt", "are used within KyroX"], ["besitzen keinen garantierten Echtgeldwert", "have no guaranteed real money value"], ["können nicht als Geld ausgezahlt werden", "cannot be paid out as money"], ["stellen keine Kryptowährung dar", "do not represent a cryptocurrency"], ["stellen kein Bankguthaben dar", "do not represent bank credit"], ["stellen kein gesetzliches Zahlungsmittel dar", "do not represent legal tender"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "KyroX verkauft Server Credits aktuell nicht gegen echtes Geld.",
                    "KyroX currently does not sell Server Credits for real money."
                  )}
                </p>
              </Section>

              <Section id="kein-handel-credits" num="80" title={t("Kein Handel mit Credits", "No Trading of Credits")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Der inoffizielle Handel mit Server Credits ist untersagt. Nutzer dürfen Server Credits nicht:",
                    "Unofficial trading of Server Credits is prohibited. Users may not:"
                  )}
                </p>
                <RuleList items={L([
                  ["gegen echtes Geld verkaufen", "sell for real money"], ["gegen externe Güter tauschen", "trade for external goods"], ["über Drittanbieter-Marktplätze anbieten", "offer via third-party marketplaces"], ["gegen andere digitale Werte handeln", "trade for other digital values"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Dies gilt, sofern KyroX dafür keine offizielle Funktion vorsieht.",
                    "This applies unless KyroX provides an official function for this."
                  )}
                </p>
              </Section>

              <Section id="kein-verkauf-premium" num="81" title={t("Kein Verkauf von Premium", "No Sale of Premium")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "User dürfen KyroX Premium nicht eigenständig gegen echtes Geld verkaufen. Untersagt sind beispielsweise:",
                    "Users may not independently sell KyroX Premium for real money. Prohibited examples include:"
                  )}
                </p>
                <RuleList items={L([
                  ["Verkauf eines Premium-Status", "Sale of a Premium status"], ["Verkauf von Premium-Gift-Codes", "Sale of Premium Gift Codes"], ["Verkauf von Event-Vorteilen", "Sale of Event benefits"], ["Verkauf von Event-Rabatten", "Sale of Event discounts"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Dies gilt, wenn KyroX hierfür keine offizielle Funktion bereitstellt.",
                    "This applies if KyroX does not provide an official function for this."
                  )}
                </p>
              </Section>

              <Section id="keine-automatischen-zahlungen" num="82" title={t("Keine automatischen Zahlungen", "No Automatic Payments")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX führt aktuell keine automatischen Echtgeld-Abbuchungen durch. Monthly Premium verlängert sich nicht automatisch über eine Geldzahlung. Keine Kreditkarten oder Bankdaten erforderlich.",
                    "KyroX currently does not make automatic real money deductions. Monthly Premium does not renew automatically via a money payment. No credit cards or bank details required."
                  )}
                </p>
              </Section>

              <Section id="keine-zahlungsdaten" num="83" title={t("Keine Zahlungsdaten", "No Payment Data")} icon={Lock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Da KyroX aktuell keine Echtgeldzahlungen anbietet, benötigt KyroX für seine Premium- und Credits-Funktionen grundsätzlich keine Zahlungsdaten wie:",
                    "Since KyroX currently does not offer real money payments, KyroX generally does not require payment data for its Premium and Credits functions, such as:"
                  )}
                </p>
                <RuleList items={L([
                  ["Kreditkartennummer", "Credit card number"], ["Bankkonto", "Bank account"], ["PayPal-Konto", "PayPal account"], ["Rechnungsadresse", "Billing address"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Es wird nicht behauptet, dass solche Daten verarbeitet werden.",
                    "It is not claimed that such data is processed."
                  )}
                </p>
              </Section>

              <Section id="premium-internes-vorteilssystem" num="84" title={t("Premium als internes Vorteilssystem", "Premium as Internal Benefit System")} icon={Crown}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Premium ist ein internes KyroX-System für zusätzliche Funktionen oder Berechtigungen. Premium kann beispielsweise vergeben werden durch:",
                    "Premium is an internal KyroX system for additional functions or permissions. Premium can be awarded, for example, through:"
                  )}
                </p>
                <RuleList items={L([
                  ["Gift-Codes", "Gift Codes"], ["Events", "Events"], ["interne KyroX-Funktionen", "internal KyroX functions"], ["berechtigte Administrationsvorgänge", "authorized administrative actions"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Keine Echtgeld-Beziehung daraus ableiten.",
                    "No real money relationship should be derived from this."
                  )}
                </p>
              </Section>

              <Section id="premium-status" num="85" title={t("Premium-Status", "Premium Status")} icon={Info}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Ein Premium-Status kann technisch gespeichert werden mit:",
                    "A Premium status can be technically saved with:"
                  )}
                </p>
                <RuleList items={L([
                  ["Nutzerzuordnung", "User mapping"], ["Typ", "Type"], ["Aktivierungszeit", "Activation time"], ["Ablaufzeit", "Expiration time"], ["Quelle", "Source"]
                ])} />
                <p className="mt-4 leading-[1.75]">
                  {t(
                    "Nur tatsächlich verwendete Daten werden beschrieben.",
                    "Only actually used data is described."
                  )}
                </p>
              </Section>

              <Section id="premium-verlaengerung" num="86" title={t("Premium-Verlängerung", "Premium Extension")} icon={Clock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Temporäres Premium kann durch legitime KyroX-Funktionen verlängert werden. Eine Verlängerung muss die vorhandenen Limits berücksichtigen. Manipulative oder technische Umgehungen sind untersagt.",
                    "Temporary Premium can be extended through legitimate KyroX functions. An extension must take existing limits into account. Manipulative or technical bypasses are prohibited."
                  )}
                </p>
              </Section>

              <Section id="12-monats-premium-grenze" num="87" title={t("12-Monats-Premium-Grenze", "12-Month Premium Limit")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn das bestehende Gift-System maximal 12 Monate temporäres Premium vorsieht, gilt diese Begrenzung. Ein Gift-Code oder Event-Gift darf diese Grenze nicht technisch umgehen. Lifetime Premium davon getrennt behandeln.",
                    "If the existing Gift system allows a maximum of 12 months of temporary Premium, this limit applies. A Gift Code or Event Gift may not technically bypass this limit. Lifetime Premium is treated separately."
                  )}
                </p>
              </Section>

              {/* GIFTS */}
              <CategoryDivider title={t("GIFTS", "GIFTS")} />

              <Section id="premium-gift-erstellung" num="88" title={t("Premium-Gift Erstellung", "Premium Gift Creation")} icon={Gift}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX kann Premium-Gifts erzeugen. Je nach System können diese personalisiert, zeitlich begrenzt und einmalig einlösbar sein.",
                    "KyroX can generate Premium Gifts. Depending on the system, these can be personalized, time-limited, and redeemable once."
                  )}
                </p>
              </Section>

              <Section id="premium-gift-einloesung" num="89" title={t("Premium-Gift Einlösung", "Premium Gift Redemption")} icon={CheckCircle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Ein gültiger Gift-Code kann nur über die vorgesehenen KyroX-Funktionen eingelöst werden. Manipulierte oder manuell veränderte Codes sind ungültig.",
                    "A valid Gift Code can only be redeemed via the designated KyroX functions. Manipulated or manually altered codes are invalid."
                  )}
                </p>
              </Section>

              <Section id="gift-code-bindung" num="90" title={t("Gift-Code Bindung", "Gift Code Binding")} icon={User}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn ein Gift-Code einem User zugeordnet ist, darf nur dieser User ihn einlösen. Keine Übertragung an andere Nutzer, sofern das System dies nicht vorsieht.",
                    "If a Gift Code is assigned to a user, only this user may redeem it. No transfer to other users unless the system provides for this."
                  )}
                </p>
              </Section>

              <Section id="verbrauchte-gift-codes" num="91" title={t("Verbrauchte Gift-Codes", "Consumed Gift Codes")} icon={Archive}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Ein erfolgreich eingelöster Gift-Code gilt als verwendet. Er darf nicht erneut eingesetzt werden.",
                    "A successfully redeemed Gift Code is considered used. It cannot be used again."
                  )}
                </p>
              </Section>

              <Section id="ungueltige-gift-codes" num="92" title={t("Ungültige Gift-Codes", "Invalid Gift Codes")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX kann Codes ablehnen, wenn sie:",
                    "KyroX can reject codes if they:"
                  )}
                </p>
                <RuleList items={L([
                  ["nicht existieren", "do not exist"], ["bereits verwendet wurden", "have already been used"], ["abgelaufen sind", "have expired"], ["einem anderen User gehören", "belong to another user"], ["technisch ungültig sind", "are technically invalid"]
                ])} />
              </Section>

              <Section id="gift-code-missbrauch" num="93" title={t("Gift-Code-Missbrauch", "Gift Code Abuse")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Untersagt sind:",
                    "The following are prohibited:"
                  )}
                </p>
                <RuleList items={L([
                  ["Brute-Force-Versuche", "Brute-force attempts"], ["automatisiertes Raten von Codes", "automated guessing of codes"], ["massenhafte Redemption-Versuche", "mass redemption attempts"], ["Manipulation von Code-Daten", "Manipulation of code data"], ["Weitergabe personenbezogener Codes", "Sharing of personalized codes"]
                ])} />
              </Section>

              <Section id="event-gift-codes-detail" num="94" title={t("Event-Gift-Codes", "Event Gift Codes")} icon={Gift}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Event-Premium kann über einen Gift-Code bereitgestellt werden. Der Code wird innerhalb des Event-Zeitraums beansprucht. Das Premium wird erst durch das normale Gift-System aktiviert.",
                    "Event Premium can be provided via a Gift Code. The code is claimed within the Event period. The Premium is only activated by the normal Gift system."
                  )}
                </p>
              </Section>

              <Section id="event-gift-event-ende" num="95" title={t("Event-Gift und Event-Ende", "Event Gift & Event End")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn ein Event-Gift-Code erfolgreich erzeugt wurde, bedeutet das Event-Ende nicht automatisch, dass bereits erzeugtes Premium sofort verschwindet. Die weitere Gültigkeit richtet sich nach der Gift-Code-Logik.",
                    "If an Event Gift Code has been successfully generated, the end of the event does not automatically mean that the Premium already generated disappears immediately. Further validity depends on the Gift Code logic."
                  )}
                </p>
              </Section>

              {/* EVENTS & RABATTE */}
              <CategoryDivider title={t("EVENTS & RABATTE", "EVENTS & DISCOUNTS")} />

              <Section id="event-belohnungen" num="96" title={t("Event-Belohnungen", "Event Rewards")} icon={Gift}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Event-Belohnungen sind freiwillige KyroX-Vorteile. Es besteht kein allgemeiner Anspruch darauf, dass jedes Event wiederholt wird, jedes Event dieselben Vorteile besitzt, oder jeder Nutzer jede Belohnung erhält.",
                    "Event Rewards are voluntary KyroX benefits. There is no general claim that every event will be repeated, that every event has the same benefits, or that every user receives every reward."
                  )}
                </p>
              </Section>

              <Section id="event-zeitraeume" num="97" title={t("Event-Zeiträume", "Event Periods")} icon={Clock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Event-Vorteile sind nur in den jeweils angezeigten Zeiträumen verfügbar. Außerhalb des Zeitraums können Claims, Rabatte und neue Event-Gifts deaktiviert sein.",
                    "Event benefits are only available in the respectively displayed periods. Outside the period, claims, discounts, and new Event Gifts can be deactivated."
                  )}
                </p>
              </Section>

              <Section id="event-rabatte-ohne-echtgeld" num="98" title={t("Event-Rabatte ohne Echtgeld", "Event Discounts Without Real Money")} icon={Percent}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Der Begriff \"Rabatt\" bezieht sich bei KyroX auf interne Server-Credits. Beispiel: 35 % Rabatt bedeutet: weniger Server Credits erforderlich. NICHT: 35 % Rabatt auf einen Echtgeldpreis.",
                    "The term \"discount\" at KyroX refers to internal Server Credits. Example: 35% discount means: fewer Server Credits required. NOT: 35% discount on a real money price."
                  )}
                </p>
              </Section>

              <Section id="monthly-event-rabatt" num="99" title={t("Monthly Event-Rabatt", "Monthly Event Discount")} icon={Clock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Ein Event kann die erforderlichen Server Credits für Monthly Server Premium reduzieren. Dies ist eine interne KyroX-Funktion.",
                    "An event can reduce the required Server Credits for Monthly Server Premium. This is an internal KyroX function."
                  )}
                </p>
              </Section>

              <Section id="lifetime-event-rabatt" num="100" title={t("Lifetime Event-Rabatt", "Lifetime Event Discount")} icon={InfinityIcon}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Dasselbe gilt für Lifetime. Rabatt reduziert ausschließlich interne Credits. Kein Echtgeldbezug.",
                    "The same applies to Lifetime. Discount exclusively reduces internal Credits. No real money connection."
                  )}
                </p>
              </Section>

              <Section id="einmalige-rabattnutzung" num="101" title={t("Einmalige Rabattnutzung", "Single Discount Usage")} icon={CheckCircle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Ein beanspruchter Event-Rabatt kann nur einmal verwendet werden. Entweder Monthly ODER Lifetime.",
                    "A claimed Event Discount can only be used once. Either Monthly OR Lifetime."
                  )}
                </p>
              </Section>

              <Section id="globaler-event-rabatt" num="102" title={t("Globaler Event-Rabatt", "Global Event Discount")} icon={Server}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn ein User Owner mehrerer Server ist und den Rabatt auf einem verwendet, ist er auf den anderen Servern ebenfalls verbraucht (User-globales Prinzip).",
                    "If a user is Owner of multiple servers and uses the discount on one, it is also consumed on the other servers (User-global principle)."
                  )}
                </p>
              </Section>

              <Section id="rabatt-claim" num="103" title={t("Rabatt-Claim", "Discount Claim")} icon={Gift}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Der Rabatt muss zuerst bewusst über die vorgesehene KyroX-Funktion beansprucht werden. Er wird nicht automatisch aktiviert, sofern das bestehende System das so vorsieht.",
                    "The discount must first be consciously claimed via the designated KyroX function. It is not activated automatically, provided the existing system provides for this."
                  )}
                </p>
              </Section>

              <Section id="rabatt-aktivierung" num="104" title={t("Rabatt-Aktivierung", "Discount Activation")} icon={CheckCircle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Nach Claim kann ein Rabatt als beansprucht, aktiv und noch nicht verwendet gespeichert werden.",
                    "After claiming, a discount can be saved as claimed, active, and not yet used."
                  )}
                </p>
              </Section>

              <Section id="rabatt-verbrauch" num="105" title={t("Rabatt-Verbrauch", "Discount Consumption")} icon={Coins}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Der Rabatt gilt erst dann als verbraucht, wenn eine gültige rabattierte Premium-Aktion erfolgreich abgeschlossen wurde.",
                    "The discount is only considered consumed when a valid discounted Premium action has been successfully completed."
                  )}
                </p>
              </Section>

              <Section id="rabatt-bei-fehler" num="106" title={t("Rabatt bei Fehler", "Discount on Error")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn eine Aktion technisch fehlschlägt, soll ein Rabatt nicht als verbraucht gelten, sofern die eigentliche Premium-Aktivierung nicht erfolgreich war.",
                    "If an action fails technically, a discount should not be considered consumed, provided the actual Premium activation was not successful."
                  )}
                </p>
              </Section>

              <Section id="rabatt-ablauf" num="107" title={t("Rabatt-Ablauf", "Discount Expiration")} icon={Clock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Ein nicht verwendeter Rabatt verfällt mit Ende des Events, wenn dies der bestehenden Event-Logik entspricht.",
                    "An unused discount expires at the end of the event if this corresponds to the existing event logic."
                  )}
                </p>
              </Section>

              <Section id="event-cooldown-detail" num="108" title={t("Event-Cooldown", "Event Cooldown")} icon={Clock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Bestimmte Event-Vorteile können eine 6-Monats-Sperre auslösen. Die Sperre betrifft Event-Vorteile, nicht normale Bot-Nutzung.",
                    "Certain Event benefits can trigger a 6-month lock. The lock affects Event benefits, not normal bot usage."
                  )}
                </p>
              </Section>

              <Section id="cooldown-startpunkt" num="109" title={t("Cooldown Startpunkt", "Cooldown Starting Point")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn technisch so vorgesehen, startet der Cooldown erst nach erfolgreicher Nutzung eines Event-Vorteils. Nicht bereits beim Öffnen von /premium.",
                    "If technically provided, the cooldown starts only after successful use of an Event benefit. Not already when opening /premium."
                  )}
                </p>
              </Section>

              <Section id="summer-end-event-detail" num="110" title={t("Summer End Event", "Summer End Event")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Summer End Event (19.08 bis 26.08). Mögliche Vorteile: 1 Monat Premium Gift, 35 % Rabatt auf Monthly in Server Credits, 15 % Rabatt auf Lifetime in Server Credits. Kein Echtgeld.",
                    "Summer End Event (19.08 to 26.08). Possible benefits: 1 month Premium Gift, 35% discount on Monthly in Server Credits, 15% discount on Lifetime in Server Credits. No real money."
                  )}
                </p>
              </Section>

              <Section id="summer-end-sonderregel" num="111" title={t("Summer End Sonderregel", "Summer End Special Rule")} icon={Info}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn vorgesehen: Beim kostenlosen Summer-End-Premium gilt keine normale 6-Monats-Prüfung. Stattdessen greift die bestehende 12-Monats-Premium-Prüfung des Gift-Systems.",
                    "If provided: The free Summer End Premium does not require the normal 6-month check. Instead, the existing 12-month Premium check of the Gift system applies."
                  )}
                </p>
              </Section>

              <Section id="spooky-deals-detail" num="112" title={t("Spooky Deals", "Spooky Deals")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "31.10 bis 07.11. 1 Monat Premium. Monthly Credit-Rabatt 40 %. Lifetime Credit-Rabatt 25 %. Nur wenn diese Werte weiterhin aktuell sind.",
                    "31.10 to 07.11. 1 month Premium. Monthly Credit discount 40%. Lifetime Credit discount 25%. Only if these values are still current."
                  )}
                </p>
              </Section>

              <Section id="christmas-deals-detail" num="113" title={t("Christmas Deals", "Christmas Deals")} icon={Calendar}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "24.12 bis 31.12. 3 Monate Premium. Monthly Credit-Rabatt 50 %. Lifetime Credit-Rabatt 35 %.",
                    "24.12 to 31.12. 3 months Premium. Monthly Credit discount 50%. Lifetime Credit discount 35%."
                  )}
                </p>
              </Section>

              <Section id="anniversary-rewards-detail" num="114" title={t("Anniversary Rewards", "Anniversary Rewards")} icon={Gift}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "04.01 bis 10.01. 3 Monate Premium. Monthly Credit-Rabatt 50 %. Lifetime Credit-Rabatt 30 %.",
                    "04.01 to 10.01. 3 months Premium. Monthly Credit discount 50%. Lifetime Credit discount 30%."
                  )}
                </p>
              </Section>

              <Section id="kyrox-day-offers-detail" num="115" title={t("KyroX Day Offers", "KyroX Day Offers")} icon={Percent}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "15.05 bis 16.05. 4 Monate Premium. Monthly Credit-Rabatt 35 %. Lifetime Credit-Rabatt 15 %.",
                    "15.05 to 16.05. 4 months Premium. Monthly Credit discount 35%. Lifetime Credit discount 15%."
                  )}
                </p>
              </Section>

              <Section id="kein-anspruch-event-wiederholung" num="116" title={t("Kein Anspruch auf Event-Wiederholung", "No Guarantee of Event Repetition")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Auch wenn Events jährlich geplant sind: Keine rechtliche Garantie, dass jedes Event dauerhaft jedes Jahr stattfinden muss. KyroX kann Event-Pläne ändern.",
                    "Even if events are planned annually: No legal guarantee that every event must take place permanently every year. KyroX can change event plans."
                  )}
                </p>
              </Section>

              {/* SERVER-OWNER & CREDITS */}
              <CategoryDivider title={t("SERVER-OWNER & CREDITS", "SERVER-OWNER & CREDITS")} />

              <Section id="server-owner-pruefung" num="117" title={t("Server-Owner-Prüfung", "Server-Owner Check")} icon={Crown}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Server-Premium-Funktionen können an den tatsächlichen Discord-Server-Owner gebunden sein. Berechtigungen werden anhand der Discord-Serverdaten geprüft.",
                    "Server Premium functions can be tied to the actual Discord Server Owner. Permissions are checked based on the Discord server data."
                  )}
                </p>
              </Section>

              <Section id="owner-wechsel" num="118" title={t("Owner-Wechsel", "Owner Change")} icon={Users}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn ein Server den Owner wechselt, können bestimmte Owner-spezifische Funktionen danach nur dem neuen Server-Owner zur Verfügung stehen.",
                    "If a server changes owners, certain Owner-specific functions may then only be available to the new Server Owner."
                  )}
                </p>
              </Section>

              <Section id="admin-nicht-owner" num="119" title={t("Administrator ist nicht automatisch Owner", "Administrator is not automatically Owner")} icon={Info}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Die Administrator-Berechtigung ist nicht automatisch gleichbedeutend mit dem Server-Owner-Status. Owner-exklusive Funktionen können weiterhin ausschließlich dem eigentlichen Owner vorbehalten sein.",
                    "Administrator permission is not automatically synonymous with Server Owner status. Owner-exclusive functions can still be reserved exclusively for the actual Owner."
                  )}
                </p>
              </Section>

              <Section id="server-premium-zuordnung" num="120" title={t("Server Premium Zuordnung", "Server Premium Assignment")} icon={Server}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Server Premium ist grundsätzlich einem bestimmten Server zugeordnet. Nicht automatisch auf andere Server übertragbar.",
                    "Server Premium is basically assigned to a specific server. Not automatically transferable to other servers."
                  )}
                </p>
              </Section>

              <Section id="server-credits-zuordnung" num="121" title={t("Server Credits Zuordnung", "Server Credits Assignment")} icon={Coins}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Server Credits sind grundsätzlich serverbezogen. Credits von Server A sind nicht automatisch Credits von Server B.",
                    "Server Credits are basically server-related. Credits from Server A are not automatically Credits from Server B."
                  )}
                </p>
              </Section>

              <Section id="credit-aktionen" num="122" title={t("Credit-Aktionen", "Credit Actions")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX kann interne Aktionen bereitstellen, die Server Credits hinzufügen, entfernen, verwenden und protokollieren. Nur vorgesehene Funktionen nutzen.",
                    "KyroX can provide internal actions that add, remove, use, and log Server Credits. Only use designated functions."
                  )}
                </p>
              </Section>

              <Section id="credit-fehlerkorrektur" num="123" title={t("Credit-Fehlerkorrektur", "Credit Error Correction")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn Credits durch einen eindeutigen technischen Fehler falsch berechnet wurden, kann der Zustand sachgerecht korrigiert werden.",
                    "If Credits were calculated incorrectly due to a clear technical error, the state can be properly corrected."
                  )}
                </p>
              </Section>

              <Section id="keine-auszahlung" num="124" title={t("Keine Auszahlung", "No Payout")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Server Credits können nicht in echtes Geld ausgezahlt werden.",
                    "Server Credits cannot be paid out in real money."
                  )}
                </p>
              </Section>

              <Section id="keine-uebertragung" num="125" title={t("Keine Übertragung", "No Transfer")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Credits dürfen nicht zwischen Servern oder Nutzern übertragen werden, sofern KyroX keine ausdrückliche Funktion dafür bereitstellt.",
                    "Credits may not be transferred between servers or users unless KyroX provides an explicit function for this."
                  )}
                </p>
              </Section>

              {/* PREMIUM-TECHNIK */}
              <CategoryDivider title={t("PREMIUM-TECHNIK", "PREMIUM TECHNOLOGY")} />

              <Section id="premium-ohne-echtgeldwert" num="126" title={t("Premium ohne Echtgeldwert", "Premium Without Real Money Value")} icon={Crown}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Premium hat keinen garantierten Echtgeldwert. Premium darf nicht als finanzielle Anlage, Guthaben oder Eigentumswert behandelt werden.",
                    "Premium has no guaranteed real money value. Premium may not be treated as a financial investment, credit, or property value."
                  )}
                </p>
              </Section>

              <Section id="kostenlose-funktionen-aenderung" num="127" title={t("Kostenlose Funktionen können sich ändern", "Free Functions Can Change")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Da KyroX kostenlos bereitgestellt wird, kann der Umfang kostenloser Funktionen weiterentwickelt werden. Keine Garantie, dass jede Funktion unverändert bestehen bleibt.",
                    "Since KyroX is provided free of charge, the scope of free functions can be further developed. No guarantee that every function will remain unchanged."
                  )}
                </p>
              </Section>

              <Section id="keine-garantierte-premium-funktion" num="128" title={t("Keine garantierte Premium-Funktion", "No Guaranteed Premium Function")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Ein Premium-Status kann zusätzliche Funktionen freischalten. Nicht garantieren, dass jede einzelne Premium-Funktion dauerhaft unverändert besteht.",
                    "A Premium status can unlock additional functions. It is not guaranteed that every single Premium function will remain permanently unchanged."
                  )}
                </p>
              </Section>

              <Section id="technische-premium-ausfaelle" num="129" title={t("Technische Premium-Ausfälle", "Technical Premium Failures")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn ein Premium-Status technisch vorübergehend nicht korrekt erkannt wird, kann dies als technischer Fehler behandelt und geprüft werden.",
                    "If a Premium status is temporarily not recognized correctly technically, this can be treated as a technical error and examined."
                  )}
                </p>
              </Section>

              <Section id="premium-ablauf-detail" num="130" title={t("Premium-Ablauf", "Premium Expiration")} icon={Clock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Temporäres Premium endet automatisch nach dem gespeicherten Ablaufdatum.",
                    "Temporary Premium ends automatically after the stored expiration date."
                  )}
                </p>
              </Section>

              <Section id="lifetime-ohne-expiresat" num="131" title={t("Lifetime ohne Expiresat", "Lifetime Without ExpiresAt")} icon={InfinityIcon}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Lifetime Premium besitzt grundsätzlich kein reguläres Ablaufdatum, sofern dies der aktuellen KyroX-Logik entspricht.",
                    "Lifetime Premium basically has no regular expiration date, provided this corresponds to the current KyroX logic."
                  )}
                </p>
              </Section>

              <Section id="kein-automatisches-credit-abo" num="132" title={t("Kein automatisches Credit-Abo", "No Automatic Credit Subscription")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Auch bei Monthly Premium erfolgt keine automatische wiederkehrende Credits-Abbuchung, sofern ein solches System nicht ausdrücklich existiert.",
                    "Even with Monthly Premium, there is no automatic recurring Credit deduction unless such a system explicitly exists."
                  )}
                </p>
              </Section>

              <Section id="manuelle-premium-aktivierung" num="133" title={t("Manuelle Premium-Aktivierung", "Manual Premium Activation")} icon={CheckCircle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Premium kann nur über vorgesehene KyroX-Funktionen aktiviert werden.",
                    "Premium can only be activated via designated KyroX functions."
                  )}
                </p>
              </Section>

              <Section id="keine-premium-selbstmanipulation" num="134" title={t("Keine Premium-Selbstmanipulation", "No Premium Self-Manipulation")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Nutzer dürfen nicht versuchen, lokale Dateien, Requests oder Interactions so zu manipulieren, dass Premium unberechtigt aktiviert wird.",
                    "Users may not attempt to manipulate local files, requests, or interactions in such a way that Premium is activated unauthorized."
                  )}
                </p>
              </Section>

              <Section id="premium-rollen" num="135" title={t("Premium-Rollen", "Premium Roles")} icon={Users}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Falls Premium mit Discord-Rollen verbunden ist, können die Rollen von Bot-Berechtigungen und Server-Konfiguration abhängen.",
                    "If Premium is linked to Discord Roles, the roles can depend on Bot Permissions and Server Configuration."
                  )}
                </p>
              </Section>

              {/* ROLLEN & SERVERKONFIGURATION */}
              <CategoryDivider title={t("ROLLEN & SERVERKONFIGURATION", "ROLES & SERVER CONFIG")} />

              <Section id="rollen-hierarchie-detail" num="136" title={t("Rollen-Hierarchie", "Role Hierarchy")} icon={Shield}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX kann Rollen nur verwalten, wenn seine eigene Bot-Rolle technisch hoch genug positioniert ist.",
                    "KyroX can only manage roles if its own Bot Role is positioned high enough technically."
                  )}
                </p>
              </Section>

              <Section id="geloeschte-rollen" num="137" title={t("Gelöschte Rollen", "Deleted Roles")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wird eine konfigurierte Rolle gelöscht, kann die zugehörige KyroX-Funktion nicht mehr korrekt arbeiten, bis sie neu konfiguriert wird.",
                    "If a configured role is deleted, the associated KyroX function can no longer work correctly until it is reconfigured."
                  )}
                </p>
              </Section>

              <Section id="geloeschte-channels" num="138" title={t("Gelöschte Channels", "Deleted Channels")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Dasselbe gilt für konfigurierte Channels. Wird ein Channel gelöscht, können Logs, Tickets oder Welcome-Nachrichten nicht mehr gesendet werden.",
                    "The same applies to configured channels. If a channel is deleted, logs, tickets, or welcome messages can no longer be sent."
                  )}
                </p>
              </Section>

              <Section id="server-loeschung-bot-entfernung" num="139" title={t("Server-Löschung oder Bot-Entfernung", "Server Deletion or Bot Removal")} icon={Ban}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wenn KyroX von einem Server entfernt wird, stehen Bot-Funktionen dort nicht mehr zur Verfügung.",
                    "If KyroX is removed from a server, Bot functions are no longer available there."
                  )}
                </p>
              </Section>

              <Section id="erneutes-hinzufuegen" num="140" title={t("Erneutes Hinzufügen", "Re-adding")} icon={Bot}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Wird KyroX später erneut hinzugefügt, können abhängig von der Speicherung bestehende Konfigurationen noch vorhanden oder neu einzurichten sein. Keine Garantie, sofern Speicherverhalten nicht eindeutig ist.",
                    "If KyroX is added again later, existing configurations may still be present or need to be set up again depending on the storage. No guarantee unless storage behavior is clear."
                  )}
                </p>
              </Section>

              {/* VERFÜGBARKEIT & DISCORD */}
              <CategoryDivider title={t("VERFÜGBARKEIT & DISCORD", "AVAILABILITY & DISCORD")} />

              <Section id="discord-ausfaelle" num="141" title={t("Discord-Ausfälle", "Discord Outages")} icon={Server}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX ist technisch von Discord abhängig. Bei Discord-Störungen können Funktionen eingeschränkt sein.",
                    "KyroX is technically dependent on Discord. In the event of Discord disruptions, functions may be restricted."
                  )}
                </p>
              </Section>

              <Section id="discord-api-aenderungen" num="142" title={t("Discord-API-Änderungen", "Discord API Changes")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Änderungen an Discord APIs können Anpassungen an KyroX notwendig machen.",
                    "Changes to Discord APIs may make adjustments to KyroX necessary."
                  )}
                </p>
              </Section>

              <Section id="bot-restarts" num="143" title={t("Bot-Restarts", "Bot Restarts")} icon={Clock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Bei Wartung oder technischen Neustarts kann KyroX kurzzeitig nicht verfügbar sein.",
                    "During maintenance or technical restarts, KyroX may be temporarily unavailable."
                  )}
                </p>
              </Section>

              <Section id="wartungsarbeiten" num="144" title={t("Wartungsarbeiten", "Maintenance Work")} icon={Settings}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX darf technische Wartung durchführen.",
                    "KyroX may carry out technical maintenance."
                  )}
                </p>
              </Section>

              <Section id="sicherheitsabschaltungen" num="145" title={t("Sicherheitsabschaltungen", "Security Shutdowns")} icon={Shield}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Bei Sicherheitsproblemen können bestimmte Funktionen vorübergehend deaktiviert werden.",
                    "In the event of security problems, certain functions can be temporarily deactivated."
                  )}
                </p>
              </Section>

              <Section id="missbrauchsschutz" num="146" title={t("Missbrauchsschutz", "Abuse Protection")} icon={Lock}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX kann technische Schutzmaßnahmen verwenden gegen:",
                    "KyroX can use technical protective measures against:"
                  )}
                </p>
                <RuleList items={L([
                  ["Spam", "Spam"], ["Flooding", "Flooding"], ["Exploit-Versuche", "Exploit attempts"], ["massenhafte Interactions", "mass Interactions"], ["unberechtigte Nutzung", "unauthorized use"]
                ])} />
              </Section>

              <Section id="fehlermeldungen" num="147" title={t("Fehlermeldungen", "Error Messages")} icon={AlertTriangle}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Technische Fehlermeldungen dienen der Diagnose. Nutzer sollen sensible interne Informationen nicht gezielt ausnutzen.",
                    "Technical error messages serve diagnosis. Users should not intentionally exploit sensitive internal information."
                  )}
                </p>
              </Section>

              {/* SUPPORT & ABSCHLUSS */}
              <CategoryDivider title={t("SUPPORT & ABSCHLUSS", "SUPPORT & CONCLUSION")} />

              <Section id="support-detail" num="148" title={t("Support", "Support")} icon={MessageSquare}>
                <div className="bg-gradient-to-br from-[#11131a] to-[#0d0e12] border border-[#1e2028] rounded-2xl p-7 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Headphones className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{t("KyroX Support & Community", "KyroX Support & Community")}</h3>
                  </div>
                  <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed">
                    {t(
                      "Offizieller Discord-Server für Support, Fragen und Community.",
                      "Official Discord server for support, questions, and community."
                    )}
                  </p>
                  
                  <a href="https://discord.gg/JFaDGaFkk5" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[#0a0b0e] border border-[#1e2028] rounded-xl p-5 hover:border-blue-500/50 hover:bg-[#11131a] transition-all group min-h-[56px]">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors">{t("Offizieller Discord-Server", "Official Discord Server")}</p>
                      <p className="text-sm text-slate-500 transition-colors truncate">https://discord.gg/JFaDGaFkk5</p>
                    </div>
                    <ExternalLink size={20} className="text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                  </a>
                </div>
              </Section>

              <Section id="betreiber" num="149" title={t("Betreiber", "Operator")} icon={FileText}>
                <div className="bg-[#0d0e12] border border-blue-500/20 rounded-xl p-6">
                  <p className="text-sm text-slate-400 mb-2 font-medium">{t("Betreiber des KyroX Discord-Bots:", "Operator of the KyroX Discord bot:")}</p>
                  <p className="text-base font-semibold text-white">KyroX™ Official</p>
                </div>
              </Section>

              <Section id="abschliessende-grundregel" num="150" title={t("Abschließende Grundregel", "Concluding Basic Rule")} icon={Scale}>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "KyroX ist ein kostenloser Discord-Service. Die angebotenen Premium-, Credits-, Gift- und Event-Systeme sind interne Funktionen von KyroX und stellen keine Echtgeld-Produkte dar.",
                    "KyroX is a free Discord service. The offered Premium, Credits, Gift, and Event systems are internal functions of KyroX and do not represent real money products."
                  )}
                </p>
                <p className="mb-4 leading-[1.75]">
                  {t(
                    "Nutzer verpflichten sich, KyroX ausschließlich über die vorgesehenen Funktionen und im Rahmen dieser Richtlinien zu verwenden. Missbrauch, Manipulation oder die Umgehung technischer Begrenzungen ist nicht gestattet.",
                    "Users undertake to use KyroX exclusively via the designated functions and within the framework of these policies. Abuse, manipulation, or the circumvention of technical limits is not permitted."
                  )}
                </p>
                <p className="leading-[1.75]">
                  {t(
                    "Bei Fragen steht der offizielle KyroX Support zur Verfügung: https://discord.gg/JFaDGaFkk5",
                    "If you have questions, the official KyroX Support is available: https://discord.gg/JFaDGaFkk5"
                  )}
                </p>
                <p className="mt-4 leading-[1.75] font-semibold text-white">
                  {t("Betreiber: KyroX™ Official", "Operator: KyroX™ Official")}
                </p>
              </Section>

            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

function CategoryDivider({ title }) {
  return (
    <div className="mt-10 mb-8 first:mt-0">
      <h2 className="text-sm font-extrabold uppercase tracking-widest text-blue-500 mb-2">{title}</h2>
      <div className="w-full h-px bg-gradient-to-r from-blue-500/40 via-[#1e2028] to-transparent"></div>
    </div>
  );
}

function Section({ id, num, title, icon: Icon, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 sm:gap-4 mb-3">
        <span className="h-9 sm:h-10 px-2.5 sm:px-3 flex items-center justify-center text-xs sm:text-sm font-mono text-blue-400 bg-blue-500/[0.05] border border-blue-500/20 rounded-lg flex-shrink-0">
          {num}
        </span>
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {title}
        </h3>
      </div>
      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-400/30 rounded-full mb-8"></div>
      <div className="text-slate-300 text-[15px] md:text-base leading-[1.75] space-y-5">
        {children}
      </div>
    </section>
  );
}

function RuleList({ items }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0 my-4 border-t border-[#1e2028]/40">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5 text-sm md:text-[15px] text-slate-400 py-3 border-b border-[#1e2028]/40">
          <CheckCircle size={16} className="text-blue-400 mt-1 flex-shrink-0" />
          <span className="break-words whitespace-normal">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoBox({ children, type = "info", title, icon: CustomIcon }) {
  const styles = type === "warning" 
    ? "bg-amber-500/[0.07] border-amber-500/30 text-amber-200" 
    : type === "security"
    ? "bg-emerald-500/[0.07] border-emerald-500/30 text-emerald-200"
    : "bg-blue-500/[0.07] border-blue-500/30 text-blue-200";
  
  const Icon = CustomIcon ? CustomIcon : (type === "warning" ? AlertTriangle : Info);

  return (
    <div className={`flex items-start gap-4 border-l-4 border rounded-r-xl p-5 my-6 ${styles} shadow-sm`}>
      <Icon size={22} className="flex-shrink-0 mt-0.5 opacity-90" />
      <div className="flex-1">
        {title && <h4 className="text-sm font-extrabold text-white mb-1">{title}</h4>}
        <div className="text-sm md:text-[15px] leading-relaxed text-slate-300">{children}</div>
      </div>
    </div>
  );
}