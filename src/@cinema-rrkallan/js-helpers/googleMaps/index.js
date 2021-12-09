import { validations } from "../validations";
import getType from "../getType";
import { getStorageItem, setStorageItem } from "../webStorageData";
import { objectAsUrlParams } from "../urlParams";
import apiCall from "../apiCall";

const getLatLngCenterPoint = (geoPoints) => {
    if (validations.isEmpty(geoPoints)) return undefined;

    let latLngPoints = geoPoints;
    if (getType(geoPoints) === "string") latLngPoints = geoPoints.split(";");

    const totalPoints = latLngPoints.length;
    if (totalPoints < 2) return undefined;

    const points = latLngPoints.reduce(
        (dataResult, currentItem) => {
            const currentLatLngAsArray = currentItem.split(",");

            if (currentLatLngAsArray.length !== 2) return dataResult;

            const tempData = {
                lat: parseFloat(dataResult.lat) + parseFloat(currentLatLngAsArray[0]),
                lng: parseFloat(dataResult.lng) + parseFloat(currentLatLngAsArray[1]),
            };

            return tempData;
        },
        { lat: 0, lng: 0 }
    );

    const latLngMiddleAsArray = [points.lat / totalPoints, points.lng / totalPoints];

    if (latLngMiddleAsArray.includes(NaN)) return undefined;

    return latLngMiddleAsArray.join(",");
};

const getDistanceBetweenPoints = (geoPoints) => {
    if (validations.isEmpty(geoPoints)) return undefined;

    let latLngPoints = geoPoints;
    if (getType(geoPoints) === "string") latLngPoints = geoPoints.split(";");

    const totalPoints = latLngPoints.length;
    if (totalPoints !== 2) return undefined;

    const points = latLngPoints.reduce((dataResult, currentItem) => {
        const currentLatLngAsArray = currentItem.split(",");

        if (currentLatLngAsArray.length !== 2) return dataResult;

        const tempData = dataResult;
        tempData.push({
            lat: currentLatLngAsArray[0],
            lng: currentLatLngAsArray[1],
        });

        return tempData;
    }, []);

    const eartRadiusKm = 6371.071;
    const point1LatRadian = points[0].lat * (Math.PI / 180);
    const point2LatRadian = points[1].lat * (Math.PI / 180);
    const latRadian = Math.abs(point1LatRadian - point2LatRadian);
    const lngRadian = (points[0].lng - points[1].lng) * (Math.PI / 180);

    const distance =
        2 *
        eartRadiusKm *
        Math.asin(
            Math.sqrt(
                Math.sin(latRadian / 2) * Math.sin(latRadian / 2) +
                    Math.cos(point1LatRadian) * Math.cos(point2LatRadian) * Math.sin(lngRadian / 2) * Math.sin(lngRadian / 2)
            )
        );

    return distance;
};

const getLatLngFromGoogleAPI = async ({
    googleAPIKey = undefined,
    localStorageKey = "mapsCoordinates",
    storageType = "localStorage",
    addressKey,
    language = "en",
}) => {
    if (validations.isEmpty(addressKey) || validations.isEmpty(googleAPIKey)) return undefined;

    const addressAsString = addressKey.replaceAll("-", " ");
    const params = {
        address: addressAsString,
        key: googleAPIKey,
        language,
    };
    const urlParams = objectAsUrlParams(params);
    const url = `//maps.googleapis.com/maps/api/geocode/json${urlParams}`;

    const getResponse = await apiCall({
        url,
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        cache: "force-cache",
        mode: "cors",
        credentials: "omit",
    });

    const contentType = getResponse?.headers?.get("content-type")?.split(";")?.shift();
    const isJsonResponse = contentType === "application/json";

    if (getResponse.ok && isJsonResponse) {
        const response = await getResponse.json();
        const status = response.status.toLowerCase();

        if (status !== "ok") {
            if (status === "over_query_limit") {
                setTimeout(() => {
                    getLatLngFromGoogleAPI({ googleAPIKey, localStorageKey, storageType, addressKey, language });
                }, 250);
            }
            return undefined;
        }

        const result = await response.results[0];
        const latLng = result?.geometry?.location;

        if (getType(latLng) === "object" && validations.isNotEmpty(latLng?.lat, true) && validations.isNotEmpty(latLng?.lng, true)) {
            const mapsCoordinates = getStorageItem(localStorageKey, storageType) || {};
            mapsCoordinates[addressKey] = latLng;

            setStorageItem(localStorageKey, mapsCoordinates, storageType);
            return latLng;
        }
    }
    return undefined;
};

const getLatLngFromGeoService = async ({ address, localStorageKey = "mapsCoordinates", storageType = "localStorage", addressKey }) => {
    if (validations.isEmpty(address) || validations.isEmpty(addressKey)) return undefined;

    const urlParams = objectAsUrlParams(address);
    const url = `//api.wearekate.com/api/geocode${urlParams}`;

    const getResponse = await apiCall({
        url,
        method: "GET",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        cache: "force-cache",
        mode: "cors",
        credentials: "omit",
    });

    const contentType = getResponse?.headers?.get("content-type")?.split(";")?.shift();
    const isJsonResponse = ["application/json", "text/plain"].includes(contentType);

    if (getResponse.ok && isJsonResponse) {
        const response = await getResponse.json();

        if (getType(response) === "object" && response?.geometry) {
            const { location } = response.geometry || {};
            const latLng = {
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lng),
            };

            if (!Object.values(latLng).includes(NaN)) {
                const mapsCoordinates = getStorageItem(localStorageKey, storageType) || {};
                mapsCoordinates[addressKey] = latLng;

                setStorageItem(localStorageKey, mapsCoordinates, storageType);
                return latLng;
            }
        }
    }

    return undefined;
};

const getLatLngByAddress = async ({
    address,
    googleAPIKey = undefined,
    prefixStorageKey,
    storageType = "localStorage",
    language = "en",
}) => {
    if (validations.isEmpty(address)) return undefined;

    const localStorageKey = prefixStorageKey ? `${prefixStorageKey}MapsCoordinates` : "mapsCoordinates";
    const mapsCoordinatesFromStorage = getStorageItem(localStorageKey, storageType) || {};
    const addressKey = [address.street, address.street_number, address.postal_code, address.city]
        .join("-")
        .replace(/\s+/g, "-")
        .toLocaleLowerCase();

    if (validations.isNotEmpty(mapsCoordinatesFromStorage, true)) {
        const latLngFromStorage = mapsCoordinatesFromStorage[addressKey] || undefined;

        if (validations.isNotEmpty(latLngFromStorage, true)) return latLngFromStorage;
    }

    const latLngFromGeoService = await getLatLngFromGeoService({ address, localStorageKey, storageType, addressKey });
    if (getType(latLngFromGeoService) === "object") return latLngFromGeoService;

    if (validations.isEmpty(googleAPIKey)) return undefined;

    const latLngFromGoogleAPI = await getLatLngFromGoogleAPI({
        googleAPIKey,
        localStorageKey,
        storageType,
        addressKey,
        language,
    });
    return latLngFromGoogleAPI;
};

export { getLatLngCenterPoint, getDistanceBetweenPoints, getLatLngByAddress };
