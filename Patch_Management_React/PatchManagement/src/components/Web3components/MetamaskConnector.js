let account;
let requestInProgress = false;

const connectMetamask = async (setAccount) => {
    if (window.ethereum !== undefined && !requestInProgress) {
        try {
            requestInProgress = true;
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
            console.log(`Account is: ${accounts[0]}`);
        } catch (error) {
            console.error(error);
        } finally {
            requestInProgress = false;
        }
    } else {
        console.log("Another request is already in progress.");
    }
};



export default connectMetamask;
