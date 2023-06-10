let account;
const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];
        // alert(`Account is: ${account}`)
    }
}

const connectContract = async () => {
    const ABI =[
        {
            "inputs": [],
            "name": "AllHashes",
            "outputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "",
                    "type": "bytes32[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
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
                },
                {
                    "internalType": "uint256",
                    "name": "bug_lbl_time",
                    "type": "uint256"
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
                },
                {
                    "internalType": "uint256",
                    "name": "feature_lbl_time",
                    "type": "uint256"
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
                },
                {
                    "internalType": "uint256",
                    "name": "bugid",
                    "type": "uint256"
                }
            ],
            "name": "register",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "verificationstatus",
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
    const Address = "0xE98FE6f69B361A9878E62F48e0b9F3427cda29a2";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    CreateTabl();
    // alert("Contract connection: Success")
}


function timestamp_to_date(a){
    const timestamp=a;
    const milliseconds = timestamp*1000;
    const dateObject= new Date(milliseconds);
    const formattedTime = dateObject.toLocaleString();
    console.log(formattedTime);
    return formattedTime;
}



var table = $('#myTable').DataTable
    ({
        // Define the table columns
        columns: [
            { title: "Patch name", data: "name" },
            { title: "Patch version", data: "version" },
            { title: "Patch platform", data: "pf" },
            { title: "Patch features", data: "features" },
            { title: "Verified time", data: "time" },
            {
                title: "Deploy Patch",
                data: null,
                render: function (data, type, row, meta) {
                    var id_down = 'accept-btn' + meta.row;
                    return '<input type="button" class="btn btn-primary accept-btn" id="' + id_down + '" value="Deploy to end user">';
                }
            }
        ]
    });

$('#myTable tbody').on('click', '.accept-btn', function () {
    var row = table.row($(this).closest('tr')).data();
    var pn =row.name;
    deployer(pn);
    var buttonId = $(this).attr('id');
    confirm("Are you sure to depoy this patch " + row.name + "?");
    $("#" + buttonId).prop("value", "Deployed");
    $("#" + buttonId).prop("disabled", true);
    console.log("the value of t is"+t);
});


var arrValue = new Array();
const CreateTabl = async () => {
    const ids = await contract.methods.dataarray().call();
    for (var i = 0; i < ids.length; i++) {
        
        const vals = await contract.methods.details(ids[i]).call();
        
        if(vals[6]=="Ready to Deploy"){
            let e1 = vals[0];
            let e2 = vals[1];
            let e3 = vals[2];
            let e4 = vals[5];
            let e7 = timestamp_to_date(vals[8]);
            arrValue.push({ name: e1, version: e2, pf: e3, features: e4 ,time:e7});
            
        }
        
        
        
    }
    for (var i = 0; i < arrValue.length; i++) {
        table.row.add(arrValue[i]).draw();
    }
}

var deployer= async (a) => {
    await window.contract.methods.deploy(a).send({ from: account });
}




