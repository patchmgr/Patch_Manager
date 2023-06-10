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
    // alert("Contract connection: Success")
}


Array.prototype.remove = function (element) {
    const index = this.indexOf(element);
    if (index > -1) {
        this.splice(index, 1);
    }
}






let fa = [];
let ba = [];




const getdata = async () => {
    const temp = document.getElementById("selecter").value;
    const result = await window.contract.methods.getbugs(temp).call();
    const resulter = await contract.methods.obtfeatures(temp).call();
    const b_arr = [];
    const bp_arr = [];
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            const a = await window.contract.methods.getbp(temp, result[i][j]).call();
            b_arr.push(result[i][j]);
            bp_arr.push(a);
        }
    }
    const f_arr = [];
    const fp_arr = [];
    for (let i = 0; i < resulter.length; i++) {
        for (let j = 0; j < resulter[i].length; j++) {
            const a = await window.contract.methods.getfp(temp, resulter[i][j]).call();
            f_arr.push(resulter[i][j]);
            fp_arr.push(a);

        }
    }
    const div = document.getElementById("carded");
    div.classList.add("container", "text-center");
    div.style.maxHeight = "300px";
    div.style.overflowY = "auto";

    const card = document.createElement("div");
    card.className = "card";
    div.appendChild(card);


    const head = document.createElement("div");
    head.className = "card-header";
    const para = document.createElement("p");
    const breaker = document.createElement("br");
    para.innerText = "Requestno: ";
    head.appendChild(para);
    card.appendChild(head);
    const body = document.createElement("div");
    body.className = "card-body";
    body.classList.add("d-flex", "justify-content-evenly");



    const bugs = document.createElement("div");
    const par = document.createElement("pre");
    bugs.appendChild(par);
    par.textContent = "Bugs                                Priority"

    for (let  i = 0; i < bp_arr.length; i++) {
        const t1 = await window.contract.methods.bugcheck(temp, b_arr[i]).call();
        if (t1 == "labelled") {
            const b1 = document.createElement("div");
            b1.className = "input-group mb-3 ";
            const b2 = document.createElement("div");
            b2.className = "input-group-text";
            const inp = document.createElement("input");
            inp.className = "form-check-input mt-0";
            inp.type = "checkbox";
            inp.addEventListener("change", function () {
                if (this.checked) {
                    inputcheckedbugs(b_arr[i]);
                } else {
                    // Checkbox is unchecked
                    inputuncheckedbugs(b_arr[i]);
                }
            });
            b2.appendChild(inp);
            const inp2 = document.createElement("input");
            inp2.className = "form-control d-inline:block";
            inp2.type = "text";
            const para=document.createElement("p");
            para.className = "d-inline-block px-5";
            para.textContent=bp_arr[i];
            inp2.value = b_arr[i];
            b1.appendChild(b2);
            b1.appendChild(inp2);
            b1.appendChild(para);
            bugs.appendChild(b1);
            body.appendChild(bugs);
            body.appendChild(breaker);
        }
    }



    const features = document.createElement("div");
    const par1 = document.createElement("pre");
    features.appendChild(par1);
    par1.textContent = "Features                                Priority"
    for (let i = 0; i < fp_arr.length; i++) {
        const ti1 = await window.contract.methods.featurecheck(temp, f_arr[i]).call();
        if (ti1 == "labelled") {

            const bc1 = document.createElement("div");
            bc1.className = "input-group mb-3 ";
            const b2 = document.createElement("div");
            b2.className = "input-group-text";
            const inp = document.createElement("input");
            inp.className = "form-check-input mt-0";
            inp.type = "checkbox";
            inp.addEventListener("change", function () {
                if (this.checked) {
                    inputcheckedfeatures(f_arr[i]);
                } else {
                    // Checkbox is unchecked
                    inputuncheckedfeatures(f_arr[i]);
                }
            });
            b2.appendChild(inp);
            const inp2 = document.createElement("input");
            inp2.className = "form-control d-inline:block";
            inp2.type = "text";
            const para = document.createElement("p");
            para.className = "d-inline-block px-5";
            para.textContent = fp_arr[i];
            inp2.value = f_arr[i];
            bc1.appendChild(b2);
            bc1.appendChild(inp2);
            bc1.appendChild(para);
            features.appendChild(bc1);
            body.appendChild(features);
        }

    }
    card.appendChild(body);
    div.appendChild(card);
    div.appendChild(breaker);
}





const inputcheckedfeatures = (a) => {
    fa.push(a)
}
const inputuncheckedfeatures = (a) => {
    fa.remove(a)
}
const inputcheckedbugs = (a) => {
    ba.push(a)
}
const inputuncheckedbugs = (a) => {
    ba.remove(a)
}

const submitter = async () => {
    const temp = document.getElementById("selecter").value;
    const mySet = new Set(fa);
    const Array1 = Array.from(mySet);
    const mySet2 = new Set(ba);
    const Array2 = Array.from(mySet2);
    console.log(Array2)
    console.log(Array1)
    await window.contract.methods.addDevData(Array2,Array1,temp).send({ from: account });
}



