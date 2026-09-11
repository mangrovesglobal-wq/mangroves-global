import {
  Ship,
  Plane,
  Truck,
  ShieldCheck,
  Warehouse,
  Boxes,
  Route,
  Globe,
  MapPin,
  Clock,
  PackageCheck,
  Megaphone,
  TrendingUp,
  Palette,
  PenTool,
  Video,
  Camera,
  Code,
  LayoutGrid,
  Sparkles,
  Search,
  Share2,
  BarChart3,
  Package,
  Users,
  Target,
  MessageSquare,
  FileText,
  Smartphone,
  Layers,
  type LucideIcon,
} from "lucide-react";

// Keep in sync with the <select> options in backend/resources/views/services/{create,edit}.blade.php
const ICONS: Record<string, LucideIcon> = {
  Ship,
  Plane,
  Truck,
  ShieldCheck,
  Warehouse,
  Boxes,
  Route,
  Globe,
  MapPin,
  Clock,
  PackageCheck,
  Megaphone,
  TrendingUp,
  Palette,
  PenTool,
  Video,
  Camera,
  Code,
  LayoutGrid,
  Sparkles,
  Search,
  Share2,
  BarChart3,
  Package,
  Users,
  Target,
  MessageSquare,
  FileText,
  Smartphone,
  Layers,
};

type ServiceIconProps = {
  name: string | null;
  className?: string;
};

export default function ServiceIcon({ name, className = "w-5 h-5" }: ServiceIconProps) {
  if (!name) return null;
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
