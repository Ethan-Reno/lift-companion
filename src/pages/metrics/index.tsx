'use client'

import React, { useEffect } from 'react';
import { Header } from '../../components';
import { api } from '../../utils/api';
import { CreateMetricDialog } from '../../features/metric-manager/CreateMetricDialog';
import { useStore } from '../../store/store';
import { CategorialMetricCard } from '../../features/metric-manager/CategorialMetricCard';
import { Button, Input, XIcon } from 'good-nice-ui';

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
      <div className="flex flex-1 items-center space-x-2">
        {/* Name text search */}
        <Input
          placeholder="Search..."
          className="h-8 w-[150px] sm:w-[250px]"
        />
        <Button
          variant="ghost"
          onClick={() => console.log('clear')}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <XIcon size={16} className="ml-2" />
        </Button>
      </div>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {metrics?.map((metric) => <CategorialMetricCard key={metric.id} metric={metric} />)}
      </div> 
    </div>
  );
};

export default Metrics;