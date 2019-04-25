import React, { Component } from 'react';


class Main extends Component {

    render() {
        return (
            <div className="mainPanel">
                <div className="main-top">
                    <div className="title">
                        {this.props.document.title }
                    </div>
                </div>
                <div className="contents">
                    {
                        this.props.document.img ?
                            <img src={'http://localhost:8000/images/' + this.props.document.img} width="80%" />
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default Main;