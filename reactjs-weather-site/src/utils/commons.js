import axios from "axios";

export async function openweathermapApi(path) {
  const resp = await (
    await axios.get(
      `https://api.openweathermap.org/${path}&appid=${process.env.REACT_APP_OMP}`
    )
  ).data;
  return resp;
}

export function temperatureChangeC(temperature) {
  return Math.round(temperature - 273.15);
}
export function getIconWeather(icon, size = "") {
  return `http://openweathermap.org/img/wn/${icon}${size}.png`;
}
export function getHour12(date, isMinutes = true) {
  const hour = new Date(date).getUTCHours();
  const minutes = new Date(date).getUTCMinutes();
  let text = "AM";
  if (hour > 12) {
    text = "PM";
  }

  if (isMinutes) {
    return `${hour % 12}:${minutes} ${text}`;
  } else {
    return `${hour % 12} ${text}`;
  }
}

export function getTimeZone(date, timezone) {
  const time = (date + timezone) * 1000;
  return getHour12(time);
}
