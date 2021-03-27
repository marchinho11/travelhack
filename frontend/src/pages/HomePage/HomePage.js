import React from 'react';
import './HomePage.scss';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';
import FilterPanel from '@/components/FilterPanel';
import TourCard from "../../components/TourCard";
import FilterRow from "../../components/FilterRow";
import {toJS} from "mobx";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.recomendationStore = this.props[StoresNames.RecommendationStore];
    this.filterStore = this.props[StoresNames.FilterStore];
  }
  
  componentDidMount() {
    this.props.services.requestService.getTourList();
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
      <div className="container">
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
                  <div className="col-md-9">
                    <div className="row filterRow">
                      {/* BEGIN ORDER RESULT */}
                      <FilterRow/>
                      {/* END ORDER RESULT */}
                      <div className="col-md-6 text-right">
                        <div className="btn-group">
                          <button type="button" className="btn btn-default active"><i className="fa fa-list" /></button>
                          <button type="button" className="btn btn-default"><i className="fa fa-th" /></button>
                        </div>
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
