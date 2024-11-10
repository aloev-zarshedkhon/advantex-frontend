import { EyeIcon } from "@/assets/icons";
import { IconButton, Stack } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import CustomizedDialogs from "./OrdersModal";
import TableWrapper from "../reusable/TableWrapper";
import { AuthContext } from "@/context";
import { dateFormatter, getter, translate } from "@/utils/functions";
import { OrderItem, OrderItems, OrdersResponseData } from "@/types/order";
import SubmitBtn from "../reusable/SubmitBtn";
import { FlexBox } from "@/utils/globalStyles";
import { TableBodyCellType, TableCellType } from "@/types";

type DataType = {
  load?: boolean;
  data?: OrdersResponseData;
  error?: boolean;
};

const OrdersSection = (): ReactElement => {
  const { lang } = useContext(AuthContext);
  const [item, setItem] = useState<OrderItems[]>();
  const [orders, setOrders] = useState<DataType>({
    load: false,
    error: false,
    data: undefined,
  });
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getValues = async () => {
      setOrders({ load: true, data: orders.data });
      const result = await getter(`shop/orders?page=${page}`, true);
      if (result.ok && result.data) {
        setOrders({
          load: false,
          data: result.data,
          error: false,
        });
      } else {
        setOrders({ load: false, error: true, data: undefined });
      }
    };
    getValues();
  }, [page]);

  const handleOpenModal = (child: OrderItems[]) => {
    setItem(child);
  };

  const tableCellDatas: TableCellType[] = [
    translate("order.number", lang),
    translate("order.date", lang),
    translate("order.total", lang),
    translate("order.status", lang),
    { icon: <EyeIcon /> },
  ];

  const tableBodyDatas: TableBodyCellType[] = orders.data
    ? orders.data.results.map((o: OrderItem) => {
        return {
          order_num: o.id,
          date: dateFormatter(o.created_at),
          total: o?.total_price ?? 0,
          status: o.status,
          icon: (
            <IconButton onClick={() => handleOpenModal(o.items)}>
              <EyeIcon />
            </IconButton>
          ),
        };
      })
    : [];

  return (
    <Stack>
      <TableWrapper tableCell={tableCellDatas} tableBodyCell={tableBodyDatas} />
      <Stack sx={{ ...FlexBox, justifyContent: "right" }}>
        {orders.data && orders.data.previous && (
          <Stack
            sx={{ marginRight: "10px" }}
            onClick={() =>
              setPage(Number(orders?.data?.previous?.split("=")?.[1] ?? 1))
            }
          >
            <SubmitBtn
              text="prev"
              loading={
                orders.load &&
                Number(orders?.data?.previous?.split("=")?.[1] ?? 1) == page
              }
            />
          </Stack>
        )}
        {orders.data && orders.data.next && (
          <Stack
            onClick={() => setPage(Number(orders?.data?.next?.split("=")?.[1]))}
          >
            <SubmitBtn
              text="next"
              loading={
                orders.load &&
                Number(orders?.data?.next?.split("=")?.[1]) == page
              }
            />
          </Stack>
        )}
      </Stack>
      {item && <CustomizedDialogs item={item} setItem={setItem} />}
    </Stack>
  );
};

export default OrdersSection;
