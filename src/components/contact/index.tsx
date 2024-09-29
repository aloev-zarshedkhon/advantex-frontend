import { Box, Grid, Stack, SxProps, Typography } from "@mui/material";
import { ReactElement, useContext, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ContactUsItem from "./ContactUsItem";
import { AddresIcon, PhoneIcon } from "@/assets/icons";
import { EmailIcon } from "@/assets/icons/SocialIcons";
import { Colors, Variables } from "@/utils/consts";
import { AuthContext } from "@/context";
import { translate } from "@/utils/functions";
import { pageContainer } from "@/utils/globalStyles";

const ContactComponent = (): ReactElement => {
  const { lang } = useContext(AuthContext);
  const [token, setToken] = useState<string | false>(false);
  const inputStyles: SxProps = {
    width: "100%",
    fontSize: "16px",
    color: "#636363",
    height: "50px",
    border: "1px solid #ebebeb",
    borderRadius: "5px",
    paddingLeft: "20px",
    marginBottom: "30px",
    outline: "none",
    resize: "none",
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameInput = e.currentTarget.elements.namedItem(
      "name"
    ) as HTMLInputElement;
    const nameValue = nameInput.value;
    const emailInput = e.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const emailValue = emailInput.value;

    const messageInput = e.currentTarget.elements.namedItem(
      "message"
    ) as HTMLInputElement;
    const messageValue = messageInput.value;
    alert(`email: ${emailValue}, name: ${nameValue}, message: ${messageValue}`);
  };

  const handleRecaptchaChange = (value: any) => {
    if (value) {
      setToken(value);
    } else {
      setToken(false);
    }
  };
  return (
    <Stack sx={pageContainer}>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Stack>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                margin: { xs: "20px 0", sm: "30px 0", lg: 0 },
              }}
            >
              {translate("contact.title", lang)}
            </Typography>
          </Stack>
          <Stack sx={{ marginTop: "30px" }}>
            <ContactUsItem
              icon={<AddresIcon />}
              url="https://goo.gl/maps/YExay5AtBvi2Fe7q8"
              label={translate("contact.address.label", lang)}
              content={translate("contact.address.text", lang)}
            />
            <ContactUsItem
              icon={<PhoneIcon />}
              url="tel:+998901687628"
              label={translate("contact.phone", lang)}
              content="+99890 168-76-28"
            />
            <ContactUsItem
              icon={<EmailIcon />}
              label={translate("contact.email", lang)}
              url="mailto:ravshan.vafoev@advantex.uz"
              content="ravshan.vafoev@advantex.uz"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              margin: { xs: "20px 0", sm: "30px 0", lg: 0 },
            }}
          >
            {translate("contact.comment.title", lang)}
          </Typography>
          <Box component="form" sx={{ marginTop: "30px" }} onSubmit={onSubmit}>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item xs={12} lg={5.8}>
                <Box
                  component="input"
                  type="text"
                  name="name"
                  placeholder={translate("contact.comment.name", lang)}
                  sx={{ ...inputStyles }}
                  required
                  minLength={2}
                />
              </Grid>
              <Grid item xs={12} lg={5.8}>
                <Box
                  component="input"
                  type="email"
                  name="email"
                  placeholder={translate("contact.comment.email", lang)}
                  sx={{ ...inputStyles }}
                  required
                  minLength={2}
                />
              </Grid>
              <Grid xs={12}>
                <Box
                  component="textarea"
                  placeholder={translate("contact.comment.message", lang)}
                  name="message"
                  sx={{ ...inputStyles, height: "150px", paddingTop: "10px" }}
                  required
                  minLength={2}
                />
              </Grid>
              <Stack
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: { sm: "row" },
                }}
              >
                <Stack>
                  {Variables.captchaKey && (
                    <ReCAPTCHA
                      sitekey={Variables.captchaKey}
                      onChange={handleRecaptchaChange}
                      onError={() => setToken(false)}
                    />
                  )}
                </Stack>
                <Box
                  component="button"
                  type="submit"
                  sx={{
                    border: "none",
                    outline: "none",
                    padding: "16px 40px",
                    borderRadius: "5px",
                    background: Colors.orange,
                    color: Colors.headerBorder,
                    fontSize: "18px",
                    fontWeight: 700,
                    cursor: token ? "pointer" : "not-allowed",
                    marginTop: { xs: "10px", sm: 0 },
                  }}
                  disabled={!Boolean(token)}
                >
                  {translate("contact.comment.sendbtn", lang)}
                </Box>
              </Stack>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ margin: "30px 0" }}>
          <Box
            component="iframe"
            sx={{ width: "100%", height: "500px" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d813.0950393183612!2d69.22993494602254!3d41.34200844575919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8c7a33f8dfaf%3A0x3559bb1dc9ac5aee!2zMTg2INGD0LvQuNGG0LAg0KHQsNCz0LHQsNC9LCDQotCw0YjQutC10L3RgiAxMDAwNjksINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1sru!2s!4v1700403518064!5m2!1sru!2s"
            height="610"
          ></Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ContactComponent;
