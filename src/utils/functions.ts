import { FetchBody, FetchPostReturnType, FetchReturnType } from "@/types";
import en from "../../public/locales/en.json";
import ru from "../../public/locales/ru.json";
import uz from "../../public/locales/uz.json";
import Cookies from "js-cookie";

export const translate = (
  keyName: string,
  lang: string,
  ...otherKeys: string[]
) => {
  try {
    const translations: any = {
      en,
      ru,
      uz,
    };
    const translationKeys = keyName.split(".");

    let translation = translations[lang];
    for (let i = 0; i < translationKeys.length; i++) {
      translation = translation[translationKeys[i]];
    }
    if (typeof translation === "string" && otherKeys.length > 0) {
      translation = translation.replace(/\$(\d+)/g, (match, p1) => {
        const index = parseInt(p1) - 1;
        if (index >= 0 && index < otherKeys.length) {
          return otherKeys[index];
        }
        return match;
      });
    }

    return translation || keyName;
  } catch {
    return keyName;
  }
};

interface DecodedToken {
  email: string;
}

export function decodeJWT(token: string): DecodedToken | null {
  try {
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      throw new Error(
        "Invalid JWT format. Expected three parts separated by dots."
      );
    }

    const payload = tokenParts[1];
    const decodedPayload = JSON.parse(atob(payload));
    // Agar JSON.parse muvaffaqiyatli bo'lisha, ma'lumotlarni o'zgaruvchiga olib qaytaramiz.
    return decodedPayload;
  } catch (error) {
    // JSON.parseda xatolik bo'lsa, null qaytarib, muvaffaqiyatsizlikni ko'rsatamiz.
    return null;
  }
}

export const sumFormatter = (num: number): string => {
  try {
    const formattedSum = num.toLocaleString("uz-UZ", {
      style: "currency",
      currency: "UZS",
    });

    return formattedSum;
  } catch {
    return "0";
  }
};
export function dateFormatter(date: string) {
  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");
  const hours = String(originalDate.getHours()).padStart(2, "0");
  const minutes = String(originalDate.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
export const getter = async (url: string, withAccess?: boolean) => {
  try {
    const result: FetchReturnType = { ok: false, data: null, msg: "" };
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (withAccess) {
      headers["Authorization"] = `Bearer ${Cookies.get("access_token")}`;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`,
      {
        method: "GET",
        headers,
      }
    );
    if (response.status === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      if (window) {
        window.location.pathname = "/login";
      }
      return result;
    }
    if (response.status === 200) {
      const data = await response.json();
      if (data) {
        result.ok = true;
        result.data = data;
        result.msg = "ok";
        return result;
      }
      return result;
    }
    return result;
  } catch (error) {
    const result: FetchReturnType = {
      ok: false,
      data: null,
      msg: String(error),
    };
    return result;
  }
};

export const poster = async (
  url: string,
  body: FetchBody,
  withAccess?: boolean,
  withRefresh?: boolean
) => {
  try {
    const result: FetchPostReturnType = { ok: false, data: null, msg: "error" };
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (withAccess) {
      headers["Authorization"] = `Bearer ${Cookies.get("access_token")}`;
    }

    if (withRefresh) {
      headers["Authorization"] = `Bearer ${Cookies.get("refresh_token")}`;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );
    if (response.status === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      if (window) {
        window.location.pathname = "/login";
      }
      return result;
    }

    if (response.status === 201 || response.status === 200) {
      const data = await response.json();

      if (data) {
        result.ok = true;
        result.data = data;
        result.msg = "ok";
        return result;
      }
      result.msg = String(data);
      return result;
    } else {
      const data = await response?.json().catch((e) => e);

      result.msg = data ? JSON.stringify(data) : "error";
      return result;
    }
  } catch (error) {
    const result: FetchPostReturnType = {
      ok: false,
      data: null,
      msg: String(error),
    };
    return result;
  }
};

export const putter = async (
  url: string,
  body: FetchBody,
  withAccess?: boolean
) => {
  try {
    const result: any = { ok: false, data: null, msg: "error" };
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (withAccess) {
      headers["Authorization"] = `Bearer ${Cookies.get("access_token")}`;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      }
    );
    if (response.status === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      if (window) {
        window.location.pathname = "/login";
      }
      return result;
    }

    if (response.status === 201 || response.status === 200) {
      const data = await response?.json().catch((e) => e);
      if (data) {
        result.ok = true;
        result.data = data;
        result.msg = "updated";
        return result;
      }
      result.msg = String(data);
      return result;
    } else {
      const data = await response?.json().catch((e) => e);
      result.msg = data ? JSON.stringify(data) : "error";
      return result;
    }
  } catch (error) {
    const result = {
      ok: false,
      data: null,
      msg: String(error),
    };
    return result;
  }
};

export const deleter = async (url: string, withAccess?: boolean) => {
  try {
    const result: any = { ok: false, data: null, msg: "error" };
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (withAccess) {
      headers["Authorization"] = `Bearer ${Cookies.get("access_token")}`;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`,
      {
        method: "DELETE",
        headers,
      }
    );
    if (response.status === 401) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      if (window) {
        window.location.pathname = "/login";
      }
      return result;
    }

    if (response.status === 204) {
      result.ok = true;
      result.data = {};
      result.msg = "ok";
      return result;
    } else {
      return result;
    }
  } catch (error) {
    const result = {
      ok: false,
      data: null,
      msg: String(error),
    };
    return result;
  }
};
