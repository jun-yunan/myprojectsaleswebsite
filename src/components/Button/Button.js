import classNames from "classnames/bind";
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    children,
    primary = false,
    outline = false
}) {

    let Component = 'button'

    const classes = cx('wrapper', {
        primary,
        outline
    })


    return (
        <Component className={classes}>
            {children}
        </Component>
    );
}

export default Button;