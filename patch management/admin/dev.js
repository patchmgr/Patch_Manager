let account;
const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];
        // alert(`Account is: ${account}`)
    }
}

const connectContract = async () => {
    const ABI = [
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "bugs",
                    "type": "string[]"
                },
                {
                    "internalType": "string[]",
                    "name": "features",
                    "type": "string[]"
                },
                {
                    "internalType": "string",
                    "name": "software",
                    "type": "string"
                }
            ],
            "name": "addDevData",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "software",
                    "type": "string"
                },
                {
                    "internalType": "string[]",
                    "name": "b",
                    "type": "string[]"
                },
                {
                    "internalType": "string[]",
                    "name": "f",
                    "type": "string[]"
                }
            ],
            "name": "adduserreport",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "s",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "b",
                    "type": "string"
                }
            ],
            "name": "bugcheck",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "a",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "s",
                    "type": "string"
                },
                {
                    "internalType": "string[]",
                    "name": "b",
                    "type": "string[]"
                },
                {
                    "internalType": "string[]",
                    "name": "p",
                    "type": "string[]"
                },
                {
                    "internalType": "string[]",
                    "name": "b1",
                    "type": "string[]"
                },
                {
                    "internalType": "string[]",
                    "name": "p1",
                    "type": "string[]"
                }
            ],
            "name": "buglabel",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "bugs_info",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "bug_des",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "bug_priority",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "bug_status",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "dataarray",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "ddata",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "dno",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "dsoftware",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "dstatus",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "deploy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "deployedarray",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "details",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "patch_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "patch_description",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "patch_platform",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "patch_features",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "patch_no",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "verification",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "deployment",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "register_time",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "verified_time",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "deployed_time",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "patch_link",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct patchmgr.patch",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "dkey",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "s",
                    "type": "string"
                }
            ],
            "name": "downloadpatch",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "file",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "dtotal",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "i",
                    "type": "uint256"
                }
            ],
            "name": "fall",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string[]",
                            "name": "dbugs",
                            "type": "string[]"
                        },
                        {
                            "internalType": "string[]",
                            "name": "dfeatures",
                            "type": "string[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "dno",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "dsoftware",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "dstatus",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct patchmgr.DevData",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "s",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "b",
                    "type": "string"
                }
            ],
            "name": "featurecheck",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "a",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "features_info",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "feature_des",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "feature_priority",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "feature_status",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ftotal",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "s",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "temp",
                    "type": "string"
                }
            ],
            "name": "getbp",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "z",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "s",
                    "type": "string"
                }
            ],
            "name": "getbugs",
            "outputs": [
                {
                    "internalType": "string[][]",
                    "name": "",
                    "type": "string[][]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "s1",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "temp",
                    "type": "string"
                }
            ],
            "name": "getfp",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "a",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "name_to_id",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "s1",
                    "type": "string"
                }
            ],
            "name": "obtfeatures",
            "outputs": [
                {
                    "internalType": "string[][]",
                    "name": "",
                    "type": "string[][]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "patch_details",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "patch_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "patch_description",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "patch_platform",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "patch_features",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "patch_no",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "verification",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "deployment",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "register_time",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "verified_time",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "deployed_time",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "patch_link",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "patchcount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_pn",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_pd",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_pp",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_pf",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "file",
                    "type": "bytes"
                }
            ],
            "name": "register",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "t",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "verify",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const Address = "0x405bcD6F5ca070F55B073aBB02C475f9c8044f06";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);

    // alert("Contract connection: Success")
}

const devrequest = async () => {
    const e1 = document.getElementById("pname").value;
    const e2 = document.getElementById("desc").value;
    const e3 = document.getElementById("psft").value;
    const e4 = document.getElementById("ftres").value;
    const fileinput = document.getElementById("patchfile");
    const file = fileinput.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
        const fileData = new Uint8Array(reader.result);
        console.log(fileData);
        await window.contract.methods.register(e1, JSON.stringify(e2), e3, JSON.stringify(e4),fileData).send({ from: account });
    }

    console.log(e1); // check value of e1
    console.log(e2); // check value of e2
    console.log(e3); // check value of e3
    console.log(e4); // check value of e4
    // console.log("helo")
}

