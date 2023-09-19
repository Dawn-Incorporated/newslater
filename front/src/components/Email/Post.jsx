import PropTypes from "prop-types";
import Styles from '../../styles/Email/main.module.scss'


export default function Post(props) {
    return (
        <div className={Styles.post}>
            <div>
                {props.titre}
            </div>
            <div>
                {props.content}
            </div>
            <div>
                {props.date}
            </div>
            <div>
                <a href={props.url}>
                    see more.
                </a>
            </div>
        </div>
    )
}

Post.propTypes = {
    titre: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    url: PropTypes.string
}