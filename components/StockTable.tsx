"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

type Stock = {
  id: string;
  symbol: string;
  companyName: string;
  sector: string;
  price: number;
  pe: number;
};

interface Props {
  data: Stock[];
}

export default function StockTable({ data }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [selectedSector, setSelectedSector] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minPE, setMinPE] = useState("");
  const [maxPE, setMaxPE] = useState("");

  const sectors = [...new Set(data.map((stock) => stock.sector))];

  const filteredData = data.filter((stock) => {
    const sectorMatch =
      selectedSector === "" ||
      stock.sector === selectedSector;

    const minPriceMatch =
      minPrice === "" ||
      stock.price >= Number(minPrice);

    const maxPriceMatch =
      maxPrice === "" ||
      stock.price <= Number(maxPrice);

    const minPEMatch =
      minPE === "" ||
      stock.pe >= Number(minPE);

    const maxPEMatch =
      maxPE === "" ||
      stock.pe <= Number(maxPE);

    const searchMatch =
      appliedSearch.trim() === "" ||
      stock.symbol
        .toLowerCase()
        .includes(appliedSearch.toLowerCase()) ||
      stock.companyName
        .toLowerCase()
        .includes(appliedSearch.toLowerCase()) ||
      stock.sector
        .toLowerCase()
        .includes(appliedSearch.toLowerCase());

    return (
      sectorMatch &&
      minPriceMatch &&
      maxPriceMatch &&
      minPEMatch &&
      maxPEMatch &&
      searchMatch
    );
  });

  const columns: ColumnDef<Stock>[] = [
    {
      accessorKey: "symbol",
      header: "Symbol",
    },
    {
      accessorKey: "companyName",
      header: "Company",
    },
    {
      accessorKey: "sector",
      header: "Sector",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) =>
        `₹${row.original.price.toFixed(2)}`,
    },
    {
      accessorKey: "pe",
      header: "PE",
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <h3 style={{ color: "green" }}>
        Filtered Rows: {filteredData.length}
      </h3>

      <p>
        Search Applied:{" "}
        <strong>
          {appliedSearch || "None"}
        </strong>
      </p>

      {/* Sector */}
      <div style={{ marginBottom: "12px" }}>
        <select
          value={selectedSector}
          onChange={(e) =>
            setSelectedSector(e.target.value)
          }
        >
          <option value="">
            All Sectors
          </option>

          {sectors.map((sector) => (
            <option
              key={sector}
              value={sector}
            >
              {sector}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
        />
      </div>

      {/* PE */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <input
          type="number"
          placeholder="Min PE"
          value={minPE}
          onChange={(e) =>
            setMinPE(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Max PE"
          value={maxPE}
          onChange={(e) =>
            setMaxPE(e.target.value)
          }
        />
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <input
          type="text"
          placeholder="Search Symbol, Company, Sector..."
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
          style={{
            flex: 1,
            padding: "10px",
          }}
        />

        <button
          onClick={() => {
            alert(`Searching: ${searchText}`);
            setAppliedSearch(searchText);
          }}
        >
          Search
        </button>

      {/* Reset */}
      <button
        onClick={() => {
          setSelectedSector("");
          setMinPrice("");
          setMaxPrice("");
          setMinPE("");
          setMaxPE("");
          setSearchText("");
          setAppliedSearch("");
        }}
        style={{
          marginBottom: "16px",
        }}
      >
        Reset Filters
      </button>

      {/* Table */}
      <table
        border={1}
        cellPadding={8}
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          {table.getHeaderGroups().map(
            (headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(
                  (header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          "#f3f4f6",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef
                          .header,
                        header.getContext()
                      )}
                    </th>
                  )
                )}
              </tr>
            )
          )}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(
            (row) => (
              <tr key={row.id}>
                {row
                  .getVisibleCells()
                  .map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef
                          .cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
              </tr>
            )
          )}
        </tbody>
      </table>

      <p
        style={{
          marginTop: "12px",
          fontWeight: "bold",
        }}
      >
        Showing {filteredData.length} stocks
      </p>
    </div>
  );
}