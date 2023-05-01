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
            { title: "Patch platform", data: "pf" },
            { title: "Patch details", data: "version" },
            { title: "Patch features", data: "features" },
            { title: "Registered time", data: "time" },
            {
                title: "Download",
                data: null,
                render: function (data, type, row, meta) {
                    var id_down = 'accept-btn-down' + meta.row;
                    return '<input type="button" class="btn btn-primary accept-btn-down" id="' + id_down + '" value="download" onclick="downloadFile(\'' + row.fileData + '\')">';
                }
            },
            
            {
                title: "verification",
                data: null,
                render: function (data, type, row, meta) {
                    var buttonId = 'accept-btn-' + meta.row;
                    return '<input type="button" class="btn btn-primary accept-btn" id="' + buttonId + '" value="verify">';
                }
            }
        ]
    });

    $('#myTable tbody').on('click', '.accept-btn', function () {
        var row = table.row($(this).closest('tr')).data();
        var pn = row.name;
        var t;
        var buttonId = $(this).attr('id');
    
        // Create modal HTML
        var modalHTML = '<div class="modal static-modal" tabindex="-1" role="dialog">'
                      + '<div class="modal-dialog centered-modal-dialog" role="document">'
                      + '<div class="modal-content">'
                      + '<div class="modal-header">'
                      + '<h5 class="modal-title">Verify Patch</h5>'
                      + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
                      + '</div>'
                      + '<div class="modal-body">'
                      + '<p>Are you sure to verify this patch "' + row.name + '"?</p>'
                      + '<div class="form-check">'
                      + '<input class="form-check-input" type="checkbox" value="" id="confirm-check">'
                      + '<label class="form-check-label" for="confirm-check">'
                      + 'I performed all tests'
                      + '</label>'
                      + '</div>'
                      + '</div>'
                      + '<div class="modal-footer">'
                      + '<button type="button" class="btn btn-danger" id="failed-btn" disabled>Failed</button>'
                      + '<button type="button" class="btn btn-primary" id="verify-btn" disabled>Passed</button>'
                      + '</div>'
                      + '</div>'
                      + '</div>'
                      + '</div>';
    
        // Add modal to document
        $(modalHTML).appendTo('body');
    
        // Show modal when Verify button is clicked
        $('#verify-btn').on('click', function () {
            t = 1;
            $("#" + buttonId).prop("value", "verified");
            $("#" + buttonId).prop("disabled", true);
            $('.modal').modal('hide'); // hide modal dialog box
            verificator(t, pn);
        });
    
        // Show modal when Failed button is clicked
        $('#failed-btn').on('click', function () {
            t = 0;
            $("#" + buttonId).removeClass("btn-primary").addClass("btn-danger");
            $("#" + buttonId).prop("value", "verification failed");
            $("#" + buttonId).prop("disabled", true);
            $('.modal').modal('hide'); // hide modal dialog box
            verificator(t, pn);
        });
    
        // Enable Verify button when checkbox is selected
        $('#confirm-check').on('change', function () {
            if (this.checked) {
                $('#verify-btn').prop("disabled", false);
                $('#failed-btn').prop("disabled", false);
            } else {
                $('#verify-btn').prop("disabled", true);
                $('#failed-btn').prop("disabled", true);
            }
        });
    
        // Show modal dialog box
        $('.modal').modal({
            backdrop: 'static',
            keyboard: false
        }).modal('show');
    });
    
    
    


var arrValue = new Array();
const CreateTabl = async () => {
    const ids = await contract.methods.dataarray().call();
    for (var i = 0; i < ids.length; i++) {
        
        const vals = await contract.methods.details(ids[i]).call();
        if(vals[5]=="In progress"){
        let e1 = vals[0];
        let e2 = vals[1];
        let e3 = vals[2];
        let e4 = vals[3];
        let e7 = timestamp_to_date(vals[7]);
        arrValue.push({ name: e1, version: e2, pf: e3, features: e4 ,time :e7});
        }
        
    }
    for (var i = 0; i < arrValue.length; i++) {
        table.row.add(arrValue[i]).draw();
    }
}

var verificator= async (a,b) => {
    await window.contract.methods.verify(a,b).send({ from: account });
}



$('#myTable tbody').on('click', '.accept-btn-down',async function () {
    const row = table.row($(this).closest('tr')).data();
    const pn = row.name;
    const fileData = await window.contract.methods.downloadpatch(pn).call();
    console.log(fileData);
    const fileBlob = new Blob([new Uint8Array(web3.utils.hexToBytes(fileData))], { type: 'application/octet-stream' });
    const fileUrl = URL.createObjectURL(fileBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = `${pn}`;
    downloadLink.click();
});





