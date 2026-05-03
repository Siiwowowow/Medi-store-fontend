/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { adminService } from "@/services/admin.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/admin/StatusBadge";
import { Store, Search, Filter, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import debounce from "lodash/debounce";

export default function AllSellersPage() {
  const [sellers, setSellers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination & Filtering state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<string>("all");
  const limit = 10;

  const fetchSellers = async (searchQuery: string, currentStatus: string, currentPage: number) => {
    setIsLoading(true);
    try {
      const params: any = { page: currentPage, limit };
      if (searchQuery) params.searchTerm = searchQuery;
      if (currentStatus !== "all") params.status = currentStatus;

      const res: any = await adminService.getAllSellers(params);
      
      if (res?.success) {
        setSellers(res.data);
        setTotalPages(res.meta?.totalPages || 1);
      } else {
        setSellers([]);
      }
    } catch (err) {
      toast.error("Failed to fetch sellers");
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search to prevent excessive API calls
  const debouncedFetch = useCallback(
    debounce((searchQuery, currentStatus, currentPage) => {
      fetchSellers(searchQuery, currentStatus, currentPage);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(searchTerm, status, page);
  }, [searchTerm, status, page, debouncedFetch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-shop_dark_green">All Sellers</h1>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search shop, name or email..."
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
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Store className="w-5 h-5 text-shop_light_green" />
            Seller Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground animate-pulse">Loading sellers...</div>
          ) : sellers.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No sellers found matching your criteria.</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shop Info</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-center">Products</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellers.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="font-semibold text-shop_dark_green">{s.shopName}</div>
                        <div className="text-xs text-muted-foreground">Joined: {new Date(s.createdAt).toLocaleDateString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                            {s.user?.image ? (
                              <img src={s.user.image} alt={s.user.name} className="w-full h-full object-cover" />
                            ) : (
                              <Store className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{s.user?.name || "N/A"}</div>
                            <div className="text-xs text-muted-foreground">{s.user?.email || "N/A"}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {s.phoneNumber ? (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="w-3 h-3" /> {s.phoneNumber}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not provided</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {s.shopAddress ? (
                          <div className="flex items-start gap-1 text-sm text-gray-600 max-w-[150px]">
                            <MapPin className="w-3 h-3 mt-1 flex-shrink-0" />
                            <span className="truncate" title={s.shopAddress}>{s.shopAddress}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not provided</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {s.totalMedicines || 0}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={s.status} />
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
