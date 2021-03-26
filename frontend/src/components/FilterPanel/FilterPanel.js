import React from 'react';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';

class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props[StoresNames.RecommendationStore];
    this.state = {
      current: null,
    };
  }

  render() {
    return (
      <div className="col-md-3">
        <h2 className="grid-title">
          <i className="fa fa-filter" />
          {' '}
          Filters
        </h2>
        <hr />
        {/* BEGIN FILTER BY CATEGORY */}
        <div className="sticky">
          <h4>By category:</h4>
          <div className="checkbox">
            <label>
              <input type="checkbox" className="icheck" />
              {' '}
              Application
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" className="icheck" />
              {' '}
              Design
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" className="icheck" />
              {' '}
              Desktop
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" className="icheck" />
              {' '}
              Management
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" className="icheck" />
              {' '}
              Mobile
            </label>
          </div>
          {/* END FILTER BY CATEGORY */}
          <div className="padding" />
          {/* BEGIN FILTER BY DATE */}
          <h4>By date:</h4>
          From
          <div className="input-group date form_date" data-date="2014-06-14T05:25:07Z" data-date-format="dd-mm-yyyy" data-link-field="dtp_input1">
            <input type="text" className="form-control" />
            <span className="input-group-addon bg-blue"><i className="fa fa-th" /></span>
          </div>
          <input type="hidden" id="dtp_input1" defaultValue />
          To
          <div className="input-group date form_date" data-date="2014-06-14T05:25:07Z" data-date-format="dd-mm-yyyy" data-link-field="dtp_input2">
            <input type="text" className="form-control" />
            <span className="input-group-addon bg-blue"><i className="fa fa-th" /></span>
          </div>
          <input type="hidden" id="dtp_input2" defaultValue />
          {/* END FILTER BY DATE */}
          <div className="padding" />
          {/* BEGIN FILTER BY PRICE */}
          <h4>By price:</h4>
          Between
          {' '}
          <div id="price1">$300</div>
          {' '}
          to
          {' '}
          <div id="price2">$800</div>
          <div className="slider-primary">
            <div className="slider slider-horizontal" style={{ width: 152 }}>
              <div className="slider-track">
                <div className="slider-selection" style={{ left: '30%', width: '50%' }} />
                <div className="slider-handle round" style={{ left: '30%' }} />
                <div className="slider-handle round" style={{ left: '80%' }} />
              </div>
              <div className="tooltip top hide" style={{ top: '-30px', left: '50.1px' }}>
                <div className="tooltip-arrow" />
                <div className="tooltip-inner">300 : 800</div>
              </div>
              <input type="text" className="slider" defaultValue data-slider-min={0} data-slider-max={1000} data-slider-step={1} data-slider-value="[300,800]" data-slider-tooltip="hide" />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default inject(StoresNames.RecommendationStore)(observer(FilterPanel));
