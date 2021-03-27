import React from 'react';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@/services/common/constDictionary';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {Card} from "react-bootstrap";

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
}

const styles = (theme) => ({
  formControl: {
  },
});


class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props[StoresNames.FilterStore];
    this.state = {
      current: null,
      openCountries: false,
    };
  }

  render() {
    const classes = this.props.classes;


    return (
      <div className="col-md-3">
        <h2 className="grid-title">
          <i className="fa fa-filter" />
          {' '}
          Filters
        </h2>
        <hr />
        {/* BEGIN FILTER BY CATEGORY */}
        <Card>
          <Card.Body className="filtersPanel">
            <h4>By category:</h4>
            <Autocomplete
              open={this.state.openCountries}
              onOpen={() => {
                this.props.services.requestService.getCountries().then(() => {
                  this.setState({openCountries: true})
                })
              }}
              onClose={() => {
                this.setState({openCountries: false})
              }}
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.value}
              options={this.store.countries}
              renderOption={(option) => (
                <React.Fragment>
                  <span>{option.code && countryToFlag(option.code)}</span>
                  {option.value}
                </React.Fragment>
              )}
              onChange={(el, value) => {
                console.log(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  key="Asynchronous"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            <DateRangePicker
                startDate={this.state.startDate || null} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate || null} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput || null} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />
          </Card.Body>
        </Card>
      </div>

    );
  }
}

export default inject("services", StoresNames.FilterStore)(withStyles(styles)((observer(FilterPanel))));
