import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

describe("login", () => {
  test("login form should be in the document", () => {
    const component = render(<App />);
    const userNameInput = component.getByText("Username");
    expect(userNameInput).toBeInTheDocument();
    const pwdInputNode = component.getByText("Password");
    expect(pwdInputNode).toBeInTheDocument();
  });

  test("username textfield should accept valid input only", () => {
    const component = render(<App />);
    const userName = component.getByTestId("username-input");
    expect(userName.value).toMatch("");   

    // alphnumeric not allowed
    fireEvent.change(userName, { target: { value: "t34tin" } });
    expect(userName.value).toMatch("t34tin");
    let errorMessageNode = component.getByText("Username can be of length 6 and contains only letters.");
    expect(errorMessageNode).toBeInTheDocument();

    //numeric not allowed
    fireEvent.change(userName, { target: { value: "123445" } });
    expect(userName.value).toMatch("123445");
    errorMessageNode = component.getByText("Username can be of length 6 and contains only letters.");
    expect(errorMessageNode).toBeInTheDocument();

    //more than 6 length not alowed
    fireEvent.change(userName, { target: { value: "testing" } });
    expect(userName.value).toMatch("testing");
    errorMessageNode = component.getByText("Username can be of length 6 and contains only letters.");
    expect(errorMessageNode).toBeInTheDocument();

    //valid input with only letters and length 6
    fireEvent.change(userName, { target: { value: "testin" } });
    expect(userName.value).toMatch("testin");
    expect(() => component.getByText("Username can be of length 6 and contains only letters."))
    .toThrow('Unable to find an element with the text: Username can be of length 6 and contains only letters.. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.');
  });

  test("password textfield should accept valid input only", () => {
    const component = render(<App />);
    const password = component.getByTestId("password-input");
    expect(password.value).toMatch("");   

    //special characters not allowed
    fireEvent.change(password, { target: { value: "123*4845" } });
    expect(password.value).toMatch("123*4845");
    let errorMessageNode = component.getByText("Password can be of length 8 and contains only alphanumeric letters.");
    expect(errorMessageNode).toBeInTheDocument();

    //more than 8 length not alowed
    fireEvent.change(password, { target: { value: "password123" } });
    expect(password.value).toMatch("password123");
    errorMessageNode = component.getByText("Password can be of length 8 and contains only alphanumeric letters.");
    expect(errorMessageNode).toBeInTheDocument();

    //valid input with only letters and length 8
    fireEvent.change(password, { target: { value: "pass1234" } });
    expect(password.value).toMatch("pass1234");
    expect(() => component.getByText("Password can be of length 8 and contains only alphanumeric letters."))
    .toThrow('Unable to find an element with the text: Password can be of length 8 and contains only alphanumeric letters.. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.');
  });
});
