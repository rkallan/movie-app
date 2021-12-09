import { getExtensionForMimeType } from "../mimeTypeExtensions";
import { validations } from "../validations";
import getType from "../getType";

const downloadBlob = ({ blobObject, filename, customExtenstion }) => {
    if (getType(blobObject) !== "blob") return undefined;

    const url = URL.createObjectURL(blobObject);
    const currentDate = new Date().toISOString().split("T")[0];
    const mimeType = blobObject.type || undefined;
    const name = validations.isEmpty(filename) ? `download-${currentDate}` : filename;
    const fileExtension = validations.isEmpty(customExtenstion) ? getExtensionForMimeType(mimeType) : customExtenstion;
    const extension = fileExtension.startsWith(".") ? fileExtension : `.${fileExtension}`;
    const fileNameWithExtennsion = `${name}${extension}`;

    const linkElement = document.createElement("a");
    linkElement.style = { display: "none", visibility: "hidden", width: 0, height: 0, opacity: 0 };
    linkElement.setAttribute("href", url);
    linkElement.setAttribute("download", fileNameWithExtennsion);

    linkElement.dispatchEvent(new MouseEvent("click"));

    return true;
};

const downloadXbrlFile = ({ content, filename }) => {
    if (validations.isEmpty(content)) return undefined;

    const currentDate = new Date().toISOString().split("T")[0];
    const name = validations.isEmpty(filename) ? `download-xbrl-${currentDate}` : filename;

    const linkElement = document.createElement("a");
    linkElement.style = { display: "none", visibility: "hidden", width: 0, height: 0, opacity: 0 };
    linkElement.setAttribute("href", `data:application/xml;charset=utf-8,${encodeURIComponent(content)}`);
    linkElement.setAttribute("download", `${name}.xbrl`);

    linkElement.dispatchEvent(new MouseEvent("click"));

    return true;
};

export { downloadBlob, downloadXbrlFile };
