import React from 'react';
import SortIcon from '@material-ui/icons/Sort';
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {StoresNames} from "../services/common/constDictionary";

class FilterRow  extends React.Component{
    constructor(props) {
        super(props);
        this.store = this.props[StoresNames.FilterStore];
    }
    
    handleClick(index){
        const filterNames = this.store.filterNames;
        const prop = filterNames[index];
        if(!prop.active){
            filterNames.forEach(el => el.active = false);
            prop.active = true;
            filterNames[index] = prop;
        } else {
            if (prop.ascending){
                prop.ascending = (prop.ascending === "top")? "bottom": "top"
            }
            filterNames[index] = prop;
        }
        this.store.setFilterNames(filterNames);
    }
    
    render() {
        return(
            <div className="_3_l6GZZNkG"><span className="n-filter-sorter__label">Сортировать:</span>
                {this.store.filterNames.map((el, index) => {
                    return(
                      <>
                          <button className={`filters mr-2 ${el.active && "activeFilters"}`} data-autotest-id="dpop" onClick={() => {this.handleClick(index)}} data-tid="826e0c9f">{el.name}</button>
                          {el.active && el.ascending === "top" && <SortIcon fontSize={"small"}/>}
                          {el.active && el.ascending === "bottom" && <SortIcon fontSize={"small"} style={{transform: "scale(1, -1)"}}/>}
                      </>
                    )
                })}
            </div>
        )
    }
}

export default inject(StoresNames.FilterStore)((observer(FilterRow)))