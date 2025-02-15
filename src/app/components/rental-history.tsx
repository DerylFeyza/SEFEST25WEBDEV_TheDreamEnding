import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Rental } from '@prisma/client';

type ExtendedRental = Rental & { item: { name: string } };

export const RentalHistory = ({
  rentalHistory
}: {
  rentalHistory: ExtendedRental[];
}) => (
  <Card className='mt-4'>
    <CardHeader className='!pb-2'>
      <CardTitle>Rental History</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentalHistory.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell>{rental.item.name}</TableCell>
              <TableCell>{rental.start_date.toDateString()}</TableCell>
              <TableCell>{rental.finished_date.toDateString()}</TableCell>
              <TableCell>{rental.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
