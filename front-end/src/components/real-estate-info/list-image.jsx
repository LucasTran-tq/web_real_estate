import React from 'react';
import Carousel from 'react-elastic-carousel'

import './list-image.css';

import ic_pre from "./../../assests/real_estate_info/ic_pre.svg"
import ic_next from "./../../assests/real_estate_info/ic_next.svg"

const breakPoints = [
    { width: 0, itemsToShow: 4.3 },
];

export default class ListImage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            slideIndex: 0, 
            render: false,
        };

        this.backward = this.backward.bind(this);
        this.forward = this.forward.bind(this);
        this.getNewSlideIndex = this.getNewSlideIndex.bind(this);
        this.setSlideIndex = this.setSlideIndex.bind(this);
  }
     

    getNewSlideIndex(step) {
        const slideIndex = this.state.slideIndex;
        const numberSlide = this.props.input.length;
        
        let newSlideIndex = slideIndex + step;
    
        if (newSlideIndex >= numberSlide) newSlideIndex = 0;
        else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;
    
        return newSlideIndex;
      }

      // Quay về ảnh phía trước, tức index giảm 1 => step = -1
      backward() {
        this.setState({
          slideIndex: this.getNewSlideIndex(-1)
        });
      }

    // Tiến tới ảnh phía sau, tức index tăng 1 => step = 1
    forward() {
        this.setState({
            slideIndex: this.getNewSlideIndex(1)
        });
    }

    // Xác định slideIndex nào sẽ được active
    setSlideIndex(index) {
        this.setState({
             slideIndex: index
        })
     }




    render() {
        let temp = !!this.props.input[this.state.slideIndex] ? this.props.input[this.state.slideIndex].src : null ;
        return (
                <div className="container-list-image">
                    { !!this.props.input ? 
                        <div >
                            <div className="container-active-image">
                            {
                                <img src={temp} className="Selected"/>
                            }

                            <button
                                onClick={this.backward}
                                className="btnPreSlide"
                            >
                            <img src={ic_pre} />
                            </button>
                            <button
                                onClick={this.forward}
                                className="btnNextSlide"
                            >   
                            <img src={ic_next} />
                            </button>
                        </div>
                        
                        <div className="container-carousel-1" >
                            <Carousel breakPoints={breakPoints} showArrows={false} pagination={false} >
                            {
                                this.props.input.map((image, index) => {
                                return (
                                    <div className="container-image-carousel" key={index}>
                                        <img                                       
                                        src={image.src}
                                        className="image"
                                        onClick={() => this.setSlideIndex(index)}
                                        /> 
                                    </div>                        
                                )
                                })
                            } 
                            </Carousel>

                        </div>
                    </div>
                    : null }
                </div>
        );
    }             
}      
