import React, { useContext, useState, ReactElement, useRef } from "react";
import { Typography, Stack, IconButton, Box } from "@mui/material";
import { FlexBox, pageContainer } from "@/utils/globalStyles";
import { DecrementIcon, DeleteIcon, IncrementIcon } from "@/assets/icons";
import { Colors, Variables } from "@/utils/consts";
import SubmitBtn from "../reusable/SubmitBtn";
import TableWrapper from "../reusable/TableWrapper";
import { AuthContext } from "@/context";
import {
  deleter,
  getter,
  poster,
  sumFormatter,
  translate,
} from "@/utils/functions";
import ItemNotFound from "../reusable/ItemNotFound";
import Loading from "../reusable/loading";
import { TableBodyCellType, TableCellType } from "@/types";
import { CartProduct } from "@/types/product";
import { useRouter } from "next/router";

type FormValues = {
  coupon?: string;
};

type Props = {
  text: string;
  num: number;
  color: 1 | 2 | 3;
};

const MiniText = ({ text, num, color }: Props): ReactElement => {
  return (
    <Stack sx={{ ...FlexBox, margin: "3px 0" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color:
            color == 2 ? "red" : color == 3 ? "green" : Colors.headerBorder,
        }}
      >
        {text}:
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color:
            color == 2 ? "red" : color == 3 ? "green" : Colors.headerBorder,
          fontWeight: 600,
        }}
      >
        {sumFormatter(num)}
      </Typography>
    </Stack>
  );
};

type DiscountType = {
  is_percent: boolean;
  amount: number;
};

