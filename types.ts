
export type UserRole = 'admin' | 'subscriber' | 'free_user';

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  has_claimed_gift: boolean;
  created_at: string;
}

export interface Trend {
  id: string;
  topic: string;
  score: number;
  velocity: number;
  engagement: number;
  status: 'discovered' | 'greylisted' | 'producing' | 'completed';
}

export type TransmutationStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface Transmutation {
  id: string;
  user_id: string;
  trend_hook: string;
  status: TransmutationStatus;
  video_url?: string;
  is_watermarked: boolean;
  cost_estimate: number;
  created_at: string;
}

// Added ProductionTask interface used by the ProductionConsole component
export interface ProductionTask {
  id: string;
  topic: string;
  stage: string;
  progress: number;
}

export interface SystemConfig {
  master_switch: boolean;
  daily_budget_cap: number;
  current_daily_spend: number;
}