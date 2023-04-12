// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract sumofnumbers{
    int public a;
    int b;
    constructor(){
        a=1;
        b=2;
    }
    function setnos(int p,int q) public{
        a=p;
        b=q;
    }
    function getsum() public view returns(int){
        return a+b;
    }
}