import { API_URL } from "../constants";
import { PaymentSearchResponse } from "../types/payment";

export interface FetchPaymentsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  currency?: string;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export const fetchPayments = async (
  params: FetchPaymentsParams = {}
): Promise<PaymentSearchResponse> => {
  const { page = 1, pageSize = 5, search = "", currency = "" } = params;

  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (pageSize) queryParams.append("pageSize", pageSize.toString());
  if (search) queryParams.append("search", search);
  if (currency) queryParams.append("currency", currency);

  const url = `${API_URL}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    );
  }

  return response.json();
};
