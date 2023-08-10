import React, { useEffect } from 'react';
import { Header } from '../../components';
import { api } from '../../utils/api';
import { CreateMetricDialog } from '../../features/metric-manager/CreateMetricDialog';
import { useStore } from '../../store/store';

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
      <div className="grid">
        {metrics && metrics.map((metric) => {
          return (
            <div className="w-full bg-surface rounded-md p-4 shadow-md border flex gap-4 items-center" key={metric.id}>
              <h1>{metric.name}</h1>
            </div>
          )
        })}
      </div> 
    </div>
  );
};

export default Metrics;