import React, {Component} from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import "./Slogan.css"
import Left from "../../assests/introduction_page/left.png"
import Mid from "../../assests/introduction_page/mid.png"
import Right from "../../assests/introduction_page/right.png"



class Information extends Component {
    render() {
        return (
            <Fragment>
                <div  className = "slogan_wrapper">
                    <div className = "slogan_frame">
                            <div className = "slogan_picture_left">
                                <img  src = {Left}></img>
                            </div>
                            <div className = "slogan_frame_title">
                                Tầm nhìn
                            </div>
                            <div className = "slogan_frame_content">
                                Trở thành sàn giao dịch BĐS lớn nhất Việt Nam
                            </div>
                    </div>
                    
                    
                    
                    <div className = "slogan_frame">
                            <div className = "slogan_picture_mid">
                                <img src = {Mid}></img>
                                </div>
                                <div className = "slogan_frame_title">
                                        Mục tiêu
                                </div>
                                <div className = "slogan_frame_content">
                                    Nơi đáng tin cậy, phụng sự các nhà đầu tư
                            </div>
                    </div>
                      


                    <div className = "slogan_frame">
                            <div className = "slogan_picture_right">
                                <img src = {Right}></img>
                            </div>
                            <div className = "slogan_frame_title">
                                Giá trị cốt lõi 
                            </div>     
                            <div  className = "slogan_frame_content">
                                <h1>Tập trung vào khách hàng và quyết tâm đạt được mục tiêu</h1>
                            </div> 
                    </div>
                       
                </div>
              
            </Fragment>
        );
    }
}
/*
s
*/
export default Information;