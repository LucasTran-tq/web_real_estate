import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './project-info.css';



export default class ProjectInfo extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        
        return (
            <div className="project-info-container">
                { !!this.props.input ?
                <div>
                    <div className="project-info-container-header">
                        <div className='project-info-title'>THÔNG TIN DỰ ÁN </div>
                        <div className="project-info-content-container">
                            <span className='project-info-key'>Tên dự án: </span>
                            <span className='project-info-value'>{this.props.input.project}</span>
                        </div>

                        <div className="project-info-content-container">
                            <span className='project-info-key'>Chủ đầu tư: </span>
                            <span className='project-info-value'>{this.props.input.nameAuthor}</span>
                        </div>
                    </div>

                    <div className="project-info-container-footer">
                        <div className='post-info-container'>
                            <div className='post-info'>
                                <h2 className='post-info-key'>Ngày đăng</h2>
                                <h2 className='post-info-value'>{this.props.input.dateUpload}</h2>
                            </div>
                            <div className='post-info'>
                                <h2 className='post-info-key'>Ngày hết hạn</h2>
                                <h2 className='post-info-value'>{this.props.input.dateEnd}</h2>
                            </div>
                            <div className='post-info'>
                                <h2 className='post-info-key'>Loại tin</h2>
                                <h2 className='post-info-value'>Tin thường</h2>
                            </div>
                            <div className='post-info'>
                                <h2 className='post-info-key'>Mã tin</h2>
                                <h2 className='post-info-value'>{this.props.input.idPost}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                : null }  
            </div>
           
        );
    }
}