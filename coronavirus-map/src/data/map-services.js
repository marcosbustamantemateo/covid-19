export const mapServices = [
  {
    name: 'OpenStreetMap',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }
];

class _mapServices {

  static fetchCountries = () => {
      return fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => { return data; })
        .catch(error => { return error; });
  }
}

export default _mapServices;

