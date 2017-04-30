
export interface FreeGeoIpResponse
{
    ip: string;
    country_code: string;
    country_name: string;
    region_code: string;
    region_name: string;
    city: string;
    zip_code: string;
    time_zone: string;
    latitude: number;
    longitude: number;
    metro_code: string;
}

export interface OpenWeatherAppResponse {
    coord:
        {
            lon: number,
            lat: number
        },
    weather: OpenWeatherItems[],
    base: string,
    main:
        {
            temp: number,
            pressure: number,
            humidity: number,
            temp_min: number,
            temp_max: number,
        },
    visibility: number,
    wind:{
        speed: number,
        deg: number,
    },
    clouds:
        {
            all: number,
        },
    dt:  number,
    sys:
    {
        type: number,
        id: number,
        message: number,
        country: string,
        sunrise: number,
        sunset: number,
    },
    id: number,
    name: string,
    cod: number
}

export interface OpenWeatherItems {
    id: number,
    main:string,
    description: string,
    icon: string
}