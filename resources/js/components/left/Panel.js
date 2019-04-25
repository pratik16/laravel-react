import React, { Component } from 'react';
import axios from 'axios';

class Panel extends Component {
    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
        this.isEmpty = this.isEmpty.bind(this);

        /*this.state = {
            documents: [
                {
                    id: 1,
                    title: 'Document #1',
                    description: 'Me, Dustin',
                    image: 'image-2.png',
                    class: ''
                },
                {
                    id: 2,
                    title: 'Document #2',
                    description: 'Me, Dustin',
                    image: 'image-2.png',
                    class: ''
                },
                {
                    id: 3,
                    title: 'Document #3',
                    description: 'Me, Dustin',
                    image: 'image-3.png',
                    class: ''
                }
            ],
            activeDocument: 1
        }*/
        this.state = {
            documents: []
        }
    }

    submitFile() {
        document.getElementById('getFile').click();
    }

    changeEvent(t) {
        this.setState({
            activeDocument: t
        });
        let obj = this.state.documents.filter((e) => e.id === t)
        if (!this.isEmpty(obj)) {
            let obj1 = { img: obj[0].image, title: obj[0].title};
            this.props.updateState(obj1)
        }
    //    this.forceUpdate();
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    getData() {
        axios.get('http://localhost:8000/api/docs')
            .then(res => {
                var data = JSON.parse(res.data.data);
                this.setState({
                    documents: data
                });
                //console.log(1);
                //console.log(data);
                this.changeEvent(1);
            })
    }

    componentDidMount() {
        this.getData();

    }

    callSubmit(e) {
        const files = Array.from(e.target.files);

        var formData = new FormData();
        files.forEach((file, i) => {
            formData.append("docfile", file);
        });

        axios.post('http://localhost:8000/api/docs', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
//        document.getElementById('form1').submit();
    }

    render() {
        return (
            <div className="leftPanel">
                <div className="left-top">
                    <h1>FILES</h1>
                    <form id="form1" action="/" method="post" encType="multipart/form-data" onChange={this.callSubmit.bind(this)}>
                        <input type='file' id="getFile" name="docfile" accept="image/*"/>
                    </form>
                    <h2 onClick={this.submitFile.bind(this)}>Upload
                        <span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2773 3.9668C10.4258 4.11523 10.5 4.29297 10.5 4.5C10.5 4.71875 10.4258 4.89844 10.2773 5.03906C10.1328 5.17969 9.95703 5.25 9.75 5.25H7.875V9C7.875 9.20703 7.80078 9.38477 7.65234 9.5332C7.50781 9.67773 7.33203 9.75 7.125 9.75H4.875C4.66797 9.75 4.49023 9.67773 4.3418 9.5332C4.19727 9.38477 4.125 9.20703 4.125 9V5.25H2.25C2.04297 5.25 1.86523 5.17969 1.7168 5.03906C1.57227 4.89844 1.5 4.71875 1.5 4.5C1.5 4.29688 1.57227 4.11914 1.7168 3.9668L5.4668 0.216797C5.61133 0.0722656 5.78906 0 6 0C6.20703 0 6.38281 0.0722656 6.52734 0.216797L10.2773 3.9668ZM10.5 10.5V7.5H12V10.5C12 10.9141 11.8535 11.2676 11.5605 11.5605C11.2676 11.8535 10.9141 12 10.5 12H1.5C1.08594 12 0.732422 11.8535 0.439453 11.5605C0.146484 11.2676 0 10.9141 0 10.5V7.5H1.5V10.5H10.5Z" fill="#9CA0B2"/>
                             </svg>
                        </span>
                    </h2>

                </div>

                    {this.state.documents.map((obj, index) => {
                        return <div key={index} className={"left-bottom " + (obj.id === this.state.activeDocument ? 'active' : '')} onClick={this.changeEvent.bind(this, obj.id)}>
                                    <div className="title">
                                        {obj.title}
                                    </div>
                                    <div className="description">
                                        {obj.description}
                                    </div>
                                </div>
                            ;
                    })}
            </div>
        );
    }
}

export default Panel;