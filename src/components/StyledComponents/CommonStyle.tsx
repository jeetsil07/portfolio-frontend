import styled from "@emotion/styled";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

export const Logo = styled(Avatar)`
  margin: "0 auto";
`;
export const SearchBar = styled("div")`
  width: 70%;
`;
export const ContentBox = styled(Box)<{ topmargin?: number, bgimg?: string }>`
  margin-top: ${(props) => props.topmargin}px;
  padding: 20px;
  box-sizing: border-box;
  background-image: url(${(props)=>props.bgimg});
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
export const CustomButton = styled(Button)<{btncolor?: string}>`
    background-color: #47A992;
    margin: 10px;
    &:hover{
        background-color: #FF0060;
    }
`;
