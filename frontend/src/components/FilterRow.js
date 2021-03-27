import React from 'react';
import SortIcon from '@material-ui/icons/Sort';

export default class FilterRow  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            filterNames:[
                {
                    haveOrderBy: false,
                    name: "по популярности"
                },
                {
                    haveOrderBy: false,
                    active: false,
                    name: "по рейтингу"
                },
                {
                    haveOrderBy: false,
                    active: false,
                    name: "по отзывам"
                },
                {
                    haveOrderBy: false,
                    active: false,
                    name: "по размеру скидки"
                },
                {
                    haveOrderBy: false,
                    active: false,
                    name: "по новизне"
                }]
        }
    }
    
    handleClick(){
    
    }
    
    render() {
        return(
            <div className="_3_l6GZZNkG"><span className="n-filter-sorter__label">Сортировать:</span>
                {this.state.filterNames.map((el, index) => {
                    return(
                        <button className="filters" data-autotest-id="dpop" data-tid="826e0c9f">{el.name}
                        </button>
                    )
                })}
            </div>
        )
    }

}