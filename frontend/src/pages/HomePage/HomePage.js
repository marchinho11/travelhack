import React from 'react';
import './HomePage.scss';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import TourCard from "../../components/TourCard";

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
                      <div className="_3_l6GZZNkG"><span className="n-filter-sorter__label">Сортировать:</span>
                        <button className="filters" data-autotest-id="dpop" data-tid="826e0c9f">по популярности
                        </button>
                        <button className="filters" data-autotest-id="aprice"
                                data-tid="826e0c9f">по цене
                        </button>
                        <button className="filters" data-autotest-id="quality" data-tid="826e0c9f">по рейтингу
                        </button>
                        <button className="filters" data-autotest-id="opinions" data-tid="826e0c9f">по отзывам
                        </button>
                        <button className="filters" data-autotest-id="discount_p" data-tid="826e0c9f">по размеру
                          скидки
                        </button>
                        <button className="filters" data-autotest-id="ddate" data-tid="826e0c9f">по новизне
                        </button>
                      </div>
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
