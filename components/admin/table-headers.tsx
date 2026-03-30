import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

// ============================================
// Order Table Headers
// ============================================

interface TableHeaderColumn {
  label: string;
  className?: string;
}

const ORDER_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: "Comandă" },
  { label: "Client", className: "hidden sm:table-cell" },
  { label: "Articole", className: "hidden text-center md:table-cell" },
  { label: "Total", className: "hidden sm:table-cell" },
  { label: "Stare", className: "text-center sm:text-left" },
  { label: "Dată", className: "hidden md:table-cell" },
];

export function OrderTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        {ORDER_TABLE_COLUMNS.map((column) => (
          <TableHead key={column.label} className={column.className}>
            {column.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}

// ============================================
// Product/Inventory Table Headers
// ============================================

const PRODUCT_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: "Imagine", className: "hidden w-16 sm:table-cell" },
  { label: "Produs" },
  { label: "Preț", className: "hidden w-28 md:table-cell" },
  { label: "Stoc", className: "hidden w-28 md:table-cell" },
  { label: "Acțiuni", className: "hidden w-[140px] text-right sm:table-cell" },
];

export function ProductTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        {PRODUCT_TABLE_COLUMNS.map((column) => (
          <TableHead key={column.label} className={column.className}>
            {column.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
