import Logo from '../assets/dawn-logo.png';
import Styles from '../styles/Email/main.module.scss'
import Block from "../components/Email/Block.jsx";

console.log(Email().props.children[3]);

export default function Email() {

    return (
        <>
            <title>Dawn newslater.</title>
            <img src={Logo} alt="Dawn." className={Styles.logo}/>
            <h1>Dawn newslater.</h1>
            <div className={Styles.blocks}>
                <Block name={'9to5mac'}/>
                <Block name={'MacRumors'}/>
            </div>

        </>
    );
}