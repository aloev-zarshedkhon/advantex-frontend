import { AuthContext } from "@/context";
import { BrandsResultItem } from "@/types/brand";
import { AllIndustriesResponseData } from "@/types/industry";
import { AllTypesResponseData } from "@/types/types";
import { translate } from "@/utils/functions";
import { Box, Stack, Typography } from "@mui/material";
import { ReactElement, useContext } from "react";
import SubmitBtn from "../reusable/SubmitBtn";

type AllItems =
  | AllIndustriesResponseData[]
  | BrandsResultItem[]
  | AllTypesResponseData[];

type Props = {
  items: AllItems;
  checkedItems: number[];
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
  multiLang?: boolean;
  labelId?: string;
};

const CheckboxList: React.FC<Props> = ({
  items,
  checkedItems,
  setCheckedItems,
  multiLang,
  labelId,
}) => {
  const { lang } = useContext(AuthContext);
  const handleChange = (itemId: number) => {
    const find = checkedItems.find((e) => e == itemId);
    if (find) {
      const filtered = checkedItems.filter((ch) => ch != itemId);
      setCheckedItems(filtered);
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  return (
    <Stack>
      {items.map((item: any, index: number) => (
        <Stack
          key={index}
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            flexDirection: "row",
            padding: "3px 0",
          }}
        >
          <Box
            component="input"
            type="checkbox"
            id={String(`${labelId} -${item.id}`)}
            checked={checkedItems.includes(item.id) || false}
            onChange={() => handleChange(item.id)}
          />
          <label htmlFor={String(`${labelId} -${item.id}`)}>
            {String(multiLang ? item[`name_${lang}`] : item.name)}
          </label>
        </Stack>
      ))}
    </Stack>
  );
};

type FilterProps = Props & {
  submit: () => void;
  brands: AllItems;
  checkedbrands: number[];
  setCheckedBrands: React.Dispatch<React.SetStateAction<number[]>>;
  types: AllItems;
  checkedTypes: number[];
  setCheckedTypes: React.Dispatch<React.SetStateAction<number[]>>;
};

const Filter = ({
  items,
  checkedItems,
  setCheckedItems,
  submit,
  brands,
  checkedbrands,
  setCheckedBrands,
  types,
  checkedTypes,
  setCheckedTypes,
}: FilterProps): ReactElement => {
  const { lang } = useContext(AuthContext);
  return (
    <Stack>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {translate("home.industry", lang)}
      </Typography>
      <CheckboxList
        items={items}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        multiLang
        labelId="industry"
      />
      <Typography variant="h4" sx={{ fontWeight: 600, marginTop: "20px" }}>
        {translate("shop.brands", lang)}
      </Typography>
      <CheckboxList
        items={brands}
        checkedItems={checkedbrands}
        setCheckedItems={setCheckedBrands}
        labelId="brand"
      />

      <Typography variant="h4" sx={{ fontWeight: 600, marginTop: "20px" }}>
        {translate("shop.types", lang)}
      </Typography>
      <CheckboxList
        items={types}
        checkedItems={checkedTypes}
        setCheckedItems={setCheckedTypes}
        labelId="type"
        multiLang
      />

      <Stack
        sx={{
          textTransform: "uppercase",
          margin: "10px auto 0 0",
        }}
        onClick={submit}
      >
        <SubmitBtn text={translate("btn.submit", lang)} />
      </Stack>
    </Stack>
  );
};

export default Filter;
