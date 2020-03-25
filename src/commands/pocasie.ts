import Command from '../command';
import fetch from 'node-fetch';
import { Weather } from '../types/pocasie';

const BRNO_ID = 3078610;
const API_URL = (city: number) =>
  `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=sk&id=${BRNO_ID}&appid=${process.env.WEATHER_KEY}`;

export default class Pocasie extends Command {
  async execute() {
    fetch(API_URL(BRNO_ID))
      .then<Weather>((response) => response.json())
      .then((data) => {
        if (!data.cod || data.cod !== 200) {
          console.info(data);
          this.message.reply('Daco sa posralo :(');
          return;
        }

        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);

        this.message.reply(
          `V brne je ${data.main.temp}°C (min ${data.main.temp_min}°C, max ${
            data.main.temp_max
          }°C ). Pocitovo je tak akurat ${data.main.feels_like}°C. ${
            data.weather.length
              ? ` Je zevraj ${data.weather
                  .map((weather) => weather.description)
                  .join(',')}.`
              : ''
          } Viditelnost ${data.visibility}. Vlhkost ${
            data.main.humidity
          }%. Tlak ${data.main.pressure}hPa. Trosku aj fuka ${
            data.wind.speed
          } meter/sec. Mraky su tak ze ${
            data.clouds.all
          }%. Vychod slnka bude alebo bol ${sunrise.getHours()}:${sunrise.getMinutes()}. Zapad slnka bude alebo bol ${sunset.getHours()}:${sunset.getMinutes()}`
        );
      })
      .catch(() => {
        this.message.reply('Daco sa posralo :(');
      });
  }
}
