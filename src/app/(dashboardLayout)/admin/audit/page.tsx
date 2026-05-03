"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert, Activity, UserCog, History } from "lucide-react";
import { motion } from "framer-motion";

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-shop_dark_green">System Audit Logs</h1>
        <p className="text-muted-foreground">Monitor system events, user actions, and security alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-blue-50/50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
              <Activity className="w-5 h-5" /> Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-800">124</p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50/50 border-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-shop_orange">
              <History className="w-5 h-5" /> Actions Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-shop_orange">8,439</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50/50 border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-red-700">
              <ShieldAlert className="w-5 h-5" /> Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-800">2</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>System logs from the last 24 hours.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="py-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-muted-foreground"
              >
                <UserCog className="w-12 h-12 mb-3 text-shop_orange/50" />
                <p className="text-lg font-medium">Audit logs are currently being collected</p>
                <p className="text-sm max-w-sm mt-2">
                  Detailed system events will appear here once the audit service is fully initialized and syncing.
                </p>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
