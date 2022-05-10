import React, { useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import './info-description.css';

import ic_down from "./../../assests/real_estate_info/ic_down.png"
import ic_up from "./../../assests/real_estate_info/ic_up.png"

function ReadMore({  data }){
    const text = data+" ";

    const length = text.length;

    const [isTruncated, setIsTruncated] = useState(true);

    const resultString = isTruncated ? text.slice(0, length*0.25)+"..." : text;

    function toggleIsTruncated() {
        setIsTruncated(!isTruncated);
    }

    return(
        <div>
            <p className='info-description-key'>
                {resultString}               
            </p>
            <div className='btn-container' onClick={ toggleIsTruncated}>
                {isTruncated 
                    ? (
                        <button className='_btn' > 
                            <span>Xem thêm</span>
                            <img src={ic_down}></img>    
                        </button>
                    ) 
                    : (
                        <button className='_btn' >
                            <span>Thu gọn</span>
                            <img src={ic_up}></img>
                        </button>
                )}
            </div>
        </div>      
    )
}

export default class InfoDescription extends React.Component{
    constructor(props){
        super(props);

    }


    render() {
        return (
            <div className="info-description-container">
                { !!this.props.input ?
                <div>
                    <h2 className='info-description-title'>THÔNG TIN MÔ TẢ</h2>
                    <div className="info-description-content-container">                    
                        <ReadMore data={this.props.input.content}></ReadMore>
                    </div>
                </div>
                : null }          
            </div>
        );
    }
}