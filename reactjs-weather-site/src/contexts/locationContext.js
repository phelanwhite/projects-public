import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const reducer = (state, action) => {
  switch (action.type) {
    case "addWeather":
      const newWeather = {
        id: uuidv4(),
        lat: action.payload.lat,
        lon: action.payload.lon,
      };
      return [...state, newWeather];
    case "removeWeather":
      return state?.filter((weather) => weather.id !== action.payload.id);
    default:
      return state;
  }
};
const initializer = JSON.parse(localStorage.getItem("weatherList")) || [];
const AppContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    lat: 12,
    lon: 45,
  });
  const [weatherList, setWeatherList] = useReducer(reducer, initializer);

  const handleChangeLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((success) => {
        setLocation({
          lat: success.coords.latitude,
          lon: success.coords.longitude,
        });
        toast.success("Changed location successfully");
      });
    }
  }, []);

  const addWeather = useCallback(
    (value) => {
      setWeatherList({ type: "addWeather", payload: location });
      toast.success("Added weather successfully");
    },
    [location]
  );
  const removeWeather = useCallback((id) => {
    setWeatherList({ type: "removeWeather", payload: { id } });
    toast.success("Removed weather successfully");
  }, []);
  useEffect(() => {
    localStorage.setItem("weatherList", JSON.stringify(weatherList));
  }, [weatherList]);
  return (
    <AppContext.Provider
      value={{
        weatherList,
        location,
        setLocation,
        handleChangeLocation,
        addWeather,
        removeWeather,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useLocationContext = () => useContext(AppContext);
