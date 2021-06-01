// ****************************************************************
// We're testing our app using JEST library
// Jest is a library for testing JavaScript code. It's an open 
// source project maintained by Facebook.
// Jest is a way for having access to test runner and assertion 
// library for NodeJS applications.
// ****************************************************************
describe("Testing our nodeJS app", () => {
    it("Testing using Github Actions", () => {
        // exoecting 3 functions and receiving 3
        //  this test will pass unless the value change
        expect(3).toBe(3);
    });
});