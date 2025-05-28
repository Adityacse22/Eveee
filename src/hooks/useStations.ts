
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Station, StationConnector, StationWithConnectors } from '@/types/database';

export const useStations = () => {
  return useQuery({
    queryKey: ['stations'],
    queryFn: async (): Promise<StationWithConnectors[]> => {
      const { data: stations, error: stationsError } = await supabase
        .from('stations')
        .select('*')
        .order('name');

      if (stationsError) {
        console.error('Error fetching stations:', stationsError);
        throw stationsError;
      }

      const { data: connectors, error: connectorsError } = await supabase
        .from('station_connectors')
        .select('*');

      if (connectorsError) {
        console.error('Error fetching connectors:', connectorsError);
        throw connectorsError;
      }

      // Group connectors by station
      const connectorsMap = connectors.reduce((acc, connector) => {
        if (!acc[connector.station_id]) {
          acc[connector.station_id] = [];
        }
        acc[connector.station_id].push(connector);
        return acc;
      }, {} as Record<string, StationConnector[]>);

      // Combine stations with their connectors
      return stations.map(station => ({
        ...station,
        connectors: connectorsMap[station.id] || []
      }));
    }
  });
};

export const useStation = (stationId: string) => {
  return useQuery({
    queryKey: ['station', stationId],
    queryFn: async (): Promise<StationWithConnectors | null> => {
      const { data: station, error: stationError } = await supabase
        .from('stations')
        .select('*')
        .eq('id', stationId)
        .single();

      if (stationError) {
        console.error('Error fetching station:', stationError);
        throw stationError;
      }

      const { data: connectors, error: connectorsError } = await supabase
        .from('station_connectors')
        .select('*')
        .eq('station_id', stationId);

      if (connectorsError) {
        console.error('Error fetching connectors:', connectorsError);
        throw connectorsError;
      }

      return {
        ...station,
        connectors: connectors || []
      };
    },
    enabled: !!stationId
  });
};
