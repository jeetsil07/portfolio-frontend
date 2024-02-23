import { screen } from "@testing-library/react";
import Navbar from "../../components/header/Navbar"
import { renderWithProviders } from "../../slices/uiTest"

describe('unit test case for navbar',()=>{
    it('unit test for logo picture and text',()=>{
        renderWithProviders(<Navbar/>);

        const logoImg = screen.getByAltText(/jeet sil/i);
        expect(logoImg).toBeInTheDocument();

        // const logoText = screen.getByText(/jeet sil/i);
        // expect(logoText).toBeInTheDocument();
    })
})