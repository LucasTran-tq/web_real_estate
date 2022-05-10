import React, {Component} from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import "./information.css"


import ActivityCarousel from './ActivityCarousel'
import Introduction from './Introduction'
import SpecialNewsCarousel from './SpecialNewsCarousel'
import ImplementSection from './ImplementSection'
import Banner from './Banner'
import Slogan from './Slogan'


class Information extends Component {
    render() {
        return (
            <Fragment>
             <div><Banner/></div>
                <div>
                    <Introduction/>
                </div>
                <div>
                    <Slogan/>
                </div>
                <div>
                <ActivityCarousel/>
                </div>
                <div>
                    <ImplementSection />
                </div>
                <div><SpecialNewsCarousel/></div>
            </Fragment>
          );
    }
}
/*
s
*/
export default Information;