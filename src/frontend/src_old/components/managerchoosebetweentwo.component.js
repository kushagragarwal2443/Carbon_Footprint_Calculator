import React,{Component} from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ManagerChoosebetweenTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paths:[
        {
          value:"",
          display:"(Select a path)"
        },
        {
          value:"path1",
          display:"Path1"
        },
        {
          value:"path2",
          display:"Path2"
        }
      ],
      selectedPath:"",
      error:"",
      carbonfootprint1: '',
      carbonfootprint2: ''
    }

    this.OnSelectPath1 = this.OnSelectPath1.bind(this);
    this.OnSelectPath2 = this.OnSelectPath2.bind(this);
    this.onChangeselectedPath = this.onChangeselectedPath.bind(this);
    this.onChangeerror = this.onChangeerror.bind(this);
    this.submit = this.submit.bind(this);
}

// componentDidMount() {

//   const Data = {
//     no_of_vehicles: this.props.no_of_vehicles,
//     source_location : this.props.source_location,
//     destination_location : this.props.destination_location
// }

// console.log(Data);
// axios.post('http://localhost:5000/PreemptiveCalculation',Data)
//      .then(
//          res =>
//          {
//           this.setState({ carbonfootprint1:res.data['result']['cfp1']});
//           this.setState({ carbonfootprint2:res.data['result']['cfp2']});
//          }
//      );

// this.setState({
//     Getpathsvariable : true
// });

// }

OnSelectPath1(e){
        const Data = {
              username : localStorage.getItem("username") ,
              no_of_vehicles: this.props.no_of_vehicles,
              source_location : this.props.source_location,
              destination_location : this.props.destination_location
          }
          console.log(Data);

        axios.post('http://localhost:5000/bestshortestpath',Data)
            .then(
                 res =>
                  {
                     console.log(res.data)
                  }
          );

    }

OnSelectPath2(e){
        const Data = {
            username : localStorage.getItem("username") ,
            no_of_vehicles: this.props.no_of_vehicles,
            source_location : this.props.source_location,
            destination_location : this.props.destination_location
        }
        console.log(Data);

        axios.post('http://localhost:5000/secondbestshortestpaths',Data)
        .then(
             res =>
              {
                 console.log(res.data)
              }
      );

  }

  onChangeselectedPath(event) {
    this.setState({ selectedPath: event.target.value });
  }
  onChangeerror(event) {
    this.setState({ error: event.target.value });
  }

  submit = () => {
    if(this.state.selectedPath)
    {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // alert('Clicked Yes')
            console.log(this.state.selectedPath)
            if(this.state.selectedPath=="path1"){this.OnSelectPath1()}
            else if(this.state.selectedPath=="path2"){this.OnSelectPath2()}
            window.location.reload(false);
          }
        },
        {
          label: 'No',
          onClick: () => alert('Clicked No')
        }
      ]
    });
    this.setState({
      error:"",
      no_of_vehicles:"",
      source_location:"",
      destination_location:""
    })
  }
  else{this.setState({error:"You must select a path."})}
  };

    render() {
      return(
        <div>
            <p>Path With ShortestDistance:</p>
            {/* <ol>{this.props.Ppath1.map((number) =>  <li>{number}</li>)}</ol> */}
            <p>carbon footprint for this path is : {this.props.carbonfootprint1}</p>
            <p>Path With LeastCarbonFootprint</p>
            {/* <ol>{this.props.Ppath2.map((number) =>  <li>{number}</li>)}</ol> */}
            <p>carbon footprint for this path is : {this.props.carbonfootprint2}</p>
             {/* TODO:format them and list them as sequence of nodes */}
             <select
               value={this.state.selectedPath}
               onChange={e=>
               this.setState({
                 selectedPath: e.target.value,
                 error:
                 e.target.value===""
                 ? "You must select a path"
                 : ""
               })
               }
               >
               {this.state.paths.map(path => (
               <option
               key={path.value}
               value={path.value}
               >
                {path.display}
              </option>
                ))}
               </select>
               <div
              style={{
              color: "red",
              marginTop: "5px"
              }}
              >
             {this.state.error}
             <br></br>
             <button type="submit" className="btn btn-primary" onClick={this.submit}>Upload</button>
             </div>
        </div>
    )
    }
  }

export default ManagerChoosebetweenTwo
