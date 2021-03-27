import React from 'react';
import './HomePage.scss';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';
import FilterPanel from '@/components/FilterPanel';
import TourCard from "../../components/TourCard";
import FilterRow from "../../components/FilterRow";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props[StoresNames.RecommendationStore];
    this.state = {
      current: null,
    };
  }

  componentDidMount() {
    this.props.services.requestService.getTourList();
  }

  render() {
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
                      {this.store.list.map(el => {
                        return(
                            <TourCard/>
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

export default inject("services", StoresNames.RecommendationStore)(observer(HomePage));
