import React from "react";
import post from "../assests/admin_LeftMenu/post.png";
import b_post from "../assests/admin_LeftMenu/b_post.png";
import w_post from "../assests/admin_LeftMenu/w_post.png";
import account from "../assests/admin_LeftMenu/account.png";
import b_account from "../assests/admin_LeftMenu/b_account.png";
import w_account from "../assests/admin_LeftMenu/w_account.png";
import news from "../assests/admin_LeftMenu/news.png";
import b_news from "../assests/admin_LeftMenu/b_news.png";
import w_news from "../assests/admin_LeftMenu/w_news.png";
import info from "../assests/admin_LeftMenu/info.png";
import b_info from "../assests/admin_LeftMenu/b_info.png";
import w_info from "../assests/admin_LeftMenu/w_info.png";
import person from "../assests/admin_LeftMenu/person.png";
import b_person from "../assests/admin_LeftMenu/b_person.png";
import w_person from "../assests/admin_LeftMenu/w_person.png";
import like from "../assests/admin_LeftMenu/like.png";
import b_like from "../assests/admin_LeftMenu/b_like.png";
import w_like from "../assests/admin_LeftMenu/w_like.png";
import lock from "../assests/admin_LeftMenu/lock.png";
import b_lock from "../assests/admin_LeftMenu/b_lock.png";
import w_lock from "../assests/admin_LeftMenu/w_lock.png";
import setting from "../assests/admin_LeftMenu/setting.png";
import b_setting from "../assests/admin_LeftMenu/b_setting.png";
import w_setting from "../assests/admin_LeftMenu/w_setting.png";
import NotFound from "../components/not-found";
import NotFoundAdmin from "./not-found-admin";
import OnDevelopingAdmin from "./on-developing-admin";
const MainPage = React.lazy(() => import("./main-page.jsx"));
const Content = React.lazy(() => import("./main-admin/content.jsx"));
const Accounts = React.lazy(() => import("./main-admin/accounts.jsx"));
const Posts = React.lazy(() => import("./main-admin/posts.jsx"));
const News = React.lazy(() => import("./main-admin/news.jsx"));
const Information = React.lazy(() => import("./main-admin/information.jsx"));
const Profile = React.lazy(() => import("./main-admin/profile/profile.jsx"));
const Favourite = React.lazy(() => import("./main-admin/favourite.jsx"));
const Password = React.lazy(() => import("./main-admin/password.jsx"));

const Setting = React.lazy(() => import("./main-admin/setting.jsx"));

const userService = [
    {
        name: "Quản lý bài đăng",
        icon: post,
        hover: b_post,
        focus: w_post,
        link: "/admin/posts",
        Component: Posts,
    },
]

const adminService = [
    ...userService,
    {
        name: "Quản lý tài khoản",
        icon: account,
        hover: b_account,
        focus: w_account,
        link: "/admin/accounts",
        Component: Accounts,
    },
    {
        name: "Quản lý tin tức",
        icon: news,
        hover: b_news,
        focus: w_news,
        link: "/admin/news",
        Component: News,
    },
    {
        name: "Quản lý thông tin",
        icon: info,
        hover: b_info,
        focus: w_info,
        link: "/admin/information",
        Component: Information,
    },

]

const sectionContent = [
    {        
        flag: true,
        title: "QUẢN LÝ DỊCH VỤ",
        option: userService,
    },
    {
        flag: true,
        title: "QUẢN LÝ NGƯỜI DÙNG",
        option: [
            {               
                name: "Thông tin cá nhân",
                icon: person,
                hover: b_person,
                focus: w_person,
                link: "/admin/profile",
                Component: Profile,
            },
            {
                name: "Yêu thích",
                icon: like,
                hover: b_like,
                focus: w_like,
                link: "/admin/favourite",
                Component: Favourite,
            },
            {
                name: "Đổi mật khẩu",
                icon: lock,
                hover: b_lock,
                focus: w_lock,
                link: "/admin/password",
                Component: Password,
            },
        ],
    },
    {
        flag: true,
        title: "CÀI ĐẶT",
        option: [
            {
                name: "Cài đặt",
                icon: setting,
                hover: b_setting,
                focus: w_setting,
                link: "/admin/setting",
                Component: OnDevelopingAdmin,
            },
        ],
    },
    {
        flag: false,
        title: "Not Found",
        option: [
            {
                name: "Not Found",
                link: "/admin/*",
                Component: NotFoundAdmin,
            },
        ],
    },
];


export { userService, adminService, sectionContent }