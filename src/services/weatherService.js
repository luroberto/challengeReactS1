const URL_API = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const getCityWeather = async (city) => {
    const url = `${URL_API}?key=${API_KEY}&q=${city}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        return error
    }
}

export default getCityWeather;