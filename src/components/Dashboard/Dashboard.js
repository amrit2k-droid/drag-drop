import React from 'react';
import './Dashboard.css';

class Dashbooard extends React.Component {

    state = {
        info: []
    }

    componentDidMount() {
        fetch('info.json')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    info: data
                })
            })
    }

    onDragStart = (event, id) => {
        console.log('dragstart:',id);
        event.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (event, status) => {
       let id = event.dataTransfer.getData("id");
       
       let info = this.state.info.filter((dt) => {
           if (dt.id == id) {
               dt.status = status;
           }
           return dt;
       });

       this.setState({
           ...this.state,
           info
       });
    }

    moveOnClick = id => {
        let info = this.state.info.filter((dt) => {
            if (dt.id == id) {
                if(dt.status == "Yes") {
                    dt.status = "No";
                }
                else if(dt.status == "No") {
                    dt.status = "Yes";
                }
            }
            return dt;
        });

        this.setState({
            ...this.state,
            info
        });
    }


    render() {

        console.log(this.state.info);

        var info = {
            No: [],
            Yes: []
        }

        this.state.info.forEach(dt => {
            info[dt.status].push(
                <div
                    key={dt.id}
                    onDragStart={(event) => this.onDragStart(event, dt.id)}
                    draggable
                    className="draggable"
                    style={{backgroundColor: dt.color}}
                    onClick={() => this.moveOnClick(dt.id)}
                >
                    {dt.city}  
                </div>
            )
        })
        return (
            <div className="Dashboard">
                <h2 className="header">DRAG & DROP AND CLICK & MOVE</h2>
                <div 
                    className="statusNo"
                    onDragOver = {(event) => this.onDragOver(event)}
                    onDrop = {(event) => this.onDrop(event, "No")}
                    
                >
                    <span className="infoHeader">LEFT</span>
                    {info.No}
                </div>
                <div 
                    className="droppable"
                    onDragOver = {(event) => this.onDragOver(event)}
                    onDrop={(event) => this.onDrop(event, "Yes")}
                >
                    <span className="infoHeader">RIGHT</span>
                    {info.Yes}
                </div>
            </div>
        )
    }
}

export default Dashbooard