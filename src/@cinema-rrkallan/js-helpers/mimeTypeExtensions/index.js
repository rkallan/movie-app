import { validations } from "../validations";

const mimeTypeExtension = [
    {
        mimeType: "audio/aac",
        extension: ".aac",
    },
    {
        mimeType: "video/x-msvideo",
        extension: ".avi",
    },
    {
        mimeType: "application/octet-stream",
        extension: ".bin",
    },
    {
        mimeType: "image/bmp",
        extension: ".bmp",
    },
    {
        mimeType: "application/x-bzip",
        extension: ".bz",
    },
    {
        mimeType: "application/x-bzip2",
        extension: ".bz2",
    },
    {
        mimeType: "text/css",
        extension: ".css",
    },
    {
        mimeType: "text/csv",
        extension: ".csv",
    },
    {
        mimeType: "application/msword",
        extension: ".doc",
    },
    {
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        extension: ".docx",
    },
    {
        mimeType: "application/vnd.ms-fontobject",
        extension: ".eot",
    },
    {
        mimeType: "application/gzip",
        extension: ".gz",
    },
    {
        mimeType: "image/gif",
        extension: ".gif",
    },
    {
        mimeType: "text/html",
        extension: ".html",
    },
    {
        mimeType: "image/vnd.microsoft.icon",
        extension: ".ico",
    },
    {
        mimeType: "text/calendar",
        extension: ".ics",
    },
    {
        mimeType: "application/java-archive",
        extension: ".jar",
    },
    {
        mimeType: "image/jpeg",
        extension: ".jpg",
    },
    {
        mimeType: "text/javascript",
        extension: ".js",
    },
    {
        mimeType: "application/json",
        extension: ".json",
    },
    {
        mimeType: "application/ld+json",
        extension: ".jsonld",
    },
    {
        mimeType: "audio/midi",
        extension: ".mid",
    },
    {
        mimeType: "audio/x-midi",
        extension: ".mid",
    },
    {
        mimeType: "audio/mpeg",
        extension: ".mp3",
    },
    {
        mimeType: "video/mp4",
        extension: ".mp4",
    },
    {
        mimeType: "video/mpeg",
        extension: ".mpeg",
    },
    {
        mimeType: "application/vnd.apple.installer+xml",
        extension: ".mpkg",
    },
    {
        mimeType: "application/vnd.oasis.opendocument.presentation",
        extension: ".odp",
    },
    {
        mimeType: "application/vnd.oasis.opendocument.spreadsheet",
        extension: ".ods",
    },
    {
        mimeType: "application/vnd.oasis.opendocument.text",
        extension: ".odt",
    },
    {
        mimeType: "audio/ogg",
        extension: ".oga",
    },
    {
        mimeType: "video/ogg",
        extension: ".ogv",
    },
    {
        mimeType: "application/ogg",
        extension: ".ogx",
    },
    {
        mimeType: "audio/opus",
        extension: ".opus",
    },
    {
        mimeType: "font/otf",
        extension: ".otf",
    },
    {
        mimeType: "image/png",
        extension: ".png",
    },
    {
        mimeType: "application/pdf",
        extension: ".pdf",
    },
    {
        mimeType: "application/x-httpd-php",
        extension: ".php",
    },
    {
        mimeType: "application/vnd.ms-powerpoint",
        extension: ".ppt",
    },
    {
        mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        extension: ".pptx",
    },
    {
        mimeType: "application/vnd.rar",
        extension: ".rar",
    },
    {
        mimeType: "application/rtf",
        extension: ".rtf",
    },
    {
        mimeType: "application/x-sh",
        extension: ".sh",
    },
    {
        mimeType: "image/svg+xml",
        extension: ".svg",
    },
    {
        mimeType: "application/x-tar",
        extension: ".tar",
    },
    {
        mimeType: "image/tiff",
        extension: ".tiff",
    },
    {
        mimeType: "video/mp2t",
        extension: ".ts",
    },
    {
        mimeType: "font/ttf",
        extension: ".ttf",
    },
    {
        mimeType: "text/plain",
        extension: ".txt",
    },
    {
        mimeType: "audio/wav",
        extension: ".wav",
    },
    {
        mimeType: "audio/webm",
        extension: ".weba",
    },
    {
        mimeType: "video/webm",
        extension: ".webm",
    },
    {
        mimeType: "image/webp",
        extension: ".webp",
    },
    {
        mimeType: "font/woff",
        extension: ".woff",
    },
    {
        mimeType: "font/woff2",
        extension: ".woff2",
    },
    {
        mimeType: "application/xhtml+xml",
        extension: ".xhtml",
    },
    {
        mimeType: "application/vnd.ms-excel",
        extension: ".xls",
    },
    {
        mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        extension: ".xlsx",
    },
    {
        mimeType: "application/xml",
        extension: ".xml",
    },
    {
        mimeType: "text/xml",
        extension: ".xml",
    },
    {
        mimeType: "application/vnd.mozilla.xul+xml",
        extension: ".xul",
    },
    {
        mimeType: "application/zip",
        extension: ".zip",
    },
    {
        mimeType: "video/3gpp",
        extension: ".3gp",
    },
    {
        mimeType: "audio/3gpp",
        extension: ".3gp",
    },
    {
        mimeType: "video/3gpp2",
        extension: ".3g2",
    },
    {
        mimeType: "audio/3gpp2",
        extension: ".3g2",
    },
    {
        mimeType: "application/x-7z-compressed",
        extension: ".7z",
    },
];

const getExtensionForMimeType = (mimeType) => {
    if (validations.isEmpty(mimeType)) return undefined;

    const { extension } = mimeTypeExtension.find((item) => item.mimeType === mimeType.toLowerCase()) || {};

    return extension;
};

const getMimeTypeForExtension = (fileExtension) => {
    if (validations.isEmpty(fileExtension)) return undefined;

    const extension = fileExtension.startsWith(".") ? fileExtension : `.${fileExtension}`;
    const { mimeType } = mimeTypeExtension.find((item) => item.extension === extension) || {};

    return mimeType;
};

export { mimeTypeExtension, getExtensionForMimeType, getMimeTypeForExtension };
