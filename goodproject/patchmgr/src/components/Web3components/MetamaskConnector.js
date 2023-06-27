let account;
let requestInProgress = false;

const connectMetamask = async () => {
    if (window.ethereum !== undefined && !requestInProgress) {
        try {
            requestInProgress = true;
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0];
            console.log(`Account is: ${account}`);
            document.getElementById("acc_area").innerHTML = `Account is: ${account}`;
        } 
        catch (error) {
            console.error(error);
        } 
        finally {
            requestInProgress = false;
        }
    } 
    else{
        // console.log("Another request is already in progress.");
    }
};

export default connectMetamask;
