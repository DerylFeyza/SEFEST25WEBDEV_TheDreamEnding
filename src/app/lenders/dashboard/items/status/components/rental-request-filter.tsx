'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

export function StatusSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status !== 'ALL') {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select
      onValueChange={onStatusChange}
      defaultValue={searchParams.get('status') || 'ALL'}
    >
      <SelectTrigger>
        <SelectValue placeholder='Select a status' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='ALL'>All Requests</SelectItem>
        <SelectItem value='pending'>Pending</SelectItem>
        <SelectItem value='confirmed'>Confirmed</SelectItem>
        <SelectItem value='ongoing'>Ongoing</SelectItem>
        <SelectItem value='completed'>Completed</SelectItem>
        <SelectItem value='cancelled'>Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}
