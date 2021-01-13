import { excelDownload } from "@/utils/index.js";
export {
  example
} from "./requests/index";

export function exportTableApi(url) {
  let downloadUrl = "";
  if (process.env.NODE_ENV === "development") {
    downloadUrl = "/api" + url;
  } else {
    downloadUrl = url;
  }
  excelDownload(downloadUrl);
}
