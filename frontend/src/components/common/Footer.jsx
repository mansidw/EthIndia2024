import React from "react";

function Footer() {
    return (
        <div
            className="py-3 d-flex justify-content-center"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.70)", //"rgb(232, 232, 232)"
                color: "white",
            }}
        >
            <p>
                {" "}
                Leave a ⭐ on{" "}
                <a
                    href="https://github.com/J0SAL/eth_template"
                    target="_blank"
                    rel="noreferrer"
                >
                    Github
                </a>
                <span className="px-2">, made by</span>
                <a href="#" target="_blank" rel="noreferrer">
                    @
                </a>{" "}
            </p>
        </div>
    );
}

export default Footer;