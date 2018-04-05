import CD from "cropduster";
import jQuery from "jquery";
import StudioApp, { DataSource } from "studio-app";
import skycons from 'skycons';

const Skycons = skycons(window);

class MyWeather extends StudioApp {
  constructor() {
    super();

    this.lat = this.param("lat", { required: true });
    this.lon = this.param("lon", { required: true });
    this.city = this.param("city", { required: true });

    this.skycons = new Skycons({color: this.fields.iconColor});
  }

  render() {
    // Rendering code goes here

    this.fetchWeather().then((weather) => {
      const { currently } = weather;
      console.log(currently);
      this.setWeatherIcon(currently.icon);
      this.replaceTokens(this.tags, {
        city: this.city,
        temperature: currently.temperature
      });
      this.autoresizeTags();
      this.waitForImageAssets();
      window.APP_SUCCESSFULLY_RENDERED = true;
    });
  }

  fetchWeather() {
    const dsAttrs = this.fields.forecastApi;
    const apiKey = this.fields.apiKey;

    const { lat, lon } = this;

    if(!dsAttrs) {
      this.error('data source not selected');
    }

    const ds = new DataSource(dsAttrs);

    return ds.getRawData({ apiKey, lat, lon })
      .then(({data}) => {
        return JSON.parse(data);
      });
  }

  setWeatherIcon(name) {
    const weatherIcons = this.allTags.filter(t => t.toolName === 'weatherIcon');

    weatherIcons.forEach(t => {
      const canvas = document.createElement('canvas');
      canvas.width = t.width;
      canvas.height = t.height;
      this.skycons.add(canvas, name);
      t.element.appendChild(canvas);
    });
  }
}

export default MyWeather;
