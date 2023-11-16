import React from "react";
type ContactPT = {
    contactName:string
    contactValue:string
}
const Contact:React.FC<ContactPT> = ({contactName, contactValue}) => {
    return <div><b>{contactName}</b>: <a href={`_${contactValue}`}></a></div>
}
export default Contact;