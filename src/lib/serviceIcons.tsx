import {
  ClipboardCheck,
  PhoneCall,
  Zap,
  Search,
  CircuitBoard,
  type LucideIcon,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  eicr: ClipboardCheck,
  "emergency-callouts": PhoneCall,
  "ev-chargers": Zap,
  "fault-finding": Search,
  "consumer-units": CircuitBoard,
};
