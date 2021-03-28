import { YMaps, Map, Placemark } from "react-yandex-maps";
import React from 'react';
import {StoresNames} from "../services/common/constDictionary";
import { inject, observer } from 'mobx-react';

const mapData = {
  center: [55.751574, 37.573856],
  zoom: 5,
};


class Maps extends React.Component{
  constructor(props) {
    super(props);
    this.store = this.props[StoresNames.RecommendationStore];
  }
  render(){
    return(
      <YMaps>
        <Map style={{height:"100%"}} defaultState={mapData}>
          {this.store.list.map(tour => <Placemark geometry={[tour.lat, tour.long]} />)}
        </Map>
      </YMaps>
    )
  }
}


export default inject(StoresNames.RecommendationStore)(Maps);