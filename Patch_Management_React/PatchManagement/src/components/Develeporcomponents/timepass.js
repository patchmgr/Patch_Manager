
// return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyZjcwMDNEMjRBMzM3MUFCNkM1NDBCN2JBQmQ4NzRkMjRlNTcyNDIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc4NDMxMTI1OTAsIm5hbWUiOiJ2aXNobnUifQ.EofZNDewY4bdc79wKB1yNrDvyj95CalKrQEAolCUaH4';


import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';

const Ipfsconnector = () => {
    const [file, setFile] = useState(null);
    const [downloadCid, setDownloadCid] = useState('');

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const cid = await storeFiles([file]);
                console.log('stored files with cid:', cid);
                // Do any further actions after successful upload
            } catch (error) {
                console.error('Failed to store files:', error);
            }
        }
    };

    const handleDownload = async () => {
        if (downloadCid) {
            try {
                await downloadFile(downloadCid);
            } catch (error) {
                console.error('Failed to download file:', error);
            }
        }
    };

    const getAccessToken = () => {
        // Insert your API token here as a string
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyZjcwMDNEMjRBMzM3MUFCNkM1NDBCN2JBQmQ4NzRkMjRlNTcyNDIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc4NDMxMTI1OTAsIm5hbWUiOiJ2aXNobnUifQ.EofZNDewY4bdc79wKB1yNrDvyj95CalKrQEAolCUaH4';

    };

    const makeStorageClient = () => {
        return new Web3Storage({ token: getAccessToken() });
    };

    async function storeFiles(files) {
        const client = makeStorageClient();
        const cid = await client.put(files);
        console.log('stored files with cid:', cid);
        return cid;
    }

    async function downloadFile(cid) {
        const client = makeStorageClient();
        const res = await client.get(cid);
        const files = await res.files();
        if (files.length > 0) {
            const file = files[0];
            const downloadUrl = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            link.click();
            URL.revokeObjectURL(downloadUrl);
        }
    }

    return (
        <>
            <p>Upload here:</p>
            <input type='file' onChange={handleFileUpload} />
            <button onClick={handleUpload}>Submit</button>

            <div>
                <br /><br /><br />
                <p>Enter CID:</p>
                <input type="text" value={downloadCid} onChange={(event) => setDownloadCid(event.target.value)} />
                <br />
                <br />
                <button onClick={handleDownload}>Download</button>
            </div>
        </>
    );
};

export default Ipfsconnector;
