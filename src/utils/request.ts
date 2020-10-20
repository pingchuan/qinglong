import { message } from "antd";
message.config({ maxCount: 1 });

interface ExtendOptions extends RequestInit {
  Accept?: "json" | "form";
}

interface IndexType {
  (url: RequestInfo, options?: ExtendOptions): Promise<Record<string, unknown>>
}

enum ContentType {
  json = "application/json;charset=UTF-8",
  form = "application/x-www-form-urlencoded;charset=UTF-8",
}

const index: IndexType = async function index(url, extendOptions = {}) {
  const { Accept, ...otherExtendOptions } = extendOptions;
  const headers = {
    Accept: Accept === "form" ? ContentType.form : ContentType.json,
    method: otherExtendOptions.method || "GET",
    ...(extendOptions?.headers || {}),
  };
  const options = {
    headers,
    ...otherExtendOptions,
  };
  const response = await fetch(url, options);
  statusValidate(response);
  return response.json();
};

function statusValidate(response: Response) {
  const { status, statusText } = response;
  const statusString = String(status);
  if (statusString.startsWith("4") || statusString.startsWith("5")) {
    Promise.reject(statusText);
  }

}

export default index;