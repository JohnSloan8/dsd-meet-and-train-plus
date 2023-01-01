/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { Icon, Stroke, Style } from 'ol/style.js';

import { ActivityModel } from '@/models';

interface OpenMapProps {
  lat: number;
  lon: number;
  activities: ActivityModel[];
  selectedAthlete: string | undefined;
}

const OpenMap = ({ lat, lon, activities, selectedAthlete }: OpenMapProps) => {
  const center = transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
  const mapRef = useRef(null);
  const mapRefTrans = useRef(null);

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

  interface geoJSONObjectModel {
    type: string;
    features: FeatureModel[];
  }

  interface FeatureModel {
    type: string;
    properties: any;
    geometry: GeometryModel;
  }

  interface GeometryModel {
    type: string;
    coordinates: [number, number][];
  }

  // const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  // const generateHex = () => {
  //   let hex = '#';

  //   for (let i = 0; i < 6; i++) {
  //     const index = Math.floor(Math.random() * hexValues.length);
  //     hex += hexValues[index];
  //   }
  //   return hex;
  // };

  // const tileLayer = [new TileLayer({ source: new OSM() })];
  const tileLayer = new TileLayer({ source: new OSM() });
  const transparentTileLayers: any[] = [tileLayer];
  tileLayer.setOpacity(1);

  // const backgroundTileLayer = new TileLayer({ source: new OSM() });

  useEffect(() => {
    if (activities.length !== 0) {
      activities.map((a) => {
        const geoJSONObject: geoJSONObjectModel = {
          type: 'FeatureCollection',
          features: [],
        };
        geoJSONObject.features.push({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: a.coords,
          },
        });

        // console.log('coords:', coords);

        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(geoJSONObject),
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: new Style({
            stroke: new Stroke({
              color:
                a.user_id === selectedAthlete ? 'rgba(13, 71, 161, 1)' : 'rgba(13, 71, 161, 0.25)',
              width: 2,
            }),
          }),
        });
        transparentTileLayers.push(vectorLayer);
      });
    } else {
      transparentTileLayers.push(iconLayer);
    }
    if (mapRefTrans.current !== null) {
      const transMap = new Map({
        layers: transparentTileLayers,
        view: new View({
          center: center,
          zoom: 14,
        }),
        target: mapRefTrans.current,
        controls: [],
      });
      return () => transMap.setTarget(undefined);
    }
  }, [selectedAthlete, activities]);

  // useEffect(() => {
  //   if (mapRef.current !== null) {
  //     const Map = new Map({
  //       layers: backgroundTileLayer,
  //       view: new View({
  //         center: center,
  //         zoom: 15,
  //       }),
  //       target: mapRef.current,
  //       controls: [],
  //     });
  //     return () => Map.setTarget(undefined);
  //   }
  // }, [activities]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div ref={mapRefTrans} style={{ width: '100%', height: '100%' }}></div>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default OpenMap;