const Checkout: React.FC = () => {
  const { lang, cartProducts, setCartProducts } = useContext(AuthContext);
  const [discount, setDiscount] = useState<DiscountType>();
  const [couponStatus, setCouponStatus] = useState<boolean>();
  const router = useRouter();
  const couponRef = useRef<HTMLInputElement>(null);

  function FindTotalPrice(items: CartProduct[]) {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const price = item.price;
      const quantity = item.quantity;

      total += price * quantity;
    }

    return total;
  }

  const getCouponStatusInfo = () => {
    if (couponStatus === undefined) {
      return { color: Colors.headerBorder, text: null };
    } else if (couponStatus) {
      return {
        color: Colors.green,
        text: translate("checkout.coupon.true", lang),
      };
    } else {
      return { color: "red", text: translate("checkout.coupon.false", lang) };
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = couponRef.current?.value ?? "";
    if (text) {
      const result = await getter(`shop/check_coupon/${text}`, true);
      if (result.ok && result.data) {
        setDiscount(result.data);
        setCouponStatus(true);
      } else {
        setCouponStatus(false);
      }
    }
  };

  const handleDecrement = async (id: number) => {
    if (cartProducts.data) {
      const updatedProducts = cartProducts.data.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity:
              product.quantity > 1 ? product.quantity - 1 : product.quantity,
          };
        }
        return product;
      });
      setCartProducts({ load: false, data: updatedProducts });
      const product = cartProducts.data.find((e) => e.id == id);
      if (product) {
        await poster(
          "shop/add_to_cart/",
          {
            product: id,
            quantity:
              product.quantity > 1 ? product.quantity - 1 : product.quantity,
          },
          true
        );
      }
    }
  };

  const handleIncrement = async (id: number) => {
    if (cartProducts.data) {
      const updatedProducts = cartProducts.data.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity:
              product.quantity < Number(Variables.max_count)
                ? product.quantity + 1
                : product.quantity,
          };
        }
        return product;
      });
      setCartProducts({ load: false, data: updatedProducts });
      const product = cartProducts.data.find((e) => e.id == id);
      if (product) {
        await poster(
          "shop/add_to_cart/",
          {
            product: id,
            quantity:
              product.quantity < Number(Variables.max_count)
                ? product.quantity + 1
                : product.quantity,
          },
          true
        );
      }
    }
  };

  const handleDelete = async (id: number) => {
    const result = await deleter(`shop/remove_from_cart/${id}`, true);
    if (result.ok && result.data) {
      const filter = cartProducts.data?.filter((e) => e.id != id);
      setCartProducts({ load: false, data: filter });
    }
  };

  const tableCell: TableCellType[] = [
    translate("checkout.product", lang),
    translate("checkout.count", lang),
    translate("checkout.total", lang),
    { icon: <DeleteIcon /> },
  ];

  const tableBodyCell: TableBodyCellType[] = cartProducts.data
    ? cartProducts.data.map((e) => {
        return {
          title: e.product.name,
          count: (
            <Stack sx={{ ...FlexBox }}>
              <IconButton onClick={() => handleDecrement(e.id)}>
                <DecrementIcon />
              </IconButton>

              <Typography>{e.quantity}</Typography>
              <IconButton onClick={() => handleIncrement(e.id)}>
                <IncrementIcon />
              </IconButton>
            </Stack>
          ),
          total: e.price * e.quantity,
          delete: (
            <IconButton onClick={() => handleDelete(e.id)}>
              <DeleteIcon />
            </IconButton>
          ),
        };
      })
    : [];

  const handleCheckout = async () => {
    const text = couponRef.current?.value?.trim() ?? "";
    const postOption: FormValues = {};
    if (text.length > 0) {
      postOption.coupon = text;
    }
    const result = await poster("shop/checkout/", postOption, true);
    if (result.ok && result.data) {
      alert(result.msg);
      setCartProducts({ load: false, data: [] });
      router.push("/");
    } else {
      alert(result.msg);
    }
  };

  const checkDisCount = (state?: DiscountType): number => {
    try {
      if (state) {
        let amount = state.is_percent
          ? FindTotalPrice(cartProducts.data ?? []) * (state.amount / 100)
          : state.amount;
        return amount;
      } else {
        return 0;
      }
    } catch {
      return 0;
    }
  };
  return (
    <Stack sx={{ ...pageContainer }}>
      {cartProducts.load && <Loading />}
      {cartProducts.data && cartProducts.data.length > 0 ? (
        <Stack
          sx={{ border: `1px solid ${Colors.headerBorder}`, padding: "20px" }}
        >
          <Typography variant="h4">
            {translate("checkout.title", lang)}
          </Typography>
          <Stack
            sx={{
              margin: "20px 0",
              border: `1px solid ${Colors.headerBorder}`,
              borderRadius: "5px",
              padding: { xs: "3px 5px", sm: "7px 10px", md: "10px 12px" },
              width: { xs: "100%", sm: "80%", md: "68%", lg: "50%" },
            }}
          >
            <Typography sx={{ color: Colors.contrastText }}>
              {translate("checkout.coupon.label", lang)}
            </Typography>
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{ ...FlexBox, alignItems: "flex-start", marginTop: "30px" }}
            >
              <Stack>
                <Box
                  component="input"
                  placeholder="code"
                  sx={{
                    outline: "none",
                    padding: {
                      xs: "5px 10px",
                      sm: "8px 10px",
                      md: "9px 10px",
                      lg: "12px 10px",
                    },
                    borderRadius: "5px",
                    border: `1px solid ${getCouponStatusInfo().color}`,
                  }}
                  ref={couponRef}
                />
                <Typography sx={{ fontSize: "12px", marginLeft: "10px" }}>
                  {getCouponStatusInfo().text}
                </Typography>
              </Stack>
              <SubmitBtn text={translate("checkout.check", lang)} />
            </Box>
          </Stack>
          <TableWrapper
            headSx={{
              "& th:first-of-type": {
                textAlign: "left",
              },
            }}
            bodySx={{
              "& td:first-of-type": {
                textAlign: "left",
              },
              "& td:last-of-type": {
                width: "5%",
              },
              "& td:nth-of-type(3)": {
                width: "15%",
              },
              "& td:nth-of-type(2)": {
                width: "15%",
              },
            }}
            tableCell={tableCell}
            tableBodyCell={tableBodyCell}
          />

          <MiniText
            text={translate("checkout.price", lang)}
            num={FindTotalPrice(cartProducts.data)}
            color={1}
          />
          <MiniText
            text={translate("checkout.discount", lang)}
            num={checkDisCount(discount)}
            color={2}
          />
          <MiniText
            text={translate("checkout.total", lang)}
            num={FindTotalPrice(cartProducts.data) - checkDisCount(discount)}
            color={3}
          />

          <Stack sx={{ margin: "20px auto 0 auto" }} onClick={handleCheckout}>
            <SubmitBtn text={translate("checkout.place_order", lang)} />
          </Stack>
        </Stack>
      ) : (
        <Typography sx={{ margin: "40px auto" }} variant="h2">
          {translate("checkout.empty", lang)}
        </Typography>
      )}
      {cartProducts.error && <ItemNotFound />}
    </Stack>
  );
};

export default Checkout;
