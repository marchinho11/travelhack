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
        <Map style={{height:"640px"}} defaultState={{zoom:5, center: this.store.list.length && [this.store.list[0].lat, this.store.list[0].long]}}>
          {this.store.list.map(tour => {
            return(
              <Placemark click={(e) => {
                console.log(e);}} geometry={[tour.lat, tour.long]} />
            )
          })}
        </Map>
      </YMaps>
    )
  }
}


export default inject(StoresNames.RecommendationStore)(Maps);