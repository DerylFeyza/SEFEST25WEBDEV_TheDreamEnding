import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rentalHistory = [
  {
    id: 1,
    item: "Camping Tent",
    startDate: "2025-06-01",
    endDate: "2025-06-03",
    status: "Completed",
  },
  {
    id: 2,
    item: "Mountain Bike",
    startDate: "2025-06-15",
    endDate: "2025-06-16",
    status: "Upcoming",
  },
];

export function RentalHistory() {
  return (
    <Card>
      <CardHeader>
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
                <TableCell>{rental.item}</TableCell>
                <TableCell>{rental.startDate}</TableCell>
                <TableCell>{rental.endDate}</TableCell>
                <TableCell>{rental.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
