"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/services/admin.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, XCircle, Store } from "lucide-react";

export default function PendingSellersPage() {
  const [sellers, setSellers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSellers = async () => {
    try {
      const res = await adminService.getPendingSellers();
      if (res?.success) setSellers(res.data);
    } catch (err) {
      toast.error("Failed to fetch pending sellers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await adminService.approveSeller(id);
      if (res?.success) {
        toast.success("Seller approved successfully");
        fetchSellers();
      } else {
        toast.error("Approval failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await adminService.rejectSeller(id);
      if (res?.success) {
        toast.success("Seller rejected successfully");
        fetchSellers();
      } else {
        toast.error("Rejection failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-shop_dark_green">Pending Seller Approvals</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-500" />
            Needs Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground animate-pulse">Loading...</div>
          ) : sellers.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No pending sellers found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shop Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Requested At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellers.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-semibold text-shop_dark_green">{s.shopName}</TableCell>
                    <TableCell>{s.user?.name || "N/A"}</TableCell>
                    <TableCell>{s.user?.email || "N/A"}</TableCell>
                    <TableCell>{new Date(s.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" className="bg-shop_light_green hover:bg-[#2e7a2e]" onClick={() => handleApprove(s.id)}>
                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(s.id)}>
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
