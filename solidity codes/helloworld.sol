// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloWorld{
    string str;
    constructor (){
        str="hello";
    }
    function display() public view returns(string memory){
        return str;
    }
}