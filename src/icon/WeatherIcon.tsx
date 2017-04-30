import * as React from 'react';

class WeatherIcon extends React.Component<any, any> {
  public render() {
    let timeOfDay =
      (this.props.timeOfDay > 7 && this.props.timeOfDay < 18)
      ? 'day' : 'night';
    let className = 'WeatherIcon wi ';
    className += 'wi-owm-' + timeOfDay + '-' + this.props.weatherCode;
    return (<i className={className}></i>);
  }
}
export default WeatherIcon;
