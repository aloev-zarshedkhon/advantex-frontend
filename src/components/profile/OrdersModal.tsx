import { Dispatch, SetStateAction, useContext } from "react";
import { Stack } from "@mui/material";
import { Colors } from "@/utils/consts";
import TableWrapper from "../reusable/TableWrapper";
import ModalWrapper from "../reusable/ModalWrapper";
import { translate } from "@/utils/functions";
import { AuthContext } from "@/context";
import { OrderItems } from "@/types/order";
import { TableBodyCellType, TableCellType } from "@/types";

type Props = {
  item: OrderItems[];
  setItem: Dispatch<SetStateAction<OrderItems[] | undefined>>;
};

export default function CustomizedDialogs({ item, setItem }: Props) {
  const { lang } = useContext(AuthContext);

  const handleClose = () => {
    setItem(undefined);
  };

  const tableHeadeCell: TableCellType[] = [
    "#",
    translate("order.product", lang),
    translate("order.quantity", lang),
    translate("order.total", lang),
  ];
  const tableBodyCell: TableBodyCellType[] = item
    ? item.map((e, index) => {
        return {
          num: index,
          product: e.product.name,
          quantity: e.quantity,
          total: e.price,
        };
      })
    : [];

  return (
    <Stack>
      <ModalWrapper
        open={Boolean(open)}
        setOpen={handleClose}
        content={
          item && item.length > 0 ? (
            <TableWrapper
              tableCell={tableHeadeCell}
              tableBodyCell={tableBodyCell}
            />
          ) : (
            <Stack sx={{ color: Colors.red }}>
              {translate("checkout.nothing_found", lang)}
            </Stack>
          )
        }
        title={translate("order.products", lang)}
      />
    </Stack>
  );
}
