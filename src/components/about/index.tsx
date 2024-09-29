import { Stack } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import TextBorderBottom from "../reusable/TextBorderBottom";
import { AuthContext } from "@/context";
import { getter, translate } from "@/utils/functions";
import ShareComponent from "../reusable/SHareComponent";
import { pageContainer } from "@/utils/globalStyles";
import HtmlContent from "../reusable/HtmlContent";
import { CompanyOptions } from "@/types/types";

const AboutComponent = (): ReactElement => {
  const { lang } = useContext(AuthContext);

  const [data, setData] = useState<CompanyOptions[]>();

  useEffect(() => {
    (async () => {
      const result = await getter(`company/options`);
      if (result.ok && result?.data) {
        setData(result.data);
      } else {
        setData([]);
      }
    })();
  }, []);

  const findCurrentValue = (arr: CompanyOptions[]) => {
    try {
      const find = arr.find((e) => e.key === `about_us_${lang}`);
      return (find && find.value) || false;
    } catch {
      return false;
    }
  };

  return (
    <Stack sx={pageContainer}>
      <TextBorderBottom text={translate("about.title", lang)} />
      <Stack sx={{ marginTop: "30px" }}>
        <HtmlContent
          content={
            (data && data.length && findCurrentValue(data)) ||
            translate("about.html", lang)
          }
        />
        <Stack sx={{ justifyContent: "right", marginTop: "20px" }}>
          <ShareComponent text={translate("about.title", lang)} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AboutComponent;
