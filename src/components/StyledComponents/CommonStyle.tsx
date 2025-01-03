import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Radio,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import { ImageBoxProps } from "../../util/type/types";
import { primaryColor, secondaryColor } from "../../util/constant";
import { CheckBox } from "@mui/icons-material";
export const Logo = styled(Avatar)`
  margin: 0 auto;
`;
export const UserImg = styled(Avatar)`
  margin: 0 5px;
  width: 30px;
  height: 30px;
`;
export const SearchBar = styled("div")`
  width: 70%;
`;
export const ContentBox = styled(Box)<{ topmargin?: number; bgimg?: string }>`
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
  height: auto;
  justify-content: center;
  align-items: center;
`;
export const ImageBoxContainer = styled(Grid)`
  margin-bottom: "10px";
`;
export const ImageBox = styled(Box)<ImageBoxProps>`
  height: ${({ profile }) => (profile ? "150px" : "200px")};
  width: ${({ profile }) => (profile ? "150px" : "200px")};
  border-radius: ${({ profile }) => (profile ? "10px" : "50%")};
  overflow: hidden;
  box-shadow: ${({ profile }) =>
    profile ? "" : `0 0 0 10px white, 0 0 0 15px ${primaryColor}`};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #80808029;

  & img {
    height: 100%;
    width: 100%;
    object-fit: ${({ profile }) => (profile ? "contain" : "cover")};
  }
`;
export const StyleBioArea = styled(Grid)`
  margin: 20px 10px;
`;
export const AboutText = styled(Typography)`
  text-align: left;
  margin-top: 10px;
`;
export const CustomButton = styled(Button)<{
  marginTop?: boolean;
  marginBottom?: boolean;
  marginLeft?: boolean;
  marginRight?: boolean;
}>`
  background-color: ${primaryColor};
  margin-top: ${(props) => (props.marginTop ? "10px" : "0")};
  margin-bottom: ${(props) => (props.marginBottom ? "10px" : "0")};
  margin-left: ${(props) => (props.marginLeft ? "10px" : "0")};
  margin-right: ${(props) => (props.marginRight ? "10px" : "0")};

  &:hover {
    background-color: #ff0060;
  }
`;
export const StyledButton = styled(Button)<{spaceMargin?: boolean}>`
  background-color: ${primaryColor};
  margin:${(props)=>props.spaceMargin ? "10px":""};
  &:hover {
    background-color: ${secondaryColor};
  }
`;
export const FooterContainer = styled(GridContainer)`
  background-color: ${primaryColor};
  padding: 20px;
`;
export const SectionTitle = styled(Typography)`
  color: ${primaryColor};
  display: inline-block;
  padding: 5px;
  border-bottom: 2px solid;
`;

export const BlogFilterPanel = styled(Box)<{ marginTop: number }>`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  z-index: 1200;
  height: 100vh;
  background-color: white;
  padding: 25px;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: ${(props) => props.marginTop}px;
`;

export const ProfileImgInput = styled.div`
  margin-left: 10px;

  & input {
    display: none;
  }
`;

// export const StyledTooltip = styled(Tooltip)`
//   & .${tooltipClasses.tooltip} {
//     background-color: ${primaryColor};
//     color: white;
//   }

//   & .${tooltipClasses.arrow} {
//     color: ${primaryColor};
//   }
// `

export const StyledRadio = styled(Radio)`
  color: ${primaryColor};
  &.Mui-checked {
    color: ${primaryColor};
  }
`;

export const StyledDivider = styled(Divider)`
  margin: 5px 0;
`;

export const StyledCheckBox = styled(Checkbox)`
  color: ${primaryColor};
  &.Mui-checked {
    color: ${primaryColor};
  }
`;

export const StyledFilterButtonsHolder = styled(Box)`
  position: fixed;
  bottom: 10px;
  width: 100%;
  background-color: #fff;
`;
