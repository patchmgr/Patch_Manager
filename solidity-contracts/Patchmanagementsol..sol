// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity 0.8.19;

contract patchmgr {
    address admin = 0xD50de603fD7B63624Fa27AcEc49A3a91b3E0177e;
    address labeller = 0x6E867d9648FB9dc6C55F04cDa6Cc4408b7d141e1;
    address developer = 0xe293D6Eb4054ece8E1B6ffc7f9293dAD99dF48af;
    address verifier = 0x774c6dA0E96047dd51aF754ab0744Ef913cE56D2;
    modifier Onlyadmin() {require(msg.sender == admin); _; }
    modifier Onlyverifier() {require(msg.sender == verifier); _; }
    modifier Onlydeveloper() {require(msg.sender == developer); _; }
    modifier Onlylabeller() {require(msg.sender == labeller); _; }

    struct patch {
        uint256 patch_label_id;
        string patch_name;
        string patch_description;
        string patch_platform;
        string patch_features;
        uint256 patch_no;
        string verification;
        string deployment;
        uint256 register_time;                            
        uint256 verified_time;
        uint256 deployed_time;
        string patch_link;
        uint256 requestno;
    }

    uint256 patch_id = 10000;
    uint256 total = 1;
    uint256[] patch_ids;
    patch[] patch_info;

    function register( string memory _pn, string memory _pd, string memory _pp, string memory _pf, string memory file, uint256 bugid) public Onlydeveloper {
        patch memory newPatch = patch(patch_id ,_pn, _pd, _pp, _pf, total, "In progress", "Not yet verified", block.timestamp, 0, 0, file, bugid );
        patch_ids.push(patch_id);
        patch_info.push(newPatch);
        total += 1;
        patch_id += 12;
        fstatus(bugid, 1);
    }

    function reupload(uint256 temp, string memory name, string memory file) public Onlydeveloper {

        string memory description = patch_info[temp].patch_description;
        string memory platform = patch_info[temp].patch_platform;
        string memory features = patch_info[temp].patch_features;
        uint256 requestNo = patch_info[temp].requestno;
        
        patch memory newPatch = patch(patch_id, name, description, platform,features,total, "In progress", "Not yet verified", block.timestamp, 0,0,file, requestNo );
        patch_info.push(newPatch);
        patch_ids.push(patch_id);
        total++;
        patch_id += 12;
        fstatus(requestNo, 2);

        for (uint256 i = 0; i < adminrequest.length; i++) {
            if (adminrequest[i].dreqno == requestNo) {
                adminrequest[i].dversion++;
                break;
            }
        }
    }


    function downloadPatch(string memory patchName) public view returns (string memory file) {
        for (uint256 i = 0; i < patch_info.length; i++) {
            if (keccak256(bytes(patch_info[i].patch_name)) == keccak256(bytes(patchName))) {
                return patch_info[i].patch_link;
            }
        }
    }


    function details() public view returns (patch[] memory) {
        return patch_info;
    }

    uint256[] verified_ids;

    uint256[] not_verified_ids;
    string[] reason;


    function verifySuccess(string memory name) public Onlyverifier {
        uint256 temp = 0;
        for (uint256 i = 0; i < patch_info.length; i++) {
            if (keccak256(bytes(patch_info[i].patch_name)) == keccak256(bytes(name))) {
                temp = i;
                break;
            }
        }
        patch_info[temp].verified_time = block.timestamp;
        verified_ids.push(patch_info[temp].patch_label_id);
        fstatus(patch_info[temp].requestno, 3);
        patch_info[temp].deployment = "Ready to Deploy";
        patch_info[temp].verification = "Verified";
    }

    function verifyFail(string memory name, string memory cause) public Onlyverifier {
        uint256 temp = 0;
        for (uint256 i = 0; i < patch_info.length; i++) {
            if (keccak256(bytes(patch_info[i].patch_name)) == keccak256(bytes(name))) {
                temp = i;
                break;
            }
        }
        patch_info[temp].verified_time = block.timestamp;
        not_verified_ids.push(patch_info[temp].patch_label_id);
        reason.push(cause);
        fstatus(patch_info[temp].requestno, 5);
        patch_info[temp].deployment = "Can't be deployed";
        patch_info[temp].verification = "Verification failed";
    }

    function failedreason() public view returns (string[] memory) {
        return reason;
    }

    function verificationfailed() public view returns (uint256[] memory) {
        return not_verified_ids;
    }

    uint256[] deployed_ids;

    
    function deploy(string memory name) public Onlyadmin {
        uint256 temp =0;
        for (uint256 i = 0; i < patch_info.length; i++) {
            if (keccak256(bytes(patch_info[i].patch_name)) == keccak256(bytes(name))) {
                temp = i;
                break;
            }
        }

        patch_info[temp].verified_time = block.timestamp;
        patch_info[temp].deployment = "Deployed";
        fstatus(patch_info[temp].requestno, 4);
        deployed_ids.push(patch_info[temp].patch_label_id);
    }



    function dataarray() public view returns (uint256[] memory) {
        return patch_ids;
    }

    function deployedarray() public view returns (uint256[] memory) {
        return deployed_ids;
    }

    struct Report {
        string software;
        string bugs;
        string bug_priority;
        string bug_status;
        string bug_reqstatus;
    }

    struct Reportf {
        string software;
        string features;
        string feature_priority;
        string feature_status;
        string feature_reqstatus;
    }
    
    mapping(string=>Report[] )public bugs_info;
    mapping(string=>Reportf[] )public features_info;
    


    function barr(string memory name) public view returns (Report[] memory) {
        Report[] storage member = bugs_info[name];
        return member;
    }
    function farr(string memory name) public view returns (Reportf[] memory) {
        Reportf[] storage member1 = features_info[name];
        return member1;
    }

    function addUserReport(string memory software, string[] memory b, string[] memory f) public Onlylabeller {
        for (uint256 j = 0; j < b.length; j++) {
            bugs_info[software].push(Report({
                software: software,
                bugs: b[j],
                bug_priority: '0',
                bug_status: "not labelled",
                bug_reqstatus: "not sent"
            }));
        }

        for (uint256 k = 0; k < f.length; k++) {
            features_info[software].push(Reportf({
                software: software,
                features: f[k],
                feature_priority: '0',
                feature_status: "not labelled",
                feature_reqstatus: "not sent"
            }));
        }
    }
    function buglabel(string memory s,string[] memory b,string[] memory p,string[] memory b1,string[] memory p1 ) public Onlylabeller{
        
        for(uint j=0;j<b.length;j++){
            for(uint i=0;i<bugs_info[s].length;i++){
                if(keccak256(bytes(bugs_info[s][i].bugs))==keccak256(bytes(b[j]))){
                    bugs_info[s][i].bug_status="labelled";
                    bugs_info[s][i].bug_priority=p[j];
                    break;
                }
            }

        }

        for(uint j=0;j<b1.length;j++){

            for(uint i=0;i<features_info[s].length;i++){
                if(keccak256(bytes(features_info[s][i].features))==keccak256(bytes(b1[j]))){
                    features_info[s][i].feature_status="labelled";
                    features_info[s][i].feature_priority=p1[j];
                    break;
                }
            }

        }
    }
                    

    



    struct DevData {
        string[] dbugs;
        string[] dfeatures;
        uint256 dversion;
        string dsoftware;
        string dstatus;
        uint256 dreqno;
    }

    mapping(uint256 => DevData) public ddata;
    uint256 public dkey = 500;
    DevData[] public adminrequest;

    function addDevData(string[] memory bugs, string[] memory features, string memory software) public Onlyadmin {
        DevData memory devData = DevData({
            dbugs: bugs,
            dfeatures: features,
            dversion: 1,
            dsoftware: software,
            dstatus: "not uploaded",
            dreqno: dkey
        });
        adminrequest.push(devData);
        dkey += 3;

        for (uint256 i = 0; i < bugs.length; i++) {
            string memory bug = bugs[i];
            for (uint256 j = 0; j < bugs_info[software].length; j++) {
                if (keccak256(bytes(bugs_info[software][j].bugs)) == keccak256(bytes(bug))) {
                    bugs_info[software][j].bug_reqstatus = "sent";
                    break;
                }
            }
        }

        for (uint256 i = 0; i < features.length; i++) {
            string memory feature = features[i];
            for (uint256 j = 0; j < features_info[software].length; j++) {
                if (keccak256(bytes(features_info[software][j].features)) == keccak256(bytes(feature))) {
                    features_info[software][j].feature_reqstatus = "sent";
                    break;
                }
            }
        }
    }


    function fall() public view returns (DevData[] memory) {
        return adminrequest;
    }

    function fstatus(uint256 i, uint256 n) internal {
        if (n == 1) {
            for (uint256 j = 0; j < adminrequest.length; j++) {
                if(adminrequest[j].dreqno==i){
                    adminrequest[j].dstatus = "Uploaded";
                    break;
                }
            }
        } else if (n == 2) {
            for (uint256 j = 0; j < adminrequest.length; j++) {
                if(adminrequest[j].dreqno==i){
                    adminrequest[j].dstatus = "Re-uploaded";
                    break;
                }
            }
        } else if (n == 3) {
            for (uint256 j = 0; j < adminrequest.length; j++) {
                if(adminrequest[j].dreqno==i){
                    adminrequest[j].dstatus = "Ready-to-deploy";
                    break;
                }
            }
        } else if (n == 4) {
              for (uint256 j = 0; j < adminrequest.length; j++) {
                if(adminrequest[j].dreqno==i){
                    adminrequest[j].dstatus = "Completed";
                    break;
                }
            }

        }
        else if (n == 5) {
            for (uint256 j = 0; j < adminrequest.length; j++) {
                if(adminrequest[j].dreqno==i){
                    adminrequest[j].dstatus = "failed re-developing";
                    break;
                }
            }

        }
    }
}
