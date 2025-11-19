import { Payment } from "../types/payment";
import { I18N } from "../constants/i18n";
import { ApiError } from "../api/payments";
import { formatDate, formatAmount } from "../utils";
import {
  Table,
  TableBodyWrapper,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
  TableWrapper,
  StatusBadge,
  PaginationRow,
  PaginationButton,
  Spinner,
  ErrorBox,
  EmptyBox,
} from "./components";

interface PaymentsTableProps {
  payments: Payment[] | undefined;
  page: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  error: Error | null;
  onPrevious: () => void;
  onNext: () => void;
}

export const PaymentsTable = ({
  payments,
  page,
  isFirstPage,
  isLastPage,
  isLoading,
  error,
  onPrevious,
  onNext,
}: PaymentsTableProps) => {
  return (
    <div className="mt-5">
      {isLoading && <Spinner />}

      {error && (
        <ErrorBox>
          {error instanceof ApiError && error.status === 404
            ? I18N.PAYMENT_NOT_FOUND
            : I18N.INTERNAL_SERVER_ERROR}
        </ErrorBox>
      )}

      {!error && (!payments || payments.length === 0) && (
        <EmptyBox>{I18N.NO_PAYMENTS_FOUND}</EmptyBox>
      )}

      {!error && payments && payments.length > 0 && (
        <TableWrapper>
          <Table>
            <TableHeaderWrapper>
              <TableHeaderRow>
                <TableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_DATE}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_AMOUNT}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_CUSTOMER}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_CURRENCY}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_STATUS}</TableHeader>
              </TableHeaderRow>
            </TableHeaderWrapper>
            <TableBodyWrapper>
              {payments.map((payment: Payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{formatDate(payment.date)}</TableCell>
                  <TableCell>{formatAmount(payment.amount)}</TableCell>
                  <TableCell>{payment.customerName}</TableCell>
                  <TableCell>{payment.currency}</TableCell>
                  <TableCell>
                    <StatusBadge status={payment.status}>
                      {payment.status}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBodyWrapper>
          </Table>
          <PaginationRow>
            <PaginationButton
              onClick={onPrevious}
              disabled={isFirstPage}
              aria-label={I18N.PREVIOUS_BUTTON}
            >
              {I18N.PREVIOUS_BUTTON}
            </PaginationButton>
            <span>
              {I18N.PAGE_LABEL} {page}
            </span>
            <PaginationButton
              onClick={onNext}
              disabled={isLastPage}
              aria-label={I18N.NEXT_BUTTON}
            >
              {I18N.NEXT_BUTTON}
            </PaginationButton>
          </PaginationRow>
        </TableWrapper>
      )}
    </div>
  );
};
