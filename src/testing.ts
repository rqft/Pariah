import { OpenMeteo } from "./lib";
(async () => {
    const instance = new OpenMeteo.API();
    const result = await instance.forecast({
        latitude: 51.5074,
        longitude: 0.1278,
    });
    console.log(result.payload);
})();
