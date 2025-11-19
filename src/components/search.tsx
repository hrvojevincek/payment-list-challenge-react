import { CURRENCIES } from "../constants";
import { I18N } from "../constants/i18n";
import { ClearButton, SearchButton, SearchInput, Select } from "./components";

interface SearchProps {
  currency: string;
  search: string;
  onCurrencyChange: (currency: string) => void;
  onSearchChange: (search: string) => void;
  onSearchSubmit: () => void;
  onClearFilters: () => void;
}

const Search = ({
  currency,
  search,
  onCurrencyChange,
  onSearchChange,
  onSearchSubmit,
  onClearFilters,
}: SearchProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-4">
      <SearchInput
        aria-label={I18N.SEARCH_LABEL}
        placeholder={I18N.SEARCH_PLACEHOLDER}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Select
        aria-label={I18N.CURRENCY_FILTER_LABEL}
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        <option value="">{I18N.CURRENCIES_OPTION}</option>
        {CURRENCIES.map((curr) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </Select>
      <SearchButton type="submit">{I18N.SEARCH_BUTTON}</SearchButton>
      <ClearButton type="button" onClick={onClearFilters}>
        {I18N.CLEAR_FILTERS}
      </ClearButton>
    </form>
  );
};

export default Search;
