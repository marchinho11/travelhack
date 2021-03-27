import React from 'react';
import SortIcon from '@material-ui/icons/Sort';

export default class FilterRow  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            filterNames:[
                {
                    ascending: "top",
                    active: false,
                    name: "по цене"
                },
                {
                    active: false,
                    name: "по релевантности"
                },
                {
                    ascending: "top",
                    active: false,
                    name: "по времени"
                },
                ]
        }
    }
    
    handleClick(index){
        const filterNames = this.state.filterNames;
        const prop = filterNames[index];
        if(!prop.active){
            prop.active = true;
            filterNames[index] = prop;
        } else {
            if (prop.ascending){
                prop.ascending = (prop.ascending === "top")? "bottom": "top"
            }
            filterNames[index] = prop;
        }
        this.setState((state, props) => {
            return {filterNames};
        });
    }
    
    render() {
        return(
            <div className="_3_l6GZZNkG"><span className="n-filter-sorter__label">Сортировать:</span>
                {this.state.filterNames.map((el, index) => {
                    return(
                      <>
                          <button className="filters" data-autotest-id="dpop" onClick={() => {this.handleClick(index)}} data-tid="826e0c9f">{el.name}</button>
                          {el.active && el.ascending === "top" && <SortIcon/>}
                          {el.active && el.ascending === "bottom" && <SortIcon style={{transform: "scale(1, -1)"}}/>}
                      </>
                    )
                })}
            </div>
        )
    }
}