import React, { useEffect } from 'react';
import { Header } from '../../components';
import { api } from '../../utils/api';
import { CreateMetricDialog } from '../../features/metric-manager/CreateMetricDialog';
import { useStore } from '../../store/store';
import { CategorialMetricCard } from '../../features/metric-manager/CategorialMetricCard';

const Metrics = () => {
  const { data: metrics, isLoading, refetch } = api.metric.getAll.useQuery();
  const { shouldRefetch, setShouldRefetch } = useStore();

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetch, setShouldRefetch]);

  return (
    <div className="flex flex-col gap-16" id='MetricsManager'>
      <Header className='self-start'>Metrics</Header>
      <CreateMetricDialog />
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {metrics && metrics.map((metric) => <CategorialMetricCard key={metric.id} metric={metric} />)}
      </div> 
    </div>
  );
};

export default Metrics;