export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  description: string;
  clientId: string;
}

export interface PaymentSearchResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
}
