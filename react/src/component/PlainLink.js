import React from "react"
import styled from "styled-components"

import {Link} from "react-router-dom"

const PlainLink = styled(Link)`
color: inherit;
text-decoration: none;
`;

export default props => <PlainLink {...props}/>;