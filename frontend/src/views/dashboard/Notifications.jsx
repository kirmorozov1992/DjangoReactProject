import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";

import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import Moment from "../../plugin/Moment";

function Notifications() {

    const [noti, setNoti] = useState([]);
    const user_id = useUserData()?.user_id;

    const fetchNoti = async () => {
        try {
            const noti_res = await apiInstance.get(`author/dashboard/noti-list/${user_id}/`);
            setNoti(noti_res.data);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        fetchNoti();
    }, []);

    const handleMarkNotiAsSeen = async (notiId) => {
        try {
            const response = await apiInstance.post(`author/dashboard/noti-mark-seen/`, { noti_id: notiId  });
            console.log(response.data);
            fetchNoti();
            Toast("success", "Notification seen");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row mt-0 mt-md-4">
                        <div className="col-lg-12 col-md-8 col-12">
                            <div className="card mb-4">
                                <div className="card-header d-lg-flex align-items-center justify-content-between">
                                    <div className="mb-3 mb-lg-0">
                                        <h3 className="mb-0">Notifications</h3>
                                        <span>Manage all your notifications from here</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {noti?.map((n, index) => (
                                            <li className="list-group-item p-4 shadow rounded-3 mt-4" key={index}>
                                                <div className="d-flex">
                                                    <div className="ms-3 mt-2">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <h4 className="mb-0 fw-bold">
                                                                    {n?.type === "Like" && (
                                                                        <>
                                                                            <h4>
                                                                                <i className="fas fa-thumbs-up text-primary"></i> New Like
                                                                            </h4>
                                                                            <p className="mt-3">
                                                                                Someone just liked your post <b>{n?.post?.title}</b>
                                                                            </p>
                                                                        </>
                                                                    )}

                                                                    {n?.type === "Comment" && (
                                                                        <>
                                                                            <h4>
                                                                                <i className="bi bi-chat-left-quote-fill text-success"></i> New Comment
                                                                            </h4>
                                                                            <p className="mt-3">
                                                                                Someone just commented your post <b>{n?.post?.title}</b>
                                                                            </p>
                                                                        </>
                                                                    )}

                                                                    {n?.type === "Bookmark" && (
                                                                        <>
                                                                            <h4>
                                                                                <i className="fas fa-bookmark text-danger"></i> New Bookmark
                                                                            </h4>
                                                                            <p className="mt-3">
                                                                                Someone just bookmarked your post <b>{n?.post?.title}</b>
                                                                            </p>
                                                                        </>
                                                                    )}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2">
                                                            <p className="mt-1">
                                                                <span className="me-2 fw-bold">
                                                                    Date: <span className="fw-light">{Moment(n?.date)}</span>
                                                                </span>
                                                            </p>
                                                            <p>
                                                                <button onClick={() => handleMarkNotiAsSeen(n?.id)} class="btn btn-outline-secondary" type="button">
                                                                    Mark as Seen <i className="fas fa-check"></i>
                                                                </button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}

                                        {noti?.length < 1 && <p>No notifications yet</p>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Notifications;
