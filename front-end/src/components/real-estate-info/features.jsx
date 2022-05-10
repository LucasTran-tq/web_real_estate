import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './features.css';



export default class Features extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        function short(data){
            const text = data+" ";
            const length = text.length;
            return  (length<50) ? text : text.slice(0,40) + "...";
        }
        return (
            <div className="features-container">
                { !!this.props.input ? 
                <div>
                    <h2 className='features-title'>ĐẶC ĐIỂM BẤT ĐỘNG SẢN </h2>
                    <div className="features-info-container">
                        <span className="features-info-key">Loại tin đăng: </span>
                        <span className='features-info-value'>{this.props.input.typeName}</span>
                    </div>

                    <div className="features-info-container">
                    <span className='features-info-key'>Địa chỉ: </span>
                    <span className='features-info-value'>{short(this.props.input.addressNote)}, {this.props.input.wardName}, {this.props.input.districtName}, {this.props.input.provinceName}</span>
                    </div>

                    <div className="features-info-2-container">
                        <div className="features-info-container">
                            <span className='features-info-key'>Số phòng ngủ: </span>
                            <span className='features-info-value'>{this.props.input.numBedroom}</span>
                        </div>
                        <div className="features-info-3-container">
                            <span className='features-info-key'>Số phòng tắm/toilet: </span>
                            <span className='features-info-value'>{this.props.input.numBathroom}</span>
                        </div>
                    </div>

                    <div className="features-info-container">
                        <span className='features-info-key'>Nội thất: </span>
                        <span className='features-info-value'>{this.props.input.furnitureInfo}</span>
                    </div>

                    <div className="features-info-container">
                        <span className='features-info-key'>Pháp lý: </span>
                        <span className='features-info-value'>{this.props.input.legalInfo}</span>
                    </div>
                </div>
                : null }
            </div>
        );
    }
}