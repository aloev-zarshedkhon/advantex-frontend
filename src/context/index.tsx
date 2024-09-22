import { AllIndustriesResponseData } from "@/types/industry";
import { CartProduct, Product } from "@/types/product";
import { Variables } from "@/utils/consts";
import { getter } from "@/utils/functions";
import Cookies from "js-cookie";
import { createContext, useEffect, useState, ReactNode } from "react";

type dataType = {
  load: boolean;
  data?: AllIndustriesResponseData[];
  error?: boolean;
};

type Favorite = {
  data?: Product[];
  load: boolean;
  error?: boolean;
};

type Cart = {
  data?: CartProduct[];
  load: boolean;
  error?: boolean;
};

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  lang: string;
  setLang: (lang: string) => void;
  setIndustriesData: ({ load, data, error }: dataType) => void;
  industriesData: dataType;
  setFavoriteProducts: ({ load, data, error }: Favorite) => void;
  favoriteProducts: Favorite;
  setCartProducts: ({ load, data, error }: Cart) => void;
  cartProducts: Cart;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  accessToken: null,
  setAccessToken: () => {},
  lang: Variables.defaultLang,
  setLang: () => {},
  industriesData: {
    load: false,
    data: undefined,
    error: false,
  },
  setIndustriesData: () => {},
  favoriteProducts: {
    load: false,
    data: undefined,
    error: false,
  },
  setFavoriteProducts: () => {},
  cartProducts: {
    load: false,
    data: undefined,
    error: false,
  },
  setCartProducts: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [lang, setLang] = useState<string>(Variables.defaultLang);

  const [industriesData, setIndustriesData] = useState<dataType>({
    load: false,
    data: undefined,
    error: false,
  });
  const [favoriteProducts, setFavoriteProducts] = useState<Favorite>({
    load: false,
    data: undefined,
    error: false,
  });

  const [cartProducts, setCartProducts] = useState<Cart>({
    load: false,
    data: undefined,
    error: false,
  });

  useEffect(() => {
    const storedToken = Cookies.get("refresh_token");
    const storedAccessToken = Cookies.get("access_token");
    const storedLang = Cookies.get("lang");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    if (storedLang) {
      setLang(storedLang);
    }

    const getValues = async () => {
      setIndustriesData({ load: true });
      const result = await getter("shop/industry");
      if (result.ok && result?.data) {
        setIndustriesData({
          load: false,
          data: result.data,
          error: false,
        });
      } else {
        setIndustriesData({ load: false, data: undefined, error: true });
      }
    };
    getValues();
  }, []);

  useEffect(() => {
    const getFavoriteProducts = async () => {
      setFavoriteProducts({ load: true });
      const result = await getter("shop/favorite_products/", true);
      if (result.ok && result?.data) {
        setFavoriteProducts({
          load: false,
          data: result.data,
          error: false,
        });
      } else {
        setFavoriteProducts({ load: false, data: undefined, error: true });
      }
    };
    const getCartProducts = async () => {
      const result = await getter("shop/cart", true);
      if (result.ok && result.data) {
        setCartProducts({
          load: false,
          data: result.data,
          error: false,
        });
      }
    };
    if (accessToken) {
      getFavoriteProducts();
      getCartProducts();
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        lang,
        setLang,
        industriesData,
        setIndustriesData,
        accessToken,
        setAccessToken,
        favoriteProducts,
        setFavoriteProducts,
        cartProducts,
        setCartProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
