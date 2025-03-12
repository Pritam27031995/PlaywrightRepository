Feature: Test Ecommere Web

Scenario: Validate Order Placement
Given User have valid "pritam.debnath@gmail.com" and "Test@1234"
When User selects "ADIDAS ORIGINAL" and add to cart
Then The "ADIDAS ORIGINAL" should get displayed in cart
When User provide valid payment details with "pritam.debnath@gmail.com"
Then User should be able to place the order and get the orderId