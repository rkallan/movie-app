import getType from "../../getType";
import { validations } from "../../validations";

const getBodyRequest = ({ body, contentType, method }) => {
    if (!["post", "put"].includes(method.toLowerCase()) || validations.isEmpty(body)) return undefined;

    const bodyType = getType(body);

    if (validations.isEmpty(contentType) && ["object", "array", "number"].includes(bodyType)) return JSON.stringify(body);

    if (contentType === "application/json" && bodyType !== "string") return JSON.stringify(body);

    if (contentType === "application/x-www-form-urlencoded" && bodyType === "object") return new URLSearchParams(body);

    if (contentType === "multipart/form-data" && bodyType === "object") {
        const formData = new FormData();

        Object.keys(body).forEach((key) => {
            formData.append(key, body[key]);
        });

        return formData;
    }

    return body;
};

export default getBodyRequest;
