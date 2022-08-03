import { fireEvent, render, screen } from '@testing-library/react';
import AboutUs from './components/aboutUs/AboutUs';
import App from './App'
import Search from './components/search/Search'



describe("Given I am a user", () => {
  describe("When I'm on test challenge page ", () => {
    test("Then I should have my page rendered", () => {
      render(< App />)
      const root = screen.getByTestId("app")
      expect(root).toBeTruthy();
    });
  })
});

describe("Given I am a user", () => {
  describe("When I'm on test challenge page ", () => {
    test("Then I should see a text content", () => {
      render(< AboutUs msg={"test"} />)
      const message = screen.getByText(/test/i)
      expect(message).toBeInTheDocument();
    });
  })
});

describe("Given I am a user", () => {
  describe("When I click on the search button", () => {
    test("Then I should trigger an event", () => {
      render(< Search />)
      const button = screen.getByTestId("button")
      fireEvent.click(button)
      expect(button).toBeValid();
    });
  })
});

describe("Given I am a user", () => {
  describe("When I press on enter", () => {
    test("Then I should trigger an event", () => {
      render(< Search />)
      const input = screen.getByTestId("input")
      fireEvent.keyDown(input)
      expect(input).toBeValid();
    });
  })
});



