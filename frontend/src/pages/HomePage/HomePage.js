import React from 'react';
import './HomePage.scss';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';
import FilterPanel from '@/components/FilterPanel';
import TourCard from "../../components/TourCard";
import FilterRow from "../../components/FilterRow";
import {toJS} from "mobx";
import IconButton from "@material-ui/core/IconButton";
import RoomIcon from '@material-ui/icons/Room';
import ListIcon from '@material-ui/icons/List';
import Maps from "../../components/Maps";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.recomendationStore = this.props[StoresNames.RecommendationStore];
    this.filterStore = this.props[StoresNames.FilterStore];
    this.state = {
      showMap: false,
    }
  }
  

  
  getSortableList(list, criteria, key){
    if(criteria?.value === key){
      return list.sort((a,b) => {
        if(criteria.ascending === "top"){
          return (a[`${key}`] < b[`${key}`])? 1: -1
        } else if (criteria.ascending === "bottom"){
          return (a[`${key}`] > b[`${key}`])? 1: -1
        }
      })
    }
    return list;
  }
  
  render() {
    let list = toJS(this.recomendationStore.list);
    const filterNames = this.filterStore.filterNames;
    const criteria = filterNames.find(el => el.active);
    list = this.getSortableList(list, criteria, `${criteria?.value}`)
    
    return (
      <div className={"ml-4"}>
        <div className="row">
          {/* BEGIN SEARCH RESULT */}
          <div className="col-md-12">
            <div className="grid search">
              <div className="grid-body">
                <div className="row">
                  {/* BEGIN FILTERS */}
                  <FilterPanel />
                  {/* END FILTERS */}
                  {/* BEGIN RESULT */}
                  <div className="col-md-6 flex-row">
                    <div className="mt-4 mb-4 row filterRow d-flex justify-content-between">
                      <FilterRow/>
                      <div>
                        <IconButton onClick={() => {this.setState({showMap: true})}} className={"mr-2"}><RoomIcon/></IconButton>
                        <IconButton onClick={() => {this.setState({showMap: false})}}><ListIcon/></IconButton>
                      </div>
                    </div>
                    {/* BEGIN TABLE RESULT */}
                    <div className="table-responsive">
                      {list.map(el => {
                        return(
                            <TourCard {...el}/>
                        )
                      })}
                    </div>
                  </div>
                  <div className={"col-md-3 mt-5"}>
                    {this.state.showMap && <Maps/>}
                  </div>
                  {/* END RESULT */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default inject("services", StoresNames.RecommendationStore, StoresNames.FilterStore)(observer(HomePage))
