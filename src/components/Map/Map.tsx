/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { transform } from 'ol/proj';
import { OSM, Vector as VectorSource } from 'ol/source';

import decode_polyline from '@/utils/polyline_decoder';

interface OpenMapProps {
  lat: number;
  lon: number;
  polylines: string[];
}

const OpenMap = ({ lat, lon, polylines }: OpenMapProps) => {
  const center = transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
  const mapRef = useRef(null);
  console.log('poylines:', polylines);
  const geoJSONObject = decode_polyline(
    'ysjdIfo_e@DuBPsABk@?UMa@Ki@GIKEQQcBURh@TjAj@fGHvAL`@Fp@DzCDjAHvF?pGCTA_ABQEpAAPCDAUFc@Ai@BOC|ACVDsBBGKlBAHFeBBQEfBEFEsA@YFE@DBx@Aj@ELGcABo@DGBJ?rACRAKBkADMIbBB{ABK@?@@EzACNEBCC?OFyDBQDI@D@|AE~BAHCBAI@oAAsBBWDGBF@`@CjCCf@EFByAAwBDSD|A?b@E\\IHE?Da@@PY|FEvABXR\\`@RJBHADOJsBHo@RaA~@uBRYHQZgAZwAvAoD|@oCFa@VwEFOPOj@]VSJQHWDe@GiAUgCIk@EOGGa@U{@_@S[Uo@KIu@l@OHi@N]Ee@U[Gq@[OCOBEDO`@MrAMnDCdBBrF?bGChCBpCElBCNGDDUBAJ@@B@GAIECCDCTEt@UnCIjAAn@BZNVh@d@RHBABIZuDTkAt@uBRc@|@_C^aAXaAx@aB\\iATqAL_DHo@n@q@h@_@Re@Bm@YcEIy@EOMK}@Oc@MOIKQQw@IOE@{@p@a@JSAc@IiBo@WDKLMhAS~I@lAH|CClG@jHEn@@HDBBMCY@QIaA@qACk@@iBEmC?`BFvC@lDB\\A??BCEAD@??AMHGJOdAUtDClA?JDHJ@BK?QIo@HmAJc@@_ALcA?kAB?ABGAI~AQjBGvAC|ADRTZNL\\RL@DCFYTeBBc@?a@CMKQ{@a@U_@C[PiB@uAWvDSpFBVFRj@f@VJL?FQXqC@k@GUMOw@]IEKSAe@NiB@}@EB?RBHGT]lEEjA?`ABPFH|@t@RFD?FWNuB?m@EMKKm@QMMKSAe@PeD?UCG@JEL@JA@IfCW~BE`C@FHLb@Xb@JJ?BCBO?i@XmB?UGMECk@KQKOQIYAi@JcBBeA@BAF@TGLGh@EzA]fF@JFNd@^f@VD?DE@IFgANmA@m@',
  );

  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(geoJSONObject),
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  useEffect(() => {
    const map = new Map({
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: center,
        zoom: 15,
      }),
      target: mapRef.current,
      controls: [],
    });
    return () => map.setTarget(undefined);
  }, [lat]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default OpenMap;
