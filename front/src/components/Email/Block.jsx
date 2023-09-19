import Post from './Post.jsx'
import PropTypes from "prop-types";
import Styles from "../../styles/Email/main.module.scss";

export default function Block(props) {

    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et urna urna. Nulla ut nibh ante. Vestibulum porta quam eu lorem scelerisque facilisis. Proin accumsan, massa et rhoncus commodo, eros justo tempus turpis, quis auctor erat justo vitae erat. Pellentesque eu sem est. Nulla facilisi. In ut ex non ipsum auctor rhoncus. Curabitur at arcu risus. Mauris ac euismod lacus. Maecenas scelerisque lectus eu erat tincidunt scelerisque. Nulla eros enim, facilisis id ultricies vel, facilisis id lorem. Quisque at eros dictum, porttitor ligula id, elementum leo. Sed scelerisque quam dapibus, cursus lectus eu, viverra ligula.'


    return (
        <div className={Styles.block}>
            <div>
                {props.name}
            </div>

            <Post titre={'USB-C'} content={lorem} date={'19/12/2022'} url={'iut.um.com'}/>
            <Post titre={'Battery'} content={lorem} date={'04/05/1987'} url={'www.google.com'}/>
        </div>
    )
}

Block.propTypes = {
    name: PropTypes.string
}

