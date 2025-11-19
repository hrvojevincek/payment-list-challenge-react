import { I18N } from "../constants/i18n";
import { usePayments } from "../hooks/use-payments";
import { Container, Title } from "./components";

import { PaymentsTable } from "./payments-table";
import { useState } from "react";
import Search from "./search";

export const PaymentsPage = () => {
  const [currency, setCurrency] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    error,
    page,
    isFirstPage,
    isLastPage,
    handlePrevious,
    handleNext,
    resetPage,
  } = usePayments({
    pageSize: 5,
    currency,
    search,
  });

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    resetPage();
  };

  const handleSearchInputChange = (newSearch: string) => {
    setSearchInput(newSearch);
  };

  const handleSearchSubmit = () => {
    setSearch(searchInput);
    resetPage();
  };

  const handleClearFilters = () => {
    setCurrency("");
    setSearchInput("");
    setSearch("");
    resetPage();
  };

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
      <Search
        currency={currency}
        search={searchInput}
        onCurrencyChange={handleCurrencyChange}
        onSearchChange={handleSearchInputChange}
        onSearchSubmit={handleSearchSubmit}
        onClearFilters={handleClearFilters}
      />

      <PaymentsTable
        payments={data?.payments}
        page={page}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        isLoading={isLoading}
        error={error}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </Container>
  );
};
