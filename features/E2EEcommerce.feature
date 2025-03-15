Feature: Test Ecommere Web

@Regression
Scenario Outline: Validate Order Placement
Given User have valid "<Username>" and "<Password>"
When User selects "ADIDAS ORIGINAL" and add to cart
Then The "ADIDAS ORIGINAL" should get displayed in cart
When User provide valid payment details with "pritam.debnath@gmail.com"
Then User should be able to place the order and get the orderId

Examples:
|Username|Password|
|pritam.debnath@gmail.com|Test@1234|