// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Inbox {
  string public message;

  constructor(string memory intialMessage) {
    message = intialMessage;
  }

  function setMessage(string memory newMessage) public {
    message = newMessage;
  }


}