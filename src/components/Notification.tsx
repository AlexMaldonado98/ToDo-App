import React from "react";

export const Notifications = ({msg}:{msg:string | null}) => {

    if(msg === null){
        return null;
    }

    if(msg?.includes('[ERROR]')){
        return <p className="message-error">{msg.slice(7,msg.length)}</p>;
    }else{
        return <p className="message-success">{msg}</p>;
    }
};