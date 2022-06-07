import React from 'react';
import './App.css';


class StepsForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { 
      distance: 0,
      date: '',
      distTrav: [],
      list_pos_id: 0,
      icon: "clear"
     }

    this.distanceChange = this.distanceChange.bind(this)
    this.dateChange = this.dateChange.bind(this)    
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  distanceChange(event) {
    this.setState({ distance: event.target.value })
  }
  dateChange(event) {
    this.setState({ date: event.target.value })
  }
  
  getData(){
    let tmpStr = this.state.date.split(".");
    let dataStr ="20"+tmpStr[2]+'/'+tmpStr[1]+'/'+tmpStr[0];
    let data = new Date(dataStr);
    return data;
  }
  
  distTravSort(){
    this.state.distTrav.sort(function(a, b) {
      a = new Date(a.fullDate);
      b = new Date(b.fullDate);
      return a>b ? -1 : a<b ? 1 : 0;
    });
  }

  handleSubmit(event) {
    let result = this.state.distTrav.find(dst => dst.date === this.state.date);
    
    if (result !== undefined) {
      result.distance = (parseInt(result.distance,10) + parseInt(this.state.distance,10)).toString();
      this.forceUpdate();
    } else {
      this.setState({list_pos_id: this.state.list_pos_id + 1});
      this.state.distTrav.push({id: this.state.list_pos_id, distance: this.state.distance, date: this.state.date, fullDate: this.getData()});
      this.distTravSort();
    }
    
    console.log("Arr : ",this.state.distTrav);
    event.preventDefault();
  }

  delete(value) {
    let distTrav = this.state.distTrav.slice();  
    distTrav.splice(distTrav.indexOf(value), 1);
    this.setState({distTrav});  
  }

  outlist() {
    let arr = this.state.distTrav.map(el=>
      <tr key={el.id}>
        <td className="TD">{el.date}</td>      
        <td className="TD">{el.distance}</td>
        <td className="TD">
      <button onClick={this.delete.bind(this, el)}>
        <i className="material-icons">{this.state.icon}</i>
      </button></td></tr>
    );
    return arr; 
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="FormStyle">
          <div>
            <table>
              <tr>
                <th> <label>Дата (ДД.ММ.ГГ)</label></th>
                <th><label>Пройдено км</label></th>
                <th> </th>
              </tr>
              <tr>
                <td>
                  <input type="text" className="InputStyle" 
                  value={this.state.date} onChange={this.dateChange} />
                </td>
                <td>
                  <input type="text" className="InputStyle" value={this.state.distance}
                  onChange={this.distanceChange} />
                </td>
                <td>
                  <button type="submit" value="Отправить">OK</button>
                </td>
              </tr>
            </table>
            <table>
              <tr><br/></tr>
                <th> <label>Дата (ДД.ММ.ГГ)  </label></th>
                <th><label>Пройдено км  </label></th>
                 <th>Действия </th> 
            </table>
            <div className="ScrlDiv">   
              <table className="Table">
                {this.outlist()}
              </table>
            </div>
          </div>
        </form>
      </div>
    )
  }
}



function App() {
  return (
    <StepsForm />
  );
}

export default App;
