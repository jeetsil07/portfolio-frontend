import styled from "@emotion/styled";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

export const Logo = styled(Avatar)`
  margin: 0 auto;
`;
export const SearchBar = styled("div")`
  width: 70%;
`;
export const ContentBox = styled(Box) <{ topmargin?: number, bgimg?: string }>`
  margin-top: ${(props) => props.topmargin}px;
  padding: 20px;
  box-sizing: border-box;
  background-image: url(${(props) => props.bgimg});
  background-size: contain;
  background-position: start;
  background-repeat: no-repeat;
`;
export const GridContainer = styled(Grid)`
    width: 100%;
    Height: auto;
    padding-top: 20px;
`;
export const ImageBox = styled(Box)`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 10px white, 0 0 0 15px #47a992;
`;
export const AboutText = styled(Typography)`
text-align: left;
 margin-top: 10px
`;
export const CustomButton = styled(Button) <{ marginTop?: boolean, marginBottom?: boolean, marginLeft?: boolean, marginRight?: boolean }>`
    background-color: #47A992;
    margin-top: ${props => (props.marginTop ? '10px' : '0')};
    margin-bottom: ${props => (props.marginBottom ? '10px' : '0')};
    margin-left: ${props => (props.marginLeft ? '10px' : '0')};
    margin-right: ${props => (props.marginRight ? '10px' : '0')};

    &:hover {
        background-color: #FF0060;
    }
`;
export const FooterContainer = styled(GridContainer)`
    background-color: #47A992;
    padding: 20px;
`;
export const SectionTitle = styled(Typography)`
    color: #47A992;
    display: inline-block;
    padding: 5px;
    border-Bottom: 2px solid;

`;

export const BlogFilterPanel = styled(Box)`
  box-sizing: border-box;
  position: fixed;
  top: 0; right: 0; 
  width: 300px;
  z-index: 1200;
  height: 100vh; 
  background-color: white; 
  padding: 25px;  
  overflow: auto;
`;
