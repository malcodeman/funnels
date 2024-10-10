import { FunnelData } from "@/types";
import { saveAs } from "file-saver";

export function exportAsJson(funnel: FunnelData) {
  const blob = new Blob([JSON.stringify(funnel)], {
    type: "application/json",
  });

  saveAs(blob, `${funnel.name}.json`);
}

export function file2Text(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
}
