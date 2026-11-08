import {
  Shield, Sparkles, Sun, Droplet, FlaskConical, Gem, Layers, Eye, TrendingUp, Wrench, BadgeCheck,
  Truck, Users, Store, Car, Microscope, Factory, Package, ScanLine, Scissors, Boxes, Handshake,
  GraduationCap, Zap, Thermometer, Clock, type LucideIcon,
} from 'lucide-react';
import type { IconName } from '../data/content';

const map: Record<IconName, LucideIcon> = {
  shield: Shield, sparkles: Sparkles, sun: Sun, droplet: Droplet, flask: FlaskConical, gem: Gem,
  layers: Layers, eye: Eye, trending: TrendingUp, wrench: Wrench, badge: BadgeCheck, truck: Truck,
  users: Users, store: Store, car: Car, microscope: Microscope, factory: Factory, package: Package,
  scan: ScanLine, scissors: Scissors, boxes: Boxes, handshake: Handshake, graduation: GraduationCap,
  zap: Zap, thermometer: Thermometer, clock: Clock,
};

export default function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const C = map[name];
  return <C size={size} aria-hidden="true" />;
}
