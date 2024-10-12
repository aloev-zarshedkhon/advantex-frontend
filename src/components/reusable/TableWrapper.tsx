import { TableBodyCellType, TableCellType } from "@/types";
import {
  Paper,
  Stack,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactElement } from "react";

type Props = {
  sx?: SxProps;
  tableSx?: SxProps;
  headSx?: SxProps;
  bodySx?: SxProps;
  tableCellSx?: SxProps;
  BodytableCellSx?: SxProps;
  tableCell: TableCellType[];
  tableBodyCell: TableBodyCellType[];
};

const TableWrapper = ({
  sx,
  tableSx,
  headSx,
  bodySx,
  tableCell,
  tableCellSx,
  BodytableCellSx,
  tableBodyCell,
}: Props): ReactElement => {
  const tableHeadStyle: SxProps = {
    textAlign: "center",
    fontWeight: 600,
    textTransform: "uppercase",
  };
  return (
    <Stack sx={sx}>
      <TableContainer component={Paper} sx={{ margin: "30px 0", ...tableSx }}>
        <Table>
          <TableHead sx={headSx}>
            <TableRow>
              {tableCell.map((e, ind) => (
                <TableCell sx={{ ...tableHeadStyle, ...tableCellSx }} key={ind}>
                  {typeof e === "string" ? e : e?.icon}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={bodySx}>
            {tableBodyCell.map((e, ind) => (
              <TableRow key={ind}>
                {Object.values(e).map((i, index) => (
                  <TableCell
                    key={index}
                    sx={{ textAlign: "center", ...BodytableCellSx }}
                  >
                    {i}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default TableWrapper;
