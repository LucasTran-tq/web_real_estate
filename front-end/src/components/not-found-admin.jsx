import React, { useEffect } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import styles from "./not-found-admin.module.scss"
function NotFoundAdmin() {
    const history = useHistory();
    // const handleClick = () => {
    //     history.push("/");
    // }
    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.title}>Rất tiếc!</div>
                <div className={styles.title}>Trang này không tồn tại</div>
                <button className={styles.mainButton}>
                    <a href='/user'>Quay lại trang chủ</a>
                </button>
            </div>

        </Fragment>
    )
}

export default NotFoundAdmin;