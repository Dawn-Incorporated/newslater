import { send } from "@/server/config/mailer";
import React, { ReactElement } from "react";

export default async function emailForMagicLink(identifier: string, url: string) {
    send(identifier, "Bienvenue sur Newslater.", HtmlElement(identifier, url))
}

const HtmlElement = (identifier: string, url: string): ReactElement => {
    return (
        <>
            <div className="logo">
                <img src="https://i.ibb.co/c690ymG/newslater.png" alt="newslater" style={ {width: '200px'} }/>
            </div>
            <h1>YOUR LOGIN CODE FOR NEWSLATER.</h1>
            <a href={ url } className="button">Login to Newslater.</a>
            <p>This link will only be valid for the next 5 minutes. If the link does not work, try again</p>
            <hr/>
            <h4>Newslater.</h4>
            <style>
                { `
                    .logo { 
                        display: flex; 
                        justify-content: center; 
                        margin-bottom: 50px;
                    }
                    img { 
                        max-width: 100%; 
                        max-height: fit-content;
                    }
                    body { 
                        background-color: transparent;
                    }
                    h1 { 
                        display: flex; 
                        justify-content: center; 
                        font-size: 24px; 
                        color: #333;
                    }
                    a.button { 
                        display: block; 
                        width: fit-content; 
                        margin: auto;
                        padding: 10px 20px; 
                        text-decoration: none; 
                        color: white; 
                        background-color: #8DAB8A; 
                        border-radius: 5px; 
                        text-align: center;
                        font-size: 16px;
                        font-weight: 600;
                    }
                    p { 
                        font-size: 14px; 
                        color: #555; 
                        text-align: center;
                    }
                    hr { 
                        border: none; 
                        border-top: 1px solid #6A6A6A; 
                        margin: 20px 0;
                    }
                    h4 { 
                        color: #6A6A6A;
                    }
                ` }
            </style>
        </>
    );
}