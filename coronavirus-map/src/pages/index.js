import React from 'react';
import Helmet from 'react-helmet';
import L from 'leaflet';

import Layout from 'components/Layout';
import Map from 'components/Map';

import _mapServices from './../data/map-services';

const LOCATION = {
  lat: 40,
  lng: 4
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {

  async function mapEffect({ leafletElement: map } = {}) {

    if (!map) return;
    const data = await _mapServices.fetchCountries().then(data0 => data0);
    const hasData = Array.isArray(data) && data.length > 0;
    if (!hasData) return;

    const geoJson = {
      type: 'FeatureCollection',
      features: data.map((country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng, flag } = countryInfo;
        return {
          type: 'Feature',
          properties: {
            ...country,
            flag
          },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          }
        }
      })
    };

    let idArray = [];
    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;
        const { countryInfo } = properties;
        const { _id } = countryInfo;
        let updatedFormatted;
        let isClicked = false;
        idArray.push(_id);

        const {
          country,
          updated,
          cases,
          deaths,
          recovered,
          tests,
          flag
        } = properties

        let casesDots = `${cases}`, casesString = `${cases}`, deathsDots = `${deaths}`, recoveredDots = `${recovered}`, testsDots = `${tests}`;

        if (cases > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`
          casesDots = cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        }

        if (deaths > 1000) {
          deathsDots = deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        }

        if (recovered > 1000) {
          recoveredDots = recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        }

        if (tests > 1000) {
          testsDots = tests.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        }

        if (updated) {
          updatedFormatted = new Date(updated).toLocaleString();
        }

        const cardInformation = `
            <span id="${_id}" class="icon-marker-tooltip close">
              <img src="${flag}" alt="flag ${country}" style="width:100%;" /><h2>${country}</h2>
              <ul>
                <li><strong>Confirmed:</strong> <b style="color:orange;">${casesDots}</b></li>
                <li><strong>Deaths:</strong> <b style="color:red;">${deathsDots}</b></li>
                <li><strong>Recovered:</strong> <b style="color:lightgreen;">${recoveredDots}</b></li>
                <li><strong>Tests:</strong> <b style="color:lightblue;">${testsDots}</b></li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
        `;

        const html = `
            <span class="icon-marker" tabindex="1">
              ${ cardInformation}
              ${ casesString}
            </span>
          `;

        const marker = L.marker(latlng, {
          icon: L.divIcon({
            className: 'icon',
            html
          }),
          riseOnHover: true
        });
        marker.on({
          mouseover: function () {
            if (!isClicked) {
              document.getElementById(_id).className = "icon-marker-tooltip open";
            }
          },
          mouseout: function () {
            if (!isClicked) {
              document.getElementById(_id).className = "icon-marker-tooltip close";
            }
          },
          click: function () {
            idArray.forEach(item => {
              if (item === _id) {
                isClicked = true
                document.getElementById(_id).className = "icon-marker-tooltip open"
              } else {
                document.getElementById(item).className = "icon-marker-tooltip close"
              }
            });

          }
        });
        map.on({
          click: function () {
            isClicked = false
            document.getElementById(_id).className = "icon-marker-tooltip close";
          },
          popupclose: function () {
            isClicked = false
            document.getElementById(_id).className = "icon-marker-tooltip close";
          }
        });
        return marker;
      }
    });
    geoJsonLayers.setStyle({
      color: "#ff2d00",
      fillColor: "#010101",
      opacity: 1,
      weight: 100
    });
    geoJsonLayers.addTo(map);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet meta={[
        { name: 'description', content: 'Real time covid-19 reports per countries' },
        { name: 'keywords', content: 'coronavirus, covid, covid19, covid-19, reports, countries, cases, deaths' }
      ]}>
        <html lang="en" />
        <title>COVID-19 REPORTS WORLD MAP</title>
      </Helmet>
      <Map {...mapSettings} />
    </Layout>
  );
};

export default IndexPage;
