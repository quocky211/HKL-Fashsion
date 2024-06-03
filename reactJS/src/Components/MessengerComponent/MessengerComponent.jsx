import React, { useEffect } from "react";

const MessengerComponent = () => {
    useEffect(() => {
        // Tạo các thuộc tính và giá trị cho phần tử chatbox
        const chatbox = document.getElementById("fb-customer-chat");
        chatbox.setAttribute("page_id", "120347987696844");
        chatbox.setAttribute("attribution", "biz_inbox");

        // Khởi tạo plugin Messenger khi component được mount
        window.fbAsyncInit = function () {
            window.FB.init({
                xfbml: true,
                version: "v18.0",
            });
        };

        // Tải script SDK của Facebook
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src =
                "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    }, []);

    return (
        <>
            <div id="fb-root" />
            <div id="fb-customer-chat" className="fb-customerchat" />
        </>
    );
};

export default MessengerComponent;
