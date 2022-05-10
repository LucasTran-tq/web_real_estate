import React from "react";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import styles from "./on-developing-admin.module.scss"
function OnDevelopingAdmin() {
    const history = useHistory();

    // onClick={handleClick} 
    // const handleClick = () => {
    //     history.replace("/user");
    //     window.location.reload();
    // }
    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.title}>Chức năng đang phát triển</div>
                <div className={styles.title}>Hãy quay lại sau nhé!</div>
                <button className={styles.mainButton}>
                    <a href='/user'><div>Quay lại trang chủ</div></a>
                    </button>
            </div>
        </Fragment>
    )
}

export default OnDevelopingAdmin;