import "./aboutUs.css"
import propTypes from 'prop-types';

/**
 * Component that handles site introduction section
 * @param {string} img media path
 * @param {any} msg string || object to render text content 
 * @return React.element
 */
function AboutUsView({ img, msg }) {

    return (
        <div className="about_us">
            <div className="about_us_img_container">

                <img src={img} alt=" " className="about_us_img" />

            </div>

            <div className="about_us_msg_container">

                <h1 className="about_us_msg">{msg}</h1>

            </div>
        </div>
    )
}

AboutUsView.propTypes = {
    img: propTypes.string,
    msg: propTypes.any
};




export default AboutUsView;


