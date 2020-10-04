import React from "react";
import {useSrefActive} from "@uirouter/react";

const ContactLink = ({ contact }) => {
    const personSref = useSrefActive("home.contact", { contact_id: contact.id }, "active");
    return (
        <li>
            <a {...personSref}>{contact.name}</a>
        </li>
    );
};

export default ContactLink;