'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';

export function StatusSelector({
  onStatusChange
}: {
  onStatusChange: (status: string) => void;
}) {
  const searchParams = useSearchParams();

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
