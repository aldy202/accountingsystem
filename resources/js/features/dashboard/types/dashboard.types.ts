export interface DashboardStats {
    cashPosition: number;
    outstandingAp: number;
    outstandingAr: number;
    revenueMom: number;
    expenseMom: number;
}

export interface MonthlyProfitabilityRow {
    period: string; // contoh: "March 2026"
    revenue: number;
    expense: number;
    netProfit: number;
}

export interface TopSpendingProject {
    projectId: number;
    projectName: string;
    totalExpense: number;
}
