import React from "react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const StatCard = ({
    loading,
    label,
    value,
    icon,
    formatCurrency
  }: {
    loading: boolean;
    label: string;
    value?: number;
    icon: React.ReactNode;
    formatCurrency?: boolean;
  }) => (
    <Card className="bg-primary text-primary-foreground p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="opacity-80 text-sm">{label}</p>
          {loading ? (
            <Skeleton className="h-8 w-24 mt-1" />
          ) : (
            <p className="text-2xl font-bold">
              {formatCurrency
                ? new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0
                  }).format(value || 0)
                : value?.toLocaleString("id-ID")}
            </p>
          )}
        </div>
        {icon}
      </div>
    </Card>
  );