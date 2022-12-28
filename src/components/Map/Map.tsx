/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';

import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { transform } from 'ol/proj';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style.js';

interface OpenMapProps {
  lat: number;
  lon: number;
  coords: [number, number][][];
}

const OpenMap = ({ lat, lon, coords }: OpenMapProps) => {
  const center = transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
  const mapRef = useRef(null);

  const iconFeature = new Feature({
    geometry: new Point(transform([lon, lat], 'EPSG:4326', 'EPSG:3857')),
  });

  const iconStyle = new Style({
    image: new Icon({
      anchorOrigin: 'bottom-left',
      offsetOrigin: 'bottom-left',
      anchor: [24, 0],
      anchorXUnits: 'pixels',
      anchorYUnits: 'pixels',
      src: 'https://onblcbnmhbprhpgkhtep.supabase.co/storage/v1/object/public/images/dsd-map-location-icon.png?t=2022-12-24T17%3A30%3A22.186Z',
    }),
  });
  iconFeature.setStyle(iconStyle);

  const iconSource = new VectorSource({
    features: [iconFeature],
  });

  const iconLayer = new VectorLayer({
    source: iconSource,
  });
  const geoJSONObject = {
    type: 'FeatureCollection',
    features: [],
  };
  const layers = [new TileLayer({ source: new OSM() })];

  useEffect(() => {
    coords.map((c) => {
      geoJSONObject.features.push({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: c,
        },
      });
    });

    console.log('coords:', coords);

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geoJSONObject),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    if (coords.length !== 0) {
      layers.push(vectorLayer);
    } else {
      layers.push(iconLayer);
    }
    const map = new Map({
      layers: layers,
      view: new View({
        center: center,
        zoom: 15,
      }),
      target: mapRef.current,
      controls: [],
    });
    return () => map.setTarget(undefined);
  }, [lon, lat, coords]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default OpenMap;
