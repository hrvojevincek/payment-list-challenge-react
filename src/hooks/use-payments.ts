import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaymentSearchResponse } from "../types/payment";
import { fetchPayments } from "../api/payments";

const DEFAULT_PAGE_SIZE = 5;

interface UsePaymentsOptions {
  pageSize?: number;
  search?: string;
  currency?: string;
}

export const usePayments = ({
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
  currency = "",
}: UsePaymentsOptions = {}) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<PaymentSearchResponse>({
    queryKey: ["payments", page, pageSize, search, currency],
    queryFn: () => fetchPayments({ page, pageSize, search, currency }),
  });

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.total / pageSize) : 0),
    [data, pageSize]
  );

  const isFirstPage = page === 1;
  const isLastPage = page >= totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      setPage((prev) => prev + 1);
    }
  };

  const resetPage = () => {
    setPage(1);
  };

  return {
    data,
    isLoading,
    error,
    page,
    totalPages,
    isFirstPage,
    isLastPage,
    setPage,
    handlePrevious,
    handleNext,
    resetPage,
  };
};
