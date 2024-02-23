import { screen } from "@testing-library/react";
import Home from "../../pages/Home";
import { renderWithProviders } from "../../slices/uiTest";


describe('home page unit testing', () => {
  it('unit test for text', () => {
    renderWithProviders(<Home />);
    const text = screen.getByText(/I'm a/i);
    expect(text).toBeInTheDocument();
  });
  it('unit test for download resume button',()=>{
    renderWithProviders(<Home/>);
    const resumeButton = screen.getByRole('button', {
        name: /download resume/i
    });
    expect(resumeButton).toBeInTheDocument();
  });
  it('unit test for about button',()=>{
    renderWithProviders(<Home/>);
    const aboutButton = screen.getByRole('button', {
        name: /about me/i
    })
    expect(aboutButton).toBeInTheDocument();
  })
});
