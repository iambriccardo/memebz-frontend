import React from 'react';
import {Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading,} from "@blueprintjs/core";
import MemesList from "./meme/memeslist/MemesList";

function Home() {
    return (
        <>
            <Navbar>
                <NavbarGroup>
                    <NavbarHeading>MemeBz</NavbarHeading>
                    <NavbarDivider/>
                    <Button className={Classes.MINIMAL} icon="home" text="Home"/>
                    <Button className={Classes.MINIMAL} icon="add"/>
                </NavbarGroup>
            </Navbar>
            <MemesList/>
        </>
    );
}

export default Home;