/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { adminService } from "@/services/admin.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import debounce from "lodash/debounce";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination & Filtering state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<string>("all");
  const limit = 10;

  const fetchUsers = async (searchQuery: string, currentStatus: string, currentPage: number) => {
    setIsLoading(true);
    try {
      const params: any = { role: "CUSTOMER", page: currentPage, limit };
      
      if (searchQuery) params.searchTerm = searchQuery;
      if (currentStatus !== "all") params.status = currentStatus;

      const res: any = await adminService.getAllUsers(params);
      
      if (res?.success) {
        setUsers(res.data);
        setTotalPages(res.meta?.totalPages || 1);
      } else {
        setUsers([]);
      }
    } catch (err) {
      toast.error("Failed to fetch customers");
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search
  const debouncedFetch = useCallback(
    debounce((searchQuery, currentStatus, currentPage) => {
      fetchUsers(searchQuery, currentStatus, currentPage);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(searchTerm, status, page);
  }, [searchTerm, status, page, debouncedFetch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-shop_dark_green">All Customers</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="pl-8 bg-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={status} onValueChange={(val) => { setStatus(val); setPage(1); }}>
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="BLOCKED">Blocked</SelectItem>
              <SelectItem value="DELETED">Deleted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Customer Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground animate-pulse">Loading customers...</div>
          ) : users.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No customers found matching your criteria.</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-semibold text-shop_dark_green flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {u.image ? (
                            <img src={u.image} alt={u.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        {u.name}
                      </TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={u.status === "ACTIVE" ? "default" : "destructive"} className={u.status === "ACTIVE" ? "bg-shop_light_green text-white" : ""}>
                          {u.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <div className="text-sm text-muted-foreground font-medium">
                    Page {page} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
