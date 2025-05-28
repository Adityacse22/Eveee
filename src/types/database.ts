
export interface Station {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  price_per_kwh: number;
  available: boolean;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export interface StationConnector {
  id: string;
  station_id: string;
  connector_type: 'DC Fast' | 'Type 2' | 'CCS' | 'CHAdeMO' | 'AC';
  power_output: number;
  available: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  station_id: string;
  connector_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  special_requests?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  station_id: string;
  booking_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface StationWithConnectors extends Station {
  connectors: StationConnector[];
}
