import React, {memo} from 'react';
import Header from "./Header";

const HeaderContainer: React.FC =
    () => {

        return (
            <Header/>
        );
    };

export default memo(HeaderContainer);