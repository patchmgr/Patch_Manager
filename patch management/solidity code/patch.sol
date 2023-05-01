// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.8.19;

contract patchmgr {
    struct patch {
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
        bytes patch_link;
    }

    uint256 patch_id = 10000;
    uint256 total = 1;
    uint256[] patch_ids;

    mapping(uint256 => patch) public patch_details;

    mapping(string => uint256) public name_to_id;

    function register(string memory _pn,string memory _pd,string memory _pp,string memory _pf,bytes memory file) public {
        patch_details[patch_id] = patch(_pn,_pd,_pp,_pf,total,"In progress","Not yet verified",block.timestamp,0,0,file);
        name_to_id[_pn] = patch_id;
        patch_ids.push(patch_id);
        total += 1;
        patch_id += 12;
    }
    function downloadpatch(string memory s) public view returns(bytes memory file){
        uint256 t=name_to_id[s];
        return patch_details[t].patch_link;
    }

    function details(uint256 id) public view returns (patch memory) {
        return patch_details[id];
    }

    function patchcount() public view returns (uint256) {
        return total;
    }

    uint256[] verified_ids;

    uint256[] not_verified_ids;

    function verify(uint256 t, string memory name) public {
        uint256 temp = name_to_id[name];
        patch_details[temp].verified_time=block.timestamp;
        if (t == 1) {
            verified_ids.push(temp);
            patch_details[temp].deployment = "Ready to Deploy";
            patch_details[temp].verification = "Verified";
        } else {
            not_verified_ids.push(temp);
            patch_details[temp].deployment = "Cant be deployed";
            patch_details[temp].verification = "Verification failed";
        }
    }

    uint256[] deployed_ids;

    function deploy(string memory name) public {
        uint256 temp = name_to_id[name];
        patch_details[temp].verified_time=block.timestamp;
        patch_details[temp].deployment = "Deployed";
        deployed_ids.push(temp);
    }

    function dataarray() public view returns (uint256[] memory) {
        return patch_ids;
    }

    function deployedarray() public view returns (uint256[] memory) {
        return deployed_ids;
    }

    struct report{
        string[][] bugs;
        string[][] features;
    }
    struct buginfo{
        string bug_des;
        string bug_priority;
        string bug_status;
    }
    struct featureinfo{
        string feature_des;
        string feature_priority;
        string feature_status;
    }

    mapping(string=>buginfo[] )public bugs_info;
    mapping(string=>featureinfo[] )public features_info;
 


    mapping(string => report)  user_report;

    function adduserreport(string memory software,string[] memory b,string[] memory f) public {
        // user_report[software] = report(b, f);
        user_report[software].bugs.push(b);
        user_report[software].features.push(f);
        for(uint256 i=0;i<b.length;i++){
            buginfo memory bb;
            bb.bug_des=b[i];
            bb.bug_priority='0';
            bb.bug_status="not labelled";
            bugs_info[software].push(bb);
        }

        for(uint256 i=0;i<f.length;i++){
            featureinfo memory ff;
            ff.feature_des=f[i];
            ff.feature_priority='0';
            ff.feature_status="not labelled";
            features_info[software].push(ff);
        }
    }

    function getbp(string memory s,string memory temp) public view returns (string memory z) {
        buginfo[] memory t= bugs_info[s];
        uint ind;
        for(uint i=0;i<t.length;i++){
            if(keccak256(bytes(bugs_info[s][i].bug_des))==keccak256(bytes(temp))){
                ind=i;
                break;
           }
        }
        return bugs_info[s][ind].bug_priority;
    }


    function getfp(string memory s1,string memory temp) public view returns (string memory a) {
        featureinfo[] memory t=features_info[s1];
        uint ind1;
        for(uint i=0;i<t.length;i++){
            if(keccak256(bytes(features_info[s1][i].feature_des))==keccak256(bytes(temp))){
                ind1=i;
                break;
           }
        }
        return features_info[s1][ind1].feature_priority;
    }

    


    function getbugs(string memory s) public view returns (string[][] memory) {
        return user_report[s].bugs;
    }
    function obtfeatures(string memory s1) public view returns (string[][] memory) {
        return user_report[s1].features;
    }

    function bugcheck(string memory s,string memory b) public view returns (string memory a) {
       for(uint i=0;i<bugs_info[s].length;i++){
           if(keccak256(bytes(bugs_info[s][i].bug_des))==keccak256(bytes(b))){
               return bugs_info[s][i].bug_status;
           }

       }
    }

    function featurecheck(string memory s,string memory b) public view returns (string memory a) {
       for(uint i=0;i<features_info[s].length;i++){
           if(keccak256(bytes(features_info[s][i].feature_des))==keccak256(bytes(b))){
               return features_info[s][i].feature_status;
           }

       }
    }
    function buglabel(string memory s,string[] memory b,string[] memory p,string[] memory b1,string[] memory p1 ) public{
        
        for(uint j=0;j<b.length;j++){

            for(uint i=0;i<bugs_info[s].length;i++){
                if(keccak256(bytes(bugs_info[s][i].bug_des))==keccak256(bytes(b[j]))){
                    bugs_info[s][i].bug_status="labelled";
                    bugs_info[s][i].bug_priority=p[j];
                }
            }

        }

        for(uint j=0;j<b1.length;j++){

            for(uint i=0;i<features_info[s].length;i++){
                if(keccak256(bytes(features_info[s][i].feature_des))==keccak256(bytes(b1[j]))){
                    features_info[s][i].feature_status="labelled";
                    features_info[s][i].feature_priority=p1[j];
                }
            }

        }
    }


    struct DevData {
        string[] dbugs;
        string[] dfeatures;
        uint256 dno;
        string dsoftware;
        string dstatus;
    }

    mapping (uint256 => DevData) public ddata;
    uint256 public dkey = 0;
    uint256 public dtotal = 1;
    function addDevData(string[] memory bugs, string[] memory features, string memory software) public {
        DevData memory devData = DevData({
            dbugs: bugs,
            dfeatures: features,
            dno: dtotal,
            dsoftware: software,
            dstatus: "not uploaded"
        });
        ddata[dkey] = devData;
        dkey += 1;
        dtotal+=1;
    }


    function fall(uint256 i) public view returns (DevData memory) {
        return ddata[i];
    }

    function ftotal() public view returns (uint256) {
        return dtotal;
    }

    // function fbugs(uint256 i) public view returns (string[] memory) {
    //     return ddata[i].dbugs;
    // }
    // function ffeatures(uint256 i) public view returns (string[] memory) {
    //     return ddata[i].dfeatures;
    // }
    // function fsoft(uint256 i) public view returns (string  memory) {
    //     return ddata[i].dsoftware;
    // }





}
