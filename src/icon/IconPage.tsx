import * as React from 'react';
import {Link} from 'react-router';

import WeatherIcon from './WeatherIcon';
import {FreeGeoIpResponse, OpenWeatherAppResponse} from './models';

interface IconState {
  time: number;
  icon: string;
  location: string;
  temp: string;
  weatherCode: string;
}

class IconPage extends React.Component<IconState, any> {
  constructor(props?: any, context?: IconState) {
      super(props, context);

      this.state = {
        time: 1,
        icon: '',
        location: '',
        temp: '',
        weatherCode: ''
      };
  }
  public componentDidMount() {
    this.fetchIP();
  }

  public render() {
    return (
      <div className='Icon' data-hour={this.state.time}>
        <div className='Sky'></div>
        <WeatherIcon src={this.state.icon} weatherCode={this.state.weatherCode} timeOfDay={this.state.time}/>
        <div className='Information'>
          <div className='Location'>{this.state.location}</div>
          <div className='Temperature'>{this.state.temp} &deg; F</div>  
        </div>
      </div>
    );
  }

  private fetchWeatherData(city) {
    const baseUrl = `http://api.openweathermap.org`;
    const path = `/data/2.5/weather`;
    const appId = `1fbaf6e0d29ea877ae5852504eef4e82`;
    const query = `units=imperial&appid=${appId}`;
    fetch(`${baseUrl}${path}?q=${city}&${query}`)
        .then((response) => this.checkStatus(response))
        .then((response) => this.parseJSON(response))
        .then((data: OpenWeatherAppResponse) => {
          const date = new Date();
          const time = date.getHours();
          this.setState({time,
                          temp: Math.round(data.main.temp),
                          location: city,
                          weatherCode: data.weather[0].id
        });
      })
      .catch((error) => {
          console.log(error);
      });
  }

  private fetchIP() {
    fetch('//freegeoip.net/json/')
        .then((response) => this.checkStatus(response))
        .then((response) => this.parseJSON(response))
        .then((data: FreeGeoIpResponse) => {
          let city = data.city;
          this.fetchWeatherData(city);
      }).catch((error) => {
        console.log(error);
        alert('sorry - unable to fetch IP');
      });
  }

   private checkStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      let error = new Error(response.statusText);
      throw error;
    }
  }

  private parseJSON(response: Response): any {
    return response.json();
  }
}

export default IconPage;
