import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";



const UserDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {/* My Trips */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">My Trips</h2>
          <div className="flex flex-col md:flex-row gap-2">
            <Input placeholder="Search destination..." />
            <Button>Search</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Destination</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Tokyo</TableCell>
                <TableCell>2025-09-20</TableCell>
                <TableCell>Upcoming</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Profile Section */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Profile</h2>
          <Input placeholder="Name" defaultValue="Archchika Kanesarasa" />
          <Input placeholder="Email" defaultValue="archchika@example.com" />
          <Button>Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
