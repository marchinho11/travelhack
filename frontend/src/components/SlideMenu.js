import MenuItem from "@material-ui/core/MenuItem";
import {Autocomplete} from "@material-ui/lab";
import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle} from "@material-ui/icons";
import Drawer from "@material-ui/core/Drawer";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {StoresNames} from "../services/common/constDictionary";
import Emoji from 'a11y-react-emoji'

class SlideMenu  extends  React.Component{
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.store = this.props[StoresNames.FilterStore];
  }
  
  getDefaultState(){
    return {
      user_id: null,
      openUsers: null,
      gender: null,
      age: null,
    }
  }
  
  
  update(key, value){
    this.setState({[key]: value})
  }
  
  
  
  render() {
    const user = this.store.users.find(el => el.user_id === this.state.user_id) || this.state;
    
    
    return(
      <Drawer anchor={"right"} open={this.props.open} onClose={() => {
        this.store.setCurrentUser({...this.state});
        this.props.handleDrawerClick()
      }}>
        <div className={"MenuSliderList"}>
          <Autocomplete
            style={{width : "300px"}}
            open={this.state.openUsers}
            onOpen={() => {
              this.props.services.requestService.getUsers().then(() => {
                this.setState({openUsers: true})
              })
            }}
            
            onClose={() => {
              this.setState({openUsers: false})
              this.getDefaultState();
            }}
            value={this.store.users.find(el => el.user_id ===this.state.user_id) || null}
            getOptionSelected={(option, value) => option.user_id === value}
            getOptionLabel={(option) => String(option.user_id)}
            options={this.store.users}
            renderOption={(option) => (
              <React.Fragment>
                ID Пользователя: {option.user_id}
              </React.Fragment>
            )
            }

            onChange={(e, obj) => {this.update("user_id", obj?.user_id)}}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Выберите пользователя"}
                key="Asynchronous"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment:(
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <React.Fragment>
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          {user.gender &&
            <div className={"emojiLine d-flex flex-row align-items-center"} style={{alignItems: "flex-start"}}>
              <Emoji symbol={(user.gender === "женский")? "👸": "👲"}/>
              <h5 className={"font-weight-bold"}>{user.gender}</h5>
            </div>
          }
          {user.age && <h5 className={"font-weight-bold"}>Возраст: {user.age}</h5>}
        </div>
      </Drawer>
    )
  }
}

export default withRouter(inject('services', StoresNames.FilterStore)(observer(SlideMenu)));
